from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
from django.core.validators import validate_email
from django.contrib.auth.hashers import check_password, make_password
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.core.serializers import serialize
import base64
from django.core.files.base import ContentFile
import json
# add the path to the project root directory
import sys
# sys.path.append('images_model/')
# from .ai_generated_media import load_AI_model,predict_AI_generated_media
# import static
from django.templatetags.static import static
from .models import Users,DataHistory,Subscription,Admin
from .session_management import create_session,get_user_id_from_token
from urllib.parse import urlparse

# initialize the model
# image_model = load_AI_model()

def home(request):
    return render(request,'home.html')

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



def predict_media(request):
    """
    """
    if request.method == 'POST':
        # data = json.loads(request.body.decode('utf-8'))
        req = request.POST
        media_type=req['media_type']
        data=request.FILES['data']
        text=req['text']
        user=Users.objects.filter(username='romanyn36').first()
        remain_attempets=calculate_remaining_attempts(user)
        if remain_attempets==0:
            return JsonResponse({'message':'you have no attempts left'})
        else:
            if media_type=='image':
                # save the image
                path ='D:/Graduation-project/Backend/media/test_images/'+data.name
                with open(path, 'wb+') as destination:
                    for chunk in data.chunks():
                        destination.write(chunk)
                # result=predict_AI_generated_media(path,image_model)
                result='we predicted the image for you'+f" {remain_attempets} attempts left"
                media_history=DataHistory(user=user,media_name=data.name,image=data,attemptTime=datetime.now(),modelResult=result,media_size=data.size)
                media_history.save()


            elif media_type=='audio':
                path ='D:/Graduation-project/Backend/media/test_images/'+data.name
                save_path=path
                with open(save_path, 'wb+') as destination:
                    for chunk in data.chunks():
                        destination.write(chunk)
        
                result='we played the audio file for you'+f" {remain_attempets} attempts left"
                media_history=DataHistory(user=user,media_name=data.name,audio=data,attemptTime=datetime.now(),modelResult=result,media_size=data.size)
                media_history.save()
            
            elif media_type=='text':
                result='you entered: '+text

            return HttpResponse("The media is: "+result)
    return HttpResponse('this get method is not allowed')

from datetime import datetime
def calculate_remaining_attempts(user:Users):
    """
    This function is used to calculate the remaining attempts for the user
    """
    remain=user.remain_attempts
    start=user.subscription_start_date
    end=user.subscription_end_date
    # check if the subscription is expired
    if end is not None:
        if end<start:
            current_date=datetime.now().date()
            if current_date>end:
                return 0
    if remain>0:
        remain-=1
        user.remain_attempts=remain
        user.save()
        return remain
    else:
        return 0

    

def get_user_history(request):
    """
    This function is used to get the user history
    we have two types of users (admin and normal user)
    based on the type that we get from the session we will get the user history from the database
    """
    if request.method=="GET":
        # get username from params
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(" ")[1]
        user_id,role=get_user_id_from_token(token)
        # get user from the database
        print("extracted role: ",role) 
        if role == 'user':
            user = Users.objects.filter(id=user_id).first()
            history = DataHistory.objects.filter(user=user)
            hist = []
            for h in history:
                hist.append({
                    'media_id': h.id,
                    'media_name': h.media_name,
                    'image': h.image.url if h.image else "",  # Check if h.image is not None
                    'audio': h.audio.url if h.audio else "",  # Check if h.audio is not None
                    'text': h.text if h.text else "",  # Check if h.text is not None
                    'attemptTime': h.attemptTime,
                    'modelResult': h.modelResult,
                    'media_size': h.media_size
                })
            hist={'history':hist}
            # print(hist)
            return JsonResponse(hist)
        if role=='admin':
            user=User.objects.filter(username=username).first()
            history=DataHistory.objects.filter(user=user).first()
            print(history.audio.url)
            hist={
              
                'media_name':history.media_name,
                'image':history.image.url if history.image is not None else "",
                'audio':history.audio.url if history.audio is not None else " ",
                'text':history.text if history.text else " ",
                'attemptTime':history.attemptTime,
                'modelResult':history.modelResult,
                'media_size':history.media_size
            }
            hist={'history':hist}
            
            return JsonResponse(hist)
        
    return HttpResponse('error')
def get_detected_media(request):
    if request.method=="GET":
        # get username from params
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(" ")[1]
        # get mdeia id from the params
        media_id=request.GET.get('media_id')
        user_id,role=get_user_id_from_token(token)
        # get user from the database
        user = Users.objects.filter(id=user_id).first()
        # print("username: ",user.username,"media_id: ",media_id)
        h = DataHistory.objects.filter(user=user,id=media_id).first()
        history={
                'media_id': h.id,
                'media_name': h.media_name,
                'image': h.image.url if h.image else "",  # Check if h.image is not None
                'audio': h.audio.url if h.audio else "",  # Check if h.audio is not None
                'text': h.text if h.text else "",  # Check if h.text is not None
                'attemptTime': h.attemptTime,
                'modelResult': h.modelResult,
                'media_size': h.media_size
            }
        hist={'history':history}
        return JsonResponse(hist)
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


