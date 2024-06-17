from .DAIGT import DAIGT
import os
token = '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' # Temporary token for testing
# Get the directory of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the relative path to the model file
ff_path = os.path.join(current_dir, 'model_scripted.pt')

# Check if the path is correct (optional)
if not os.path.exists(ff_path):
    raise FileNotFoundError(f"The model file was not found at: {ff_path}")

API_URL_DeBERTa = "https://api-inference.huggingface.co/models/zeyadusf/deberta-DAIGT-MODELS"
API_URL_RoBERTa = "https://api-inference.huggingface.co/models/zeyadusf/roberta-DAIGT-kaggle"

# print the current working directory
print("5555555555555555555555555555 ",os.getcwd())


def init_api():
    daigt = DAIGT(token, API_URL_DeBERTa, API_URL_RoBERTa, ff_path)
    return daigt
def detect_text(text,daigt):
    output = daigt.detect_text(text) 
    if output >= 0.5 : 
        return f'This Text is AI-Generated'
    else :
        return f'This Text is Human-Written'

