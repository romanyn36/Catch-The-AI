from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
from django.core.validators import validate_email
from django.contrib.auth.hashers import check_password, make_password
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.core.serializers import serialize
# add the path to the project root directory
import sys
# sys.path.append('images_model/')
# from .ai_generated_media import load_AI_model,predict_AI_generated_media
# import static
from django.templatetags.static import static
from .models import Users,DataHistory
import re
# Create your views here.

# initialize the model
# image_model = load_AI_model()

def login(request):
    """
    note that the user can login using username or email 
    if user is admin the role will be stored in the session
    if user is normal user the role will be stored in the database
    no need explicit ask for the role"""
    if request.method=="POST":
        # get username and password from params
        username=request.POST['username'].strip()
        password=request.POST['password'].strip()
        
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
                    return JsonResponse({'message':'successfully login'})
                else:
                    return JsonResponse({'message':'wrong password'})
            
            #admin login
            user=User.objects.filter(email=username)
            if user.exists():
                user=user[0]
                if user.password==password:
                    user_role(request,'admin','set')
                    return JsonResponse({'message':'successfully login'})
                else:
                    return JsonResponse({'message':'wrong password'})
            else:
                return JsonResponse({'message':'user not found'})


        except ValidationError:
            # user login
            user=Users.objects.filter(username=username)
            if user.exists():
                user=user[0]
                if user.password==password:
                    return JsonResponse({'message':'successfully login'})
                else:
                    return JsonResponse({'message':'wrong password'})
            #admin login
            user=User.objects.filter(username=username)
            if user.exists():
                user=user[0]
            
                #
                if user.check_password(password):
                    user_role(request,'admin','set')
                    return JsonResponse({'message':'successfully login'})
                else:
                    return JsonResponse({'message':'wrong password'})
            else:
             return JsonResponse({'message':'user not found'})
      
    return HttpResponse('broo you have to use post method to login ')

def register(request):
    if request.method=="POST":
        # get user data from params
        name=request.POST['name'].strip()
        username=request.POST['username'].strip()
        email=request.POST['email'].strip()
        password=request.POST['password'].strip()
        age=request.POST['age'].strip()
        country=request.POST['country'].strip()
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
                return JsonResponse({'message':'successfully registered'})
            
        except ValidationError:
            return JsonResponse({'message':'invalid email'})
            
        
    return HttpResponse('broo you have to use post method to register ')

def get_user_info(request):
    """
    This function is used to get the user info
    we have two types of users (admin and normal user)
    based on the type that we get from the session we will get the user info from the database"""

    if request.method=="GET":
            # get username from params
            username=request.GET['username']
            # get user from the database
            role=user_role(request,option='get')
            print(role)
            if role=='user':
                user=Users.objects.filter(username=username)
                if user.exists():
                    user=user[0]
                    user_info={
                        'username':user.username,
                        'email':user.email,
                        'age':user.age,
                        'address':user.country,
                        # 'subscription':user.subscription.name,
                        'subscription_start_date':user.subscription_start_date,
                        'subscription_end_date':user.subscription_end_date,
                        'remain_attempts':user.remain_attempts
                    }
                    return JsonResponse(user_info)
            elif role=='admin':
                user=User.objects.filter(username=username)
                if user.exists():
                    user=user[0]
                    user_info={
                        'username':user.username,
                        'email':user.email,
                    }
                    return JsonResponse(user_info)
                else:
                    return JsonResponse({'message':'user not found'})
       
    
    return HttpResponse('error')



def predict_media(request):
    """
    """
    if request.method == 'POST':
        media_type=request.POST['media_type']
        data=request.FILES['data']
        text=request.POST['text']
        if media_type=='image':
            # save the image
            path ='D:/Graduation-project/Backend/media/test_images/'+data.name
            with open(path, 'wb+') as destination:
                for chunk in data.chunks():
                    destination.write(chunk)
            result=predict_AI_generated_media(path,image_model)
            print(result)


        elif media_type=='audio':
            path ='D:/Graduation-project/Backend/media/test_images/'+data.name
            save_path=path
            with open(save_path, 'wb+') as destination:
                for chunk in data.chunks():
                    destination.write(chunk)
    
            result='we played the audio file for you'
        
        elif media_type=='text':
            result='you entered: '+text

        return HttpResponse("The media is: "+result)


def get_user_history(request):
    """
    This function is used to get the user history
    we have two types of users (admin and normal user)
    based on the type that we get from the session we will get the user history from the database
    """
    if request.method=="GET":
        # get username from params
        username=request.GET['username']
        # get user from the database
        role=user_role(request,option='get')
        if role=='user':
            user=User.objects.filter(username=username).first()
            history=DataHistory.objects.filter(user=user).first()
            hist={
                'media_name':history.media_name,
                'image':history.image.url,
                'audio':history.audio.url,
                'text':history.text,
                'attemptTime':history.attemptTime,
                'modelResult':history.modelResult,
                'media_size':history.media_size
            }
            
            return JsonResponse(hist)
        elif role=='admin':
            user=Users.objects.filter(username=username).first()
            history=DataHistory.objects.filter(user=user).first()
            hist={
                'media_name':history.media_name,
                'image':history.image.url,
                'audio':history.audio.url,
                'text':history.text,
                'attemptTime':history.attemptTime,
                'modelResult':history.modelResult,
                'media_size':history.media_size
            }
        
        return JsonResponse(hist)
    return HttpResponse('error')

def user_role(request,role='user',option='set'):
    """
    This function is used to store the role of the user in the session
    we use the role to determine the user type (admin or user)
    profile page will be different for each user type
    """
    if option=='set':
        request.session['role'] = role  # Store role in session
    elif option=='get':
        return request.session.get('role', 'user')  # Get role from session

