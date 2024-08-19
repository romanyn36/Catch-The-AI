from DAIGT import DAIGT
token = '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' # Temporary token for testing
ff_path = r'D:\Graduation-project\Models\Text Detector Model\Second Term\Final Model Script\model_scripted.pt'  # set Your Path

API_URL_DeBERTa = "https://api-inference.huggingface.co/models/zeyadusf/deberta-DAIGT-MODELS"
API_URL_RoBERTa = "https://api-inference.huggingface.co/models/zeyadusf/roberta-DAIGT-kaggle"


daigt = DAIGT(token, API_URL_DeBERTa, API_URL_RoBERTa, ff_path)

def detect_text(text):
    output = daigt.detect_text(text) 

    if output >= 0.5 : 
        return f'This Text is AI-Generated'
    else :
        return f'This Text is Human-Written'

