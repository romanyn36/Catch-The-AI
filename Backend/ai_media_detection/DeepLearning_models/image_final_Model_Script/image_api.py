import os
import subprocess
import requests
import cv2
from mtcnn import MTCNN
import matplotlib.pyplot as plt
import time

detector = MTCNN()
def detect_and_crop_faces(image_path):
    # Load the image
    image = cv2.imread(image_path)
    # Convert to RGB
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    # Detect faces
    results = detector.detect_faces(image_rgb)
    
    cropped_faces = []
    for result in results:
        # Get the bounding box of each face detected
        x, y, width, height = result['box']
        x, y = abs(x), abs(y)
        cropped_face = image_rgb[y:y+height, x:x+width]
        cropped_faces.append(cropped_face)
    
    return cropped_faces

def preprocess_images(image_path):
    cropped_faces = detect_and_crop_faces(image_path)
    temp_image_paths = []
    for i, cropped_face in enumerate(cropped_faces):
        temp_image_path = f"temp_cropped_image_{i}.jpg"
        cv2.imwrite(temp_image_path, cv2.cvtColor(cropped_face, cv2.COLOR_RGB2BGR))
        temp_image_paths.append(temp_image_path)
    return temp_image_paths, cropped_faces

def query_huggingface_api(api_url, file_path, api_token, max_retries=5, delay=20):
    headers = {
        "Authorization": f"Bearer {api_token}"
    }
    
    for attempt in range(max_retries):
        with open(file_path, 'rb') as f:
            data = f.read()
        
        response = requests.post(api_url, headers=headers, data=data)
        response_json = response.json()
        
        if 'error' in response_json and 'loading' in response_json['error']:
            print(f"Attempt {attempt + 1}/{max_retries}: Model is loading. Retrying in {delay} seconds...")
            time.sleep(delay)
        else:
            return response_json
    
    return {"error": "Max retries exceeded"}

image_path = r"c:\Users\user\Downloads\WhatsApp Image 2024-06-18 at 06.34.16_da018d0f.jpg   "
# Preprocess the image
preprocessed_image_paths, cropped_faces = preprocess_images(image_path)

# Display the cropped faces
for cropped_face in cropped_faces:
    plt.imshow(cropped_face)
    plt.axis('off')  # Hide the axis
    plt.show()
 
 # Query Hugging Face API
API_URL = "https://api-inference.huggingface.co/models/Skullly/results"
API_TOKEN = "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"  # Replace with your Hugging Face API token
    
responses = []
for preprocessed_image_path in preprocessed_image_paths:
    response = query_huggingface_api(API_URL, preprocessed_image_path, API_TOKEN)
    responses.append(response)
    print(response)

# Clean up the temporary files
for preprocessed_image_path in preprocessed_image_paths:
    os.remove(preprocessed_image_path)