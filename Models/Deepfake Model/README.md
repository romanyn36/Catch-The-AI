
# Deepfake Audio Detection Model

This folder contains a deepfake audio detection model based on Wav2Vec2.0, designed to distinguish between real and fake audio samples. The model was trained on multiple datasets, including The Fake or Real (FoR), SceneFake, In The Wild, ASVspoof 2019, and ASVspoof 2021.

## Features

- **Model:** Wav2Vec2.0
- **Datasets:** FoR, SceneFake, In The Wild, ASVspoof 2019, ASVspoof 2021
- **Frameworks:** Transformers 4.39.3, Pytorch 2.1.2, Datasets 2.18.0, Tokenizers 0.15.2
- **Feature Extraction:** 
  - Normalized audio features
  - Sampling rate: 16000 Hz
  - Padding on the right with a value of 0.0
  - No attention mask

## Preprocessing

Audio samples are preprocessed to a maximum duration of 15.0 seconds. The `Wav2Vec2FeatureExtractor` is used to extract features from the audio arrays.

### Preprocessing Function

```python
max_duration = 15.0  # seconds

def preprocess_function(examples):
    audio_arrays = [x["array"] for x in examples["audio"]]
    inputs = feature_extractor(
        audio_arrays, 
        sampling_rate=feature_extractor.sampling_rate, 
        max_length=int(feature_extractor.sampling_rate * max_duration), 
        truncation=True,
    )
    return inputs
```

## Installation

To install the necessary packages, you can use the following commands:

```bash
pip install transformers==4.39.3
pip install torch==2.1.2
pip install datasets==2.18.0
pip install tokenizers==0.15.2
```

## Usage

To use the model, follow these steps:

1. **Load the model and feature extractor:**

```python
from transformers import Wav2Vec2ForSequenceClassification, Wav2Vec2FeatureExtractor

model = Wav2Vec2ForSequenceClassification.from_pretrained("your_model_path")
feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained("your_feature_extractor_path")
```

2. **Preprocess your audio data:**

```python
inputs = preprocess_function(your_audio_data)
```

3. **Make predictions:**

```python
with torch.no_grad():
    outputs = model(**inputs)
    logits = outputs.logits
    predictions = torch.argmax(logits, dim=-1)
```

## Evaluation Results

The model achieves the following results on the evaluation set:

- **Loss:** 0.0829
- **Accuracy:** 0.9882

## Contributing

- Mohammed Abdeldayem
- Abdullah Mohammed

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the creators of the FoR, SceneFake, In The Wild, ASVspoof 2019, and ASVspoof 2021 datasets.
- Thanks to the Hugging Face team for the Transformers library.

