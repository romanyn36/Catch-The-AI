import React, { Component } from 'react';
import './image-detector.css';

export class ImageDetector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      result: null
    };
  }

  componentDidMount() {
    document.body.classList.add('hide-footer'); // Add class to hide footer on this page
  }

  componentWillUnmount() {
    document.body.classList.remove('hide-footer'); // Remove class when component unmounts
  }

  handleFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  };

  handleShowResult = () => {
    // Perform the AI detection here and update the 'result' state
    console.log('Detecting if AI or not...');
  };

  render() {
    return (
      <div className="image-detector-container">
        <div>
          <h2 className="Text_title">Detect if Your Image is AI-Generated or Not</h2>
        </div>
        <div className="Text">
          <h2 className='TH'>How Our System Detects Human vs. AI-Generated Images</h2>
          <p className='TP'>
            Our image identification system effortlessly distinguishes between images crafted by humans and those generated by AI. Using cutting-edge machine learning models, it meticulously examines various image features like colors, shapes, and textures. By comparing these features to known patterns in both human and AI-created images, our system accurately determines the origin of each image.
            These machine learning models were trained on a vast dataset containing labeled images, allowing them to learn the subtle differences between human and AI-generated images with ease. Through this training process, our system became adept at identifying the telltale signs of both human and AI craftsmanship, ensuring reliable classification results.
          </p>
        </div>
        <div className="Upload">
          <h2 className='Text_T'>Image Analysis Area</h2>
          <div className="Up_Frame">
            <input type="file" onChange={this.handleFileChange} />
            <button onClick={this.handleShowResult}>Show The Result</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDetector;
