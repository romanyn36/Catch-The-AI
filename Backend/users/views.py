from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
from django.core.validators import validate_email
from django.contrib.auth.hashers import check_password, make_password
from django.core.exceptions import ValidationError
import json
from .models import Users,Admin,Subscription
# for session authentication
from .session_management import create_session,get_user_id_from_token
# Create your views here.

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


