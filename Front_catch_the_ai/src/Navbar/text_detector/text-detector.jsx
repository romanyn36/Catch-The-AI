import React, { Component } from 'react';
import './text-detector.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
const mediaData = [
  { id: 1, name: "Image" },
  { id: 2, name: "Text" },
  { id: 3, name: "Audio" },
];

const predict_media = (mediaType) => {
  
  console.log(`Predicting media type for ${mediaType}...`);
  // fetch the data from the server ssing sueFetch


}
export class TextDetector extends Component {
  state = {
    selectedMediaType: "Image", // Set default media type to "Image"
    pulsatingMediaType: "Image", // Keep track of the currently pulsating media type
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

  render() {
    const { selectedMediaType, pulsatingMediaType } = this.state;

    return (
      <div className="main-container">
        <h2 className="media-type-heading">Select Media Type</h2>
        <div className="media-type-buttons">
          {mediaData.map((media) => (
            <button
              key={media.id}
              className={`media-type-button ${pulsatingMediaType === media.name ? 'pulsating' : ''}`}
              onClick={() => this.handleFileSelect(media.name)}
            >
              {media.name}<br />
            </button>

          ))}
        </div>
        {selectedMediaType === 'Image' && (
          <div className="drag-upload-container">
            <label htmlFor="file-upload" className="label">Drag and Drop</label>
            <p className='txt'>Or</p>
            <label htmlFor="file-upload" className="label">Upload Your Media</label>
            <input id="file-upload" type="file" style={{ display: "none" }} />
            <p className="txt1"> maximum size 10 Mb</p>
          </div>
        )}
        {selectedMediaType === 'Text' && (
          <div className="text-area-container">
            <textarea className="text-area" placeholder="Enter your text here"></textarea>
          </div>
        )}
        {selectedMediaType === 'Audio' && (
          <div className="audio-area-container">
            <h2 className='audioTitle'>Audio Analysis Area</h2>
            <div className="upload-frame">
              <input id="fileInput" type="file" accept="audio/*" onChange={this.handleFileChange} style={{ display: 'none' }} />
              <label htmlFor="fileInput" className="file-input-label">
                <FontAwesomeIcon icon={faMicrophone} onClick={this.handleMicrophoneClick} className="microphone-icon" />
              </label>
            </div>
            <input id="audio-upload" type="file" accept="audio/*" onChange={this.handleAudioUpload} style={{ display: "none" }} />
          </div>
        )}
        {/* connect button to predict */}
        <button className="submit-button" onClick={() => predict_media(pulsatingMediaType)}>AI or Human ?</button>

      </div>
    );
  }
}

export default TextDetector;
