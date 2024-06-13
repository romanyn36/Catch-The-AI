import React, { Component } from 'react';
import './text-detector.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { BASE_DOMAIN_URL } from '../../index';
import AudioRecorderUploader from './AudioRecorderUploader';

const mediaData = [
  { id: 1, name: "Image" },
  { id: 2, name: "Text" },
  { id: 3, name: "Audio" },
];

export class TextDetector extends Component {
  state = {
    selectedMediaType: "Image", // Set default media type to "Image"
    pulsatingMediaType: "Image", // Keep track of the currently pulsating media type
    text: "",
    image: null,
    result: ""
  };

  componentDidMount() {
    // Initialize by calling handleFileSelect to ensure default behavior
    this.handleFileSelect("Image");
  }

  handleFileSelect = (mediaType) => {
    this.setState({ selectedMediaType: mediaType });
    this.setPulsatingMediaType(mediaType);
  };

  handleAudioUpload = (e) => {
    const file = e.target.files[0];
    console.log("Selected audio file:", file);
    // Here you can add further logic to handle the uploaded audio file
  };

  handleStartRecording = () => {
    // Implement logic to start recording audio
    console.log("Recording started...");
  };

  handleAudioClick = () => {
    document.getElementById('audio-upload').click();
  };

  setPulsatingMediaType = (mediaType) => {
    this.setState({ pulsatingMediaType: mediaType });
  };

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  }

  predict_media = (mediaType) => {
    console.log(`Predicting media type for ${mediaType}...`);
    // fetch the data from the server using fetch
    if (mediaType === 'Image') {
      console.log('Image');
    } else if (mediaType === 'Text') {
      console.log('Text');
      this.fetchDetectionSystem(mediaType);
    }
    else if (mediaType === 'Audio') {
      console.log('Audio');
    }
  }

  fetchDetectionSystem = (mediaType) => {
    const formData = new FormData();
    formData.append('media_type', mediaType.toLowerCase());
    formData.append('text', this.state.text);
    const text = this.state.text;
    // fetch the data from the server using fetch
    const url = `${BASE_DOMAIN_URL}/predict_media/`;
    fetch(url, {
      method: 'POST',
      headers: {},
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ result: data.result });
        console.log(this.state.result)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    const { selectedMediaType, pulsatingMediaType, result } = this.state;

    return (
      <div className="main-container">
        <h2 className="media-type-heading">Select Media Type</h2>
        <div className="media-type-buttons row">
          {mediaData.map((media) => (
            <div key={media.id} className="col-md-3 mb-2">
              <button
                className={`media-type-button ${pulsatingMediaType === media.name ? 'pulsating' : ''}`}
                onClick={() => this.handleFileSelect(media.name)}
              >
                {media.name}<br />
              </button>
            </div>
          ))}
        </div>

        <div className="row  w-100 mt-4 p-2">
          <div className="col-md-9">
            {selectedMediaType === 'Image' && this.image == null && (
              <div className=" image-container w-100 border text-center p-4">
                <label htmlFor="file-upload" className="label">Drag and Drop</label>
                <p className='txt'>Or</p>
                <label htmlFor="file-upload" className="label">Upload Your Media</label>
                <input id="file-upload" type="file" style={{ display: "none" }} />
                <p className="txt1">Maximum size 10 Mb</p>
              </div>
            )}
            {selectedMediaType === 'Text' && (
              <div className="text-area-container w-100 p-4">
                <textarea className="text-area form-control bg-light" style={{color:'black'}} placeholder="Enter your text here" value={this.state.text} onChange={this.handleTextChange}></textarea>
              </div>
            )}
            {selectedMediaType === 'Audio' && (
              <div className="w-100 p-4">
                <AudioRecorderUploader />
              </div>
            )}
          </div>
          <div className="col-md-3">
            <h3 className="text-white">Result:</h3>
            <p className="text-white">{result}</p>
            <button className="btn btn-outline-light submit-button mt-2 mb-2" onClick={() => this.predict_media(pulsatingMediaType)}>AI or Human ?</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TextDetector;
