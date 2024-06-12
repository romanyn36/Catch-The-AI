from DAIGT import DAIGT


token = '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' # Temporary token for testing
ff_path = r'YOUR_PATH\model_scripted.pt'  # set Your Path

API_URL_DeBERTa = "https://api-inference.huggingface.co/models/zeyadusf/deberta-DAIGT-MODELS"
API_URL_RoBERTa = "https://api-inference.huggingface.co/models/zeyadusf/roberta-DAIGT-kaggle"

text = """my teamates misunderstand me and get it wrong , 
    somtimes we wanna to get out of the team ,what the solutions """

daigt = DAIGT(text,token, API_URL_DeBERTa, API_URL_RoBERTa, ff_path)
result = daigt.detect_text() 

# TODO BAckend here ya rommyoo 
# custom your code in if body
if result >= 0.5 : 
    print('Generated')
else :
    print('Human-written')

print(result)