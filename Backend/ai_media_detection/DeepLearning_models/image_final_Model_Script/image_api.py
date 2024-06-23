import os
import requests
import cv2
from mtcnn import MTCNN
import time


def init_model():
    detector = MTCNN()
    return detector
def detect_and_crop_faces(image_path, detector):
    # Load the image
    print(image_path)
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

def preprocess_images(image_path,detector):
    cropped_faces = detect_and_crop_faces(image_path, detector)
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
    
    return ["error Max retries exceeded"]

def format_results_with_messages(responses):
    results = []
    for i, result in enumerate(responses):
        print("result format ",result)
        result=result[0]
        label = result['label'].replace('r', 'Real Image').replace('f', 'Fake Image')
        score = result['score']
        message = f"{label}"#+f" with score {score:.2f}"
        results.append(message)
    return results
def predict_image(image_path,detector):
    # Preprocess the image
    preprocessed_image_paths, cropped_faces = preprocess_images(image_path,detector) 
    # print (preprocessed_image_paths)
    if cropped_faces == []:
        return ["No faces detected"]
    # Query Hugging Face API
    API_URL = "https://api-inference.huggingface.co/models/Skullly/DeepFake-EN-B6"
    API_TOKEN = "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"  # Replace with your Hugging Face API token
        
    responses = []
    for preprocessed_image_path in preprocessed_image_paths:
        response = query_huggingface_api(API_URL, preprocessed_image_path, API_TOKEN)
        responses.append(response)
    # Clean up the temporary files
    # for preprocessed_image_path in preprocessed_image_paths:
        os.remove(preprocessed_image_path)
    return format_results_with_messages(responses)
