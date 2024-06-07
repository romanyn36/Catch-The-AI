from django.shortcuts import render,HttpResponse,redirect
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.http import JsonResponse
from django.core.validators import validate_email
from django.contrib.auth.hashers import check_password, make_password
from django.core.exceptions import ValidationError
from django.conf import settings
import json
from .models import Users,Admin,Subscription
from .session_management import create_session,get_user_id_from_token,account_activation_token
from django.core.mail import EmailMessage,EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib.sites.shortcuts import get_current_site
from django.utils import timezone
# Create your views here.
def activate_account(request,uidb64,token):
    """
    This function is used to activate the user account
    the user will receive an email with a link to activate his account
    the link will contain the user id and the token
    the token will be checked if it is valid or not
    if the token is valid the user account will be activated"""
    if request.method=="GET":
        try:
            uid=urlsafe_base64_decode(uidb64).decode()
            user=Users.objects.get(pk=uid)
            print(user.name)
        except:
            return JsonResponse({'message':'user not found'})
        # check if the token is valid
        if user.is_activated:
            # url='http://localhost:3000/EmailActivation'
            url='https://catch-the-ai.vercel.app/EmailActivation'
            return redirect(url)
            return JsonResponse({'message':'account already activated','status':1})
        if account_activation_token.check_token(user,token):
            user.is_activated=True
            user.save()
            url='https://catch-the-ai.vercel.app/EmailActivation'
            # url='http://localhost:3000/EmailActivation'
            return redirect(url)
            return JsonResponse({'message':'account activated','status':1})      
        else:
            return JsonResponse({'message':'account not activated','status':0})  

        

def send_activation_email(request):
    if request.method=="GET":
        # get the username from the token
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(" ")[1]
        user_id,role=get_user_id_from_token(token)

        user=Users.objects.get(id=user_id)
        # setup the activation url
        domain=get_current_site(request)
        protocol='https' if request.is_secure() else 'http'
        activation_token=account_activation_token.make_token(user)
        uid=urlsafe_base64_encode(str(user.pk).encode())
        activation_url=f'{protocol}://{domain}/users/activate_account/{uid}/{activation_token}/'
        
        email=user.email
        if email is None or email=='':
            return JsonResponse({'message':'email not found'})
        context={'user':user,'activation_url':activation_url}
        # get the email body template
        email_body_template=render_to_string('send_activation_email.html',context)
    
        # send the email
        email=EmailMultiAlternatives(subject='activate your account',body=email_body_template,to=[email])
        email.attach_alternative(email_body_template,"text/html") # emsure email is sent as html if clients support it
        # emsure email is sent as html
        # email.content_subtype = "html"  # incase EmailMessage is used 
    
        if email.send():
            return JsonResponse({'message':'email sent','status':1})
        else:
            return JsonResponse({'message':'email not sent','status':0})
        
def forgot_password(request):
    if request.method=="POST":
        # data = request.POST
        data = json.loads(request.body.decode('utf-8'))
        email=data['email'].strip()
        if email=='':
            return JsonResponse({'message':'email is required'})
        try:
            validate_email(email)
            user=Users.objects.filter(email=email)
            if user.exists():
                user=user[0]
                # generate code to reset the password
                user.generate_reset_code()
                context={'username':user.username,'reset_code':user.reset_code}
                # get the email body template
                email_body_template=render_to_string('forgot_password_email.html',context)
                email_body_template_text=render_to_string('forgot_password_email_text.html',context)
                # send the email
                email=EmailMultiAlternatives(subject='reset your password',body=email_body_template_text,to=[email])
                email.attach_alternative(email_body_template,"text/html") # emsure email is sent as html if clients support it
                
                if email.send():
                    return JsonResponse({'message':'email sent','status':1})
                else:
                    return JsonResponse({'message':'email not sent','status':0})
            else:
                return JsonResponse({'message':'user not found'})
        except ValidationError:
            return JsonResponse({'message':'invalid email'})
    return HttpResponse('you have to use post method to reset the password')

def reset_password_activate(request):
    if request.method=="POST":
        # data = request.POST
        data = json.loads(request.body.decode('utf-8'))
        reset_code=data['reset_code'].strip()
        email=data['email'].strip()
        if '' in [reset_code,email]:
            return JsonResponse({'message':'all fields are required'})
        try:
            validate_email(email)
            user=Users.objects.filter(email=email)
            if user.exists():
                user=user[0]
                if user.reset_code==reset_code and user.reset_expire>timezone.now():
                    user.reset_code=''
                    user.reset_expire=None
                    user.save()
                    # generate token to ensure the user is the same user who requested the password reset
                    token=create_session(user,'user')
                    return JsonResponse({'message':'reset code is correct','status':1,'token':token})
                else:
                    return JsonResponse({'message':'wrong reset code or expired','status':0})
            else:
                return JsonResponse({'message':'user not found','status':0})
        except ValidationError:
            return JsonResponse({'message':'invalid email'})
    return HttpResponse('you have to use post method to reset the password')
def reset_password(request):
    if request.method=="POST":
        # data = request.POST
        data = json.loads(request.body.decode('utf-8'))
        email=data['email'].strip()
        new_password=data['new_password'].strip()
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(" ")[1]
        user_id,role=get_user_id_from_token(token)
        # print(user_id,role)
        if '' in [email,new_password]:
            return JsonResponse({'message':'all fields are required'})
        try:
            validate_email(email)
            print(email)
            # ensure the user is the same user who requested the password reset
            user=Users.objects.filter(email=email,pk=user_id)
            if user.exists():
                user=user[0]
                print(user.name)
                user.password=new_password
                user.save()
                return JsonResponse({'message':'password reset successfully','status':1})
            else:
                return JsonResponse({'message':'user not found','status':0} )
        except ValidationError:
            return JsonResponse({'message':'invalid email'})
    return HttpResponse('you have to use post method to reset the password')
    
def login(request):
    """
    note that the user can login using username or email 
    if user is admin the role will be stored in the session
    if user is normal user the role will be stored in the database
    no need explicit ask for the role"""
    if request.method=="POST":
        # for react app
        data = json.loads(request.body.decode('utf-8'))
        # if not react app
        # data=data
        # get username and password from params
        username=data['username'].strip()
        password=data['password'].strip()
        
        if '' in [username,password]:
            return JsonResponse({'message':'all fields are required'})
        # if user used email to login  
        try: 
            validate_email(username)
            # user login
            user=Users.objects.filter(email=username)
            # print(user)
            if user.exists():
                user=user[0]
                if user.password==password:
                    # generate token
                    token=create_session(user,'user')
                    return JsonResponse({'message':'successfully login','role':'user','token':token})
                else:
                    return JsonResponse({'message':'wrong password'})
            
            #admin login
            user=Admin.objects.filter(email=username)
            if user.exists():
                user=user[0]
                if user.password == password:
                    # generate token
                    token=create_session(user,'admin')
                    return JsonResponse({'message':'successfully login','role':'admin','token':token})
                else:
                    return JsonResponse({'message':'wrong password'})
            else:
                return JsonResponse({'message':'user not found'})

        # if user used username to login
        except ValidationError:
            # user login
            user=Users.objects.filter(username=username)
            if user.exists():
                user=user[0]
                if user.password==password:
                    token=create_session(user,'user')
                    return JsonResponse({'message':'successfully login','role':'user','token':token})
                else:
                    return JsonResponse({'message':'wrong password'})
            #admin login
            user=Admin.objects.filter(username=username)
            if user.exists():
                user=user[0]
            
                #
                if user.password == password:
                    token=create_session(user,'admin')
                    return JsonResponse({'message':'successfully login','role':'admin','token':token})
                else:
                    return JsonResponse({'message':'wrong password'})
            else:
             return JsonResponse({'message':'user not found'})
      
    return HttpResponse('broo you have to use post method to login ')

def register(request):
    if request.method=="POST":
        data = json.loads(request.body.decode('utf-8'))
        # get user data from params
        name=data['name'].strip()
        username=data['username'].strip()
        email=data['email'].strip()
        password=data['password'].strip()
        age=data['age'].strip()
        country=data['country'].strip()
        # ensure all fields are filled
        if ''  in [username,email,password,age,country]:
            return JsonResponse({'message':'all fields are required'})
        # check if the user already exists by username or email
        try:
            validate_email(email)
            if Users.objects.filter(email=email,username=username).exists() :
                return JsonResponse({'message':'username and email already exists'})
            elif Users.objects.filter(email=email).exists():
                return JsonResponse({'message':'email already exists'})
            elif Users.objects.filter(username=username).exists():
                return JsonResponse({'message':'username already exists'})
            else:
                # create the user
                user=Users(name=name,username=username,email=email,password=password,age=age,country=country)
                user.save()
                token=create_session(user,'user')
                return JsonResponse({'message':'successfully registered','role':'user','token':token})
            
        except ValidationError:
            return JsonResponse({'message':'invalid email'})
            
        
    return HttpResponse('broo you have to use post method to register ')

def get_user_info(request):
    """
    This function is used to get the user info
    we have two types of users (admin and normal user)
    based on the type that we get from the session we will get the user info from the database"""

    if request.method=="GET":
            # get token from the header
            auth_header = request.headers.get('Authorization')
            token = auth_header.split(" ")[1]
            # print("token ",token)
            # get username from the token
            user_id,role=get_user_id_from_token(token)
            print("extracted role ",role)
            if role=='user':
                user=Users.objects.filter(id=user_id)
                if user.exists():
                    user=user[0]
                    user_info={
                        'name':user.name,
                        'username':user.username,
                        'email':user.email,
                        'age':user.age,
                        'address':user.country,
                        'is_activated':user.is_activated,
                        'subscription':Subscription.objects.filter(pk=user.subscription.pk).first().plan_name,
                        'subscription_start_date':user.subscription_start_date,
                        'subscription_end_date':user.subscription_end_date,
                        'remain_attempts':user.remain_attempts,
                        'image':user.image.url,
                        'role':role
                    }
                    return JsonResponse(user_info)
            elif role=='admin':
                user=Admin.objects.filter(id=user_id)
                if user.exists():
                    user=user[0]
                    user_info={
                        'name':user.name,
                        'username':user.username,
                        'email':user.email,
                        'image':user.image.url,
                        'role':user.role
                    }
                    return JsonResponse(user_info)
                else:
                    return JsonResponse({'message':'user not found'})
       
    
    return HttpResponse('error')


def edit_profile(request):
    """
    This function is used to edit the user info
    we have two types of users (admin and normal user)
    based on the type that we get from the session we will edit the user info in the database
    """
    if request.method=="POST":
        data = request.POST
        name=data['name'].strip()
        new_username=data['username'].strip()
        email=data['email'].strip()
        current_password=data['current_password'].strip()
        new_password=data['new_password'].strip()
        image=request.FILES.get('image')
        print(f" new password {new_password} current password {current_password}")
        try:
            # print('no image uploaded')
            image=data['image'].strip()
            
        except:
            # print('image uploaded')
            image=request.FILES.get('image')
        # print('image: ',image)

        # get token from the header
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(" ")[1]
        # get username from the token
        user_id,role=get_user_id_from_token(token)
        if '' in [name,new_username,email]:
            return JsonResponse({'message':'all fields are required'})
        
        # get token from the header
        else:
            if role=='user':
                user=Users.objects.filter(id=user_id)
            else:
                user=Admin.objects.filter(id=user_id)
            if user.exists():
                user=user[0]
                user.name=name
                user.username=new_username
                user.email=email
                if image is not None:
                    try:
                        # replace the %20 with space if the image is just a string for the image path
                        image= image.replace('%20',' ')
                        # in case the user removed the image
                        if image == 'default.png':
                            user.image='default.png'
                        elif f'{role}_{user.name}' in image:
                            # incase the user didn't upload an image 
                            user.image=image

                    except:
                        # incase the user uploaded an image
                        user.image=image
                    
                if current_password=='' and new_password=='':
                    user.save()
                    return JsonResponse({'message':'successfully edited','status':1})
                elif user.password==current_password:
                    user.password=new_password
                    user.save()
                    return JsonResponse({'message':'successfully edited','status':1})
                else:
                    return JsonResponse({'message':'wrong password','status':0})
            else:
                return JsonResponse({'message':'user not found','status':0})
    return HttpResponse('you have to use post method to edit the profile')


