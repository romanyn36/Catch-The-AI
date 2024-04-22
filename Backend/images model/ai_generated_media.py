
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image


# Load the pre-trained model
model = load_model('Real VS Fake.h5')

# Define function to preprocess input image
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(256, 256))  # adjust target_size as per your model's input shape
    img_array = image.img_to_array(img)
    # rescale the pixel values to the range [0, 1]
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array




def predict_AI_generated_media(img_path):
    img_array = preprocess_image(img_path)
    predictions = model.predict(img_array)
    if predictions[0][0] < 0.5:
        return "AI generated fake image"
    else:
        return "Real image"


