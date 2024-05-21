from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
from django.core.validators import validate_email
from django.contrib.auth.hashers import check_password, make_password
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.core.serializers import serialize
import json
# add the path to the project root directory
import sys
# sys.path.append('images_model/')
# from .ai_generated_media import load_AI_model,predict_AI_generated_media
# import static
from django.templatetags.static import static
from .models import Users,DataHistory,Subscription
from .session_management import create_session,get_user_id_from_token

# initialize the model
# image_model = load_AI_model()


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
                    token=create_session(user)
                    return JsonResponse({'message':'successfully login','role':'user','token':token})
                else:
                    return JsonResponse({'message':'wrong password'})
            
            #admin login
            user=User.objects.filter(email=username)
            if user.exists():
                user=user[0]
                if user.password==password:
                  
                    return JsonResponse({'message':'successfully login','role':'admin'})
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
                    token=create_session(user)
                    return JsonResponse({'message':'successfully login','role':'user','token':token})
                else:
                    return JsonResponse({'message':'wrong password'})
            #admin login
            user=User.objects.filter(username=username)
            if user.exists():
                user=user[0]
            
                #
                if user.check_password(password):
                  
                    return JsonResponse({'message':'successfully login'})
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
                token=create_session(user)
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
            print("token ",token)
            # get username from the token
            usee_id=get_user_id_from_token(token)
        
            role='user'
            print(role)
            if role=='user':
                user=Users.objects.filter(id=usee_id)
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
                        'image':user.image.url
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
        data = json.loads(request.body.decode('utf-8'))
        media_type=data['media_type']
        data=request.FILES['data']
        text=data['text']
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
        role='user'
        print(role) 
        role='user'
        if role=='admin':
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
            hist={'history':hist}
            
            return JsonResponse(hist)
        elif role == 'user':
            user = Users.objects.filter(username=username).first()
            history = DataHistory.objects.filter(user=user)
            hist = []
            for h in history:
                hist.append({
                    'media_name': h.media_name,
                    'image': h.image.url,
                    'audio': h.audio.url,
                    'text': h.text,
                    'attemptTime': h.attemptTime,
                    'modelResult': h.modelResult,
                    'media_size': h.media_size
                })
            hist={'history':hist}
            print(hist)
            return JsonResponse(hist)
    return HttpResponse('error')

def edit_profile(request):
    """
    This function is used to edit the user info
    we have two types of users (admin and normal user)
    based on the type that we get from the session we will edit the user info in the database
    """
    if request.method=="POST":
        data = json.loads(request.body.decode('utf-8'))
        role='user'
        name=data['name'].strip()
        username=data['username'].strip()
        new_username=data['new_username'].strip()
        email=data['email'].strip()
        current_password=data['current_password'].strip()
        new_password=data['new_password'].strip()
        image=request.FILES['image']
    
        if '' in [name,username,new_username,email,current_password,new_password]:
            return JsonResponse({'message':'all fields are required'})
        user=Users.objects.filter(username=username)
        if user.exists():
            user=user[0]
            if user.password==current_password:
                user.username=new_username
                user.email=email
                user.password=new_password
                user.image=image
                user.save()
                return JsonResponse({'message':'successfully edited'})
            else:
                return JsonResponse({'message':'wrong password'})
        else:
            return JsonResponse({'message':'user not found'})
    return HttpResponse('you have to use post method to edit the profile')


