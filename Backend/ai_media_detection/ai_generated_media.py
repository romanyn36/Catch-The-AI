# import numpy as np
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# from django.templatetags.static import static

# # Load the pre-trained model
# def load_AI_model():
#     path='D:/Graduation-project/Backend/ai_media_detection/static/Real VS Fake.h5'
#     model = load_model(path)
#     return model

# # Define function to preprocess input image
# def preprocess_image(img_path):
#     img = image.load_img(img_path, target_size=(256, 256))  # adjust target_size as per your model's input shape
#     img_array = image.img_to_array(img)
#     # rescale the pixel values to the range [0, 1]
#     img_array = img_array / 255.0
#     img_array = np.expand_dims(img_array, axis=0)
#     return img_array




# def predict_AI_generated_media(img_path, model):
#     img_array = preprocess_image(img_path)
#     predictions = model.predict(img_array)
#     if predictions[0][0] < 0.5:
#        res= "AI generated fake image"
#     else:
#         res ="Real image"
#     # print(res)
#     return res


