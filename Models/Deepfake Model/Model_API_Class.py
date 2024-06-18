import os
import subprocess
import requests
import time
from typing import List, Dict

class AudioProcessor:
    def __init__(self, api_url: str, api_token: str):
        self.api_url = api_url
        self.api_token = api_token
        self.ffmpeg_path = self.get_ffmpeg_path()

    def get_ffmpeg_path(self) -> str:
        try:
            path = subprocess.run(['which', 'ffmpeg'], capture_output=True, text=True).stdout.strip()
            if not path:
                raise FileNotFoundError("ffmpeg not found in system path.")
            return path
        except Exception as e:
            print(f"Error finding ffmpeg: {e}")
            return None

    def convert_to_wav(self, input_path: str, output_path: str) -> None:
        try:
            if not os.path.isfile(input_path):
                raise FileNotFoundError(f"Input file '{input_path}' not found.")
            
            output_dir = os.path.dirname(output_path)
            if output_dir and not os.path.exists(output_dir):
                os.makedirs(output_dir)

            command = [
                self.ffmpeg_path, '-i', input_path, '-vn', '-acodec', 'pcm_s16le', 
                '-ar', '16000', '-ac', '1', output_path
            ]

            process = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            
            if process.returncode != 0:
                error_message = process.stderr
                print(f"ffmpeg command: {' '.join(command)}")
                print(f"ffmpeg stderr: {error_message}")
                raise subprocess.CalledProcessError(process.returncode, command, error_message)
            
            print(f"Conversion successful: {output_path}")
        except subprocess.CalledProcessError as e:
            print(f"An error occurred during the conversion: {e.stderr}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

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
            output_wav = os.path.join('/tmp', f"{os.path.splitext(os.path.basename(input_path))[0]}.wav")
            
            # Convert the file to WAV format
            self.convert_to_wav(input_path, output_wav)

            # Query the Hugging Face API
            response = self.query_huggingface_api(output_wav)
            print(f"API Response: {response}")

            # Get the label with the highest score
            label = self.get_label_with_max_score(response)
            print(f"Label with max score: {label}")
            return label

        except Exception as e:
            print(f"An error occurred: {e}")
            return ""

# Testing the functions
if __name__ == "__main__":
    api_url = "https://api-inference.huggingface.co/models/motheecreator/wav2vec2-base-finetuned-finetuned"
    api_token = "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"  

    processor = AudioProcessor(api_url, api_token)

    
    input_file = 'input file path'  # Update with your input file path
    
    label = processor.process_and_classify(input_file)
    print(f"Final Label: {label}")
