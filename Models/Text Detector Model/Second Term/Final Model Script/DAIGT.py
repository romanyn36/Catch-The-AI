import requests
import time
import torch
from TextCleanerDAIGT import TextCleaner

class DAIGT:
    def __init__(self, text, token, api_url_deberta, api_url_roberta, ff_path):
        """
        Initializes a DAIGT object.
        Parameters:
            text (str): The input text to be analyzed.
            token (str): The authorization token for accessing the Hugging Face API.
            api_url_deberta (str): The URL of the DeBERTa model API endpoint.
            api_url_roberta (str): The URL of the RoBERTa model API endpoint.
            ff_path (str): The file path to the Feedforward model.
        """
        self.txt = text 
        self.token = token
        self.api_url_deberta = api_url_deberta
        self.api_url_roberta = api_url_roberta
        self.ff_path = ff_path
        self.ff_model = torch.jit.load(self.ff_path)
        self.ff_model.eval()  
        self.output = 0.0

    def query(self, payload, api_url):
        """
        Sends a POST request to the specified API URL with the given payload.
        Parameters:
            payload (dict): Dictionary containing the request payload.
            api_url (str): URL of the API endpoint.
        Returns:
            dict: Response JSON Contain Probability of Classes  .
        """
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.post(api_url, headers=headers, json=payload)
        return response.json()

    def api_huggingface(self, retries=5, wait_time=7):
        """
        Queries the Hugging Face API endpoints for DeBERTa and RoBERTa models.
        Parameters:
            retries (int): Number of retry attempts if errors occur during API query (default is 5).
            wait_time (int): Time to wait (in seconds) between retry attempts (default is 7).
        Returns:
            tuple: Tuple containing the API responses for DeBERTa and RoBERTa models.
        """
        for _ in range(retries):
            # DeBERTa
            deberta_text = str(TextCleaner(self.txt))
            deberta = self.query({"inputs": deberta_text}, api_url=self.api_url_deberta)
            if 'error' in deberta and 'loading' in deberta['error']:
                time.sleep(wait_time)
            # RoBERTa
            roberta_text = str(TextCleaner(self.txt, roberta_clean=True))
            roberta = self.query({"inputs": roberta_text}, api_url=self.api_url_roberta)
            if 'error' in roberta and 'loading' in roberta['error']:
                time.sleep(wait_time)
                
        return roberta, deberta

    def generate_ff_input(self, models_results):
        """
        Generates input features for the Feedforward model from the API output.
        Parameters:
            models_results (tuple): Tuple containing the results of DeBERTa and RoBERTa models.
        Returns:
            torch.Tensor: Feedforward model input features tensor.
        """
        roberta, deberta = models_results
        input_ff = []
        try:
            if roberta[0][0]['label'] == 'LABEL_0':
                input_ff.append(roberta[0][0]['score'])
                input_ff.append(roberta[0][1]['score'])
            else:
                input_ff.append(roberta[0][1]['score'])
                input_ff.append(roberta[0][0]['score'])

            if deberta[0][0]['label'] == 'LABEL_0':
                input_ff.append(deberta[0][0]['score'])
                input_ff.append(deberta[0][1]['score'])
            else:
                input_ff.append(deberta[0][1]['score'])
                input_ff.append(deberta[0][0]['score'])
        
        except Exception as e:
            print(f"Error {e}: The text is long")

        input_ff = torch.tensor(input_ff, dtype=torch.float32)
        input_ff = input_ff.view(1, -1)
        return input_ff

    def detect_text(self):
        """
        Detects whether the input text is generated or human-written using the Feedforward model.
        Returns:
            float: The detection result.
        """
        with torch.no_grad():
            self.output = self.ff_model(self.generate_ff_input(self.api_huggingface(self.txt)))[0][0].item()
        return self.output
    
    def __str__(self):
        """
        Returns a string representation of the detection result.
        """
        if self.output >= 0.5: 
            return 'Generated'
        else:
            return 'Human-written'


if __name__ == '__main__':
    token = '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'
    API_URL_DeBERTa = "https://api-inference.huggingface.co/models/zeyadusf/deberta-DAIGT-MODELS"
    API_URL_RoBERTa = "https://api-inference.huggingface.co/models/zeyadusf/roberta-DAIGT-kaggle"
    ff_path = r'E:\__aGraduation Project\model_scripted.pt'

    sample_text = "my teamates misunderstand me and get it wrong , somtimes we wanna to get out of the team ,what the solutions "
    daigt = DAIGT(sample_text,token, API_URL_DeBERTa, API_URL_RoBERTa, ff_path)
    result = daigt.detect_text() 
    
    print(result)
    print(daigt)