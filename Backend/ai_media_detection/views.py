from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
from django.contrib.auth.models import User
from datetime import datetime
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import json
# add the path to the project root directory
# import sys
# # sys.path.append('images_model/')
# # from .ai_generated_media import load_AI_model,predict_AI_generated_media
# # import static
from django.templatetags.static import static
from users.models import Users,DataHistory,ContactMessage
from users.session_management import create_session,get_user_id_from_token
from users.utils import BASE_DOMAIN_URL

# # initialize the model
# # image_model = load_AI_model()

def home(request):
    baseurl=BASE_DOMAIN_URL
    return render(request,'home.html',{'baseurl':baseurl})

def predict_media(request):
    """
    """
    if request.method == 'POST':
        print("post method : detect media") 
        req = request.POST
        media_type=req['media_type']
        data=request.FILES.get('media',None)
        text=req['text'].strip()
        user=Users.objects.filter(username='romanyn36').first()
        remain_attempets=calculate_remaining_attempts(user)
        remain_attempets=100
        print(media_type)
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
                size=format_size(data.size)
                media_history=DataHistory(user=user,media_name=data.name,image=data,attemptTime=datetime.now(),modelResult=result,media_size=size)
                media_history.save()


            elif media_type=='audio':
                path ='D:/Graduation-project/Backend/media/test_images/'+data.name
                save_path=path
                with open(save_path, 'wb+') as destination:
                    for chunk in data.chunks():
                        destination.write(chunk)
        
                result='we played the audio file for you'+f" {remain_attempets} attempts left"
                size=format_size(data.size)
                media_history=DataHistory(user=user,media_name=data.name,audio=data,attemptTime=datetime.now(),modelResult=result,media_size=size)
                media_history.save()
            
            elif media_type=='text':
                result='your text: '+text
                size=format_size(len(text))
                media_history=DataHistory(user=user,media_name=f"text: {text.split(' ')[0]}",text=text,attemptTime=datetime.now(),modelResult=result,media_size=size)
                media_history.save()

            return JsonResponse({'result':result})
    return HttpResponse('this get method is not allowed')


def format_size(size):
    """
    Converts a size in bytes to a human-readable format (bytes, KB, MB).
    Parameters:
    size (int): The size in bytes to be converted.
    Returns:
    str: The human-readable format of the size.
    """
    if size < 1024:
        return f"{size} bytes"
    elif size < 1024 * 1024:
        return f"{size / 1024:.2f} KB"
    else:
        return f"{size / (1024 * 1024):.2f} MB"
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

def send_contact_us_email(request):
    if request.method=="POST":
        data=json.loads(request.body)
        message=data['message']
        name=data['name']
        from_email=data['email']
        first_name=name.split(' ')[0].title()
        supject='Contact us Message from '+first_name
        
        to_email = 'romanyyy36dr99@gmail.com' # our email
        # to_email = settings.EMAIL_HOST_USER # our email # this is the email that will receive the message
        context = {
            'message': message,
            'name': name,
            'first_name': first_name,
            'email': from_email
        }
        # # send email to the team
        # # render the message template
        # message_body_template = render_to_string('contact_us_message_team.html', context)
        # # strip the html tags from the message
        # text_content = strip_tags(message_body_template)

        # msg = EmailMultiAlternatives(supject,body=text_content,to=[to_email])
        # msg.attach_alternative(message_body_template, "text/html")

        # send email to the user
        # render the message template
        message_body_template = render_to_string('contact_us_message_user.html', context)
        # strip the html tags from the message
        text_content = strip_tags(message_body_template)
        msg2 = EmailMultiAlternatives(supject,body=text_content,to=[from_email])
        msg2.attach_alternative(message_body_template, "text/html")
        # print(name,from_email,message)
        
        if msg2.send() :
            message=ContactMessage(name=name,email=from_email,message=message)
            message.save()
            return JsonResponse({'message':'email sent successfully','status':1})
        else:
            return JsonResponse({'message':'error while sending the email','status':0})
    return HttpResponse('you are not allowed to use this method')
        




