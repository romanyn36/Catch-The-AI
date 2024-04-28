import React, { Component } from 'react';
import './text-detector.css';
const mediaData = [
  { id: 1, name: "Images" },
  { id: 2, name: "Text" },
  { id: 3, name: "Audio" }, 
];
export class TextDetector extends Component {
  handleFileSelect = (mediaType) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = mediaType === "Images" ? "image/*" : mediaType === "Text" ? ".txt" : "audio/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log("Selected file:", file);
    };
    input.click();
  };
  render() {
    return (
      <div className="main-container">
        <h2 className="media-type-heading">Select Media Type</h2>
        <div className="media-type-buttons">
          {mediaData.map((media) => (
            <button key={media.id} className="media-type-button" onClick={() => this.handleFileSelect(media.name)}>
              {media.name}<br />
            </button>
          ))}
          <div>          
          </div>
        </div>       
        <div className="drag-upload-container">
          <label htmlFor="file-upload" className="label">Drag and Drop</label>
          <p className='txt'>Or</p>
          <label htmlFor="file-upload" className="label">Upload Your Media</label>
          <input id="file-upload" type="file" style={{ display: "none" }} />
          <p className="txt1"> maximum size 10 Mb</p>
        </div>
        <button className="submit-button">AI or Human ?</button>
      </div>
    );
  }
}
export default TextDetector;
