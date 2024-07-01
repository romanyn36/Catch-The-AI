import os
import cv2
import time
import requests
from mtcnn import MTCNN

def init_model():
    detector = MTCNN()
    return detector
def detect_and_crop_faces(image_path, detector):
    # Load the image
    # print(image_path)
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

def preprocess_images(image_path,detector):
    cropped_faces, face_boxes= detect_and_crop_faces(image_path, detector)
    temp_image_paths = []
    
    for i, cropped_face in enumerate(cropped_faces):
        temp_image_path = f"media/temp/temp_face_{i}.jpg"
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

def get_best_label(response):
    if isinstance(response, list):
        best_result = max(response, key=lambda x: x['score'])
        label=best_result['label'].replace('r', 'Real').replace('f', 'Fake')
        score=best_result['score']
        return f"{label} ({score*100:.2f}%)"
    
    return 'Unknown', 0


def draw_results_on_image(image_path, responses, face_boxes):
    """
    Draws results on the image.

    Parameters:
    - image_path (str): Path to the image file.
    - responses (list of str): List of response texts to be displayed on the image.
    - face_boxes (list of tuples): Each tuple contains the coordinates of a face bounding box in the form (x, y, width, height).
    Returns:
    - result_image: The image with the results drawn on it.
    """
    # Load the image
    image = cv2.imread(image_path)

    # Check if the image was loaded successfully
    if image is None:
        raise FileNotFoundError(f"Image not found at the path: {image_path}")

    # Define the font, scale, and color for the text
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 1.0  # Adjust as needed
    color = (0, 255, 0)  # Green color
    thickness = 2
    formated_responses=[]
    # Draw the response text and face bounding boxes
    for response, box in zip(responses, face_boxes):
        x, y, w, h = box
        # Draw the face bounding box
        cv2.rectangle(image, (x, y), (x + w, y + h), color, thickness)
        response=get_best_label(response)
        formated_responses.append(response)
        # Calculate text position (centered above the box)
        text_size, _ = cv2.getTextSize(response, font, font_scale, thickness)
        text_x = x + (w - text_size[0]) // 2
        text_y = y - 10  # Place text just above the box

        # Draw the response text
        cv2.putText(image, response, (text_x, text_y), font, font_scale, color, thickness, cv2.LINE_AA)

    return formated_responses,image

def predict_image(image_path,detector):
    # Preprocess the image
    preprocessed_image_paths, cropped_faces, face_boxes = preprocess_images(image_path,detector)
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
        os.remove(preprocessed_image_path)
    # Draw the results on the image
    responses,image = draw_results_on_image(image_path, responses, face_boxes)
    os.remove(image_path)
    return  responses,image
