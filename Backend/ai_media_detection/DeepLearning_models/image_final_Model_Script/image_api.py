<<<<<<< HEAD
import cv2
from mtcnn import MTCNN
import requests
=======
import os
import requests
import cv2
from mtcnn import MTCNN
>>>>>>> main
import time
import os
import matplotlib.pyplot as plt

<<<<<<< HEAD
detector = MTCNN()

def detect_and_crop_faces(image_path):
=======

def init_model():
    detector = MTCNN()
    return detector
def detect_and_crop_faces(image_path, detector):
>>>>>>> main
    # Load the image
    print(image_path)
    image = cv2.imread(image_path)
    
    # Convert to RGB
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Detect faces
    results = detector.detect_faces(image_rgb)
    
    cropped_faces = []
    face_boxes = []
    
    for result in results:
        # Get the bounding box of each face detected
        x, y, width, height = result['box']
        x, y, width, height = abs(x), abs(y), abs(width), abs(height)

        # Calculate new dimensions
        new_width = int(width * 1.5)
        new_height = int(height * 1.5)
        
        # Adjust the x and y coordinates to keep the face centered
        new_x = max(0, x - (new_width - width) // 2)
        new_y = max(0, y - (new_height - height) // 2)
        
        # Crop the face with the new dimensions
        cropped_face = image_rgb[new_y:new_y+new_height, new_x:new_x+new_width]
        
        cropped_faces.append(cropped_face)
        face_boxes.append((new_x, new_y, new_width, new_height))
    
    return cropped_faces, face_boxes

<<<<<<< HEAD
def preprocess_images(image_path):
    cropped_faces, face_boxes = detect_and_crop_faces(image_path)
=======
def preprocess_images(image_path,detector):
    cropped_faces = detect_and_crop_faces(image_path, detector)
>>>>>>> main
    temp_image_paths = []
    
    for i, cropped_face in enumerate(cropped_faces):
        temp_image_path = f"temp_cropped_image_{i}.jpg"
        cv2.imwrite(temp_image_path, cv2.cvtColor(cropped_face, cv2.COLOR_RGB2BGR))
        temp_image_paths.append(temp_image_path)
    
    return temp_image_paths, cropped_faces, face_boxes

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

<<<<<<< HEAD
def get_best_label(response):
    if isinstance(response, list):
        best_result = max(response, key=lambda x: x['score'])
        return best_result['label'], best_result['score']
    return 'Unknown', 0

image_path = r"c:\Users\user\Desktop\F1.jpg"

# Preprocess the image
preprocessed_image_paths, cropped_faces, face_boxes = preprocess_images(image_path)

# Query Hugging Face API
API_URL = "https://api-inference.huggingface.co/models/Skullly/DeepFake-EN-B6"
API_TOKEN = "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" # Replace with your Hugging Face API token

responses = []
for preprocessed_image_path in preprocessed_image_paths:
    response = query_huggingface_api(API_URL, preprocessed_image_path, API_TOKEN)
    responses.append(response)
    print(response)

# Load the original image to draw bounding boxes and labels
image = cv2.imread(image_path)

# Draw bounding boxes and labels on the image
for (x, y, width, height), response in zip(face_boxes, responses):
    # Draw the bounding box
    cv2.rectangle(image, (x, y), (x+width, y+height), (255, 0, 0), 2)
    
    # Get the best label and score from the response
    label, accuracy = get_best_label(response)
    
    # Prepare the label text
    text = f"{label} ({accuracy*100:.2f}%)"
    
    # Put the label above the bounding box
    cv2.putText(image, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

# Convert the image to RGB (for displaying with matplotlib)
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Display the image with bounding boxes and labels
plt.imshow(image_rgb)
plt.axis('off') # Hide the axis
plt.show()

# Clean up the temporary files
for preprocessed_image_path in preprocessed_image_paths:
    os.remove(preprocessed_image_path)
=======
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
>>>>>>> main
