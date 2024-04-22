from django.shortcuts import render,HttpResponse
# add the path to the project root directory
import sys
# sys.path.append('images_model/')
from .ai_generated_media import load_AI_model,predict_AI_generated_media
# import static
from django.templatetags.static import static
# Create your views here.

# initialize the model
image_model = load_AI_model()

def predict_media(request):
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


