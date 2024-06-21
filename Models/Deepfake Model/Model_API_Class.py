import os
import time
import requests
from typing import List, Dict
import mimetypes

class MediaClassifier:
    def __init__(self, api_token: str, api_url: str):
        self.api_token = api_token
        self.api_url = api_url

    def validate_audio_file(self, file_path: str) -> bool:
        audio_mime_types = [
            'audio/mpeg',    # .mp3, .mp2
            'audio/wav',     # .wav
            'audio/ogg',     # .ogg
            'audio/x-flac',  # .flac
            'audio/opus',    # .opus
            'audio/aac',     # .aac
            'audio/mp4',     # .m4a
            'audio/aiff',    # .aiff
            'audio/x-ms-wma',# .wma
            'audio/amr',     # .amr
            'audio/3gpp',    # .3gp
            'audio/x-caf',   # .caf
            'audio/basic',   # .au
            'audio/midi'     # .mid, .midi
        ]
        mime_type, _ = mimetypes.guess_type(file_path)
        return mime_type in audio_mime_types

    def query_huggingface_api(self, file_path: str, retries: int = 5, wait_time: int = 7) -> List[Dict[str, float]]:
        headers = {
            "Authorization": f"Bearer {self.api_token}"
        }
        with open(file_path, 'rb') as f:
            data = f.read()
        
        for attempt in range(retries):
            response = requests.post(self.api_url, headers=headers, data=data)
            result = response.json()
            
            if 'error' in result and 'loading' in result['error']:
                print(f"Model is loading. Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
            else:
                return result
        raise RuntimeError(f"Failed to get a response from the model after {retries} retries.")

    def get_label_with_max_score(self, response: List[Dict[str, float]]) -> str:
        return max(response, key=lambda x: x['score'])['label']

    def process_and_classify(self, input_path: str) -> str:
        try:
            # Validate the file format
            if not self.validate_audio_file(input_path):
                raise ValueError("The provided file is not a valid audio file.")

            # Query the Hugging Face API
            response = self.query_huggingface_api(input_path)
            print(f"API Response: {response}")

            # Get the label with the highest score
            label = self.get_label_with_max_score(response)
            print(f"Label with max score: {label}")
            return label

        except Exception as e:
            print(f"An error occurred: {e}")
            return ""

# Example usage
if __name__ == "__main__":
    api_url = "https://api-inference.huggingface.co/models/motheecreator/Deepfake-audio-detection"
    api_token = "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"  # Replace with your Hugging Face API token

    classifier = MediaClassifier(api_token, api_url)

    # Example input file
    input_file = '/kaggle/input/video-files-test/Politician-UltraFast-recording-05-27-2024-22-13-58.mp3'  # Update with your input file path
    
    # Process and classify the input file
    label = classifier.process_and_classify(input_file)
    print(f"Final Label: {label}")
