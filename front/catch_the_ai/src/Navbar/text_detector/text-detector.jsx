import React, { useState, useEffect } from 'react';
import './text-detector.css';
import { BASE_DOMAIN_URL } from '../../index';
import { TailSpin } from 'react-loader-spinner';
import { BsRecordCircle, BsCloudUpload } from 'react-icons/bs';
import { useRef } from 'react';


const mediaData = [
  { id: 1, name: "Image" },
  { id: 2, name: "Text" },
  { id: 3, name: "Audio" },
];

const TextDetector = () => {
  const [selectedMediaType, setSelectedMediaType] = useState("Image"); // Set default media "Image"
  const [pulsatingMediaType, setPulsatingMediaType] = useState("Image");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    handleFileSelect("Image");
  }, []);

  const handleFileSelect = (mediaType) => {
    setSelectedMediaType(mediaType);
    setPulsatingMediaType(mediaType);
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const predictMedia = (mediaType) => {
    console.log(`Predicting media type for ${mediaType}...`);

    if (mediaType === 'Image') {
      // console.log('Image');
      fetchDetectionSystem(mediaType);
    } else if (mediaType === 'Text') {
      // console.log('Text');
      fetchDetectionSystem(mediaType);
    } else if (mediaType === 'Audio') {
      // console.log('Audio');
      fetchDetectionAudio();
      
    }
  };

  const fetchDetectionSystem = (mediaType) => {
    setResult("");
    setIsClicked(true);
    const formData = new FormData();
    formData.append('media_type', mediaType.toLowerCase());
    formData.append('text', text);
    formData.append('media', file);

    const token = localStorage.getItem('token');
    const url = `${BASE_DOMAIN_URL}/predict_media/`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        setResult(data.result);
        setIsClicked(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsClicked(false);
      });
  };
  // audio
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = event => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);


      setAudioURL(audioUrl);
      setAudioFile(audioBlob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      const stream = mediaRecorderRef.current.stream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };


  const handleUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setAudioURL(audioUrl);
      setAudioFile(file);
    }
  };

  const handleDrop = event => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setAudioURL(audioUrl);
      setAudioFile(file);
    }
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    document.getElementById('audio-upload').click();
  };
  const fetchDetectionAudio = () => {
    setResult("");
    setIsClicked(true);
    console.log(`Predicting media type for audio...`);
    const formData = new FormData();
    formData.append('media_type', 'audio');
    formData.append('text', '');
    formData.append('media', audioFile);
    console.log("audio file ", audioFile.type)

    // get token from local storage if it exists
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    // fetch the data from the server using fetch
    const url = `${BASE_DOMAIN_URL}/predict_media/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        setResult(data.result);
        setIsClicked(false);



      })
      .catch((error) => {
        console.error('Error:', error);
        setIsClicked(false);
        

      });

  }
  return (
    <div className="container">
      <div className="container MainContainer1">
        <h2 className="media-type-heading text-center">Select Media Type</h2>
        <div className="media-type-buttons row justify-content-center">
          {mediaData.map((media) => (
            <div key={media.id} className="col-auto mb-2">
              <button
                className={`media-type-button ${pulsatingMediaType === media.name ? '' : ''}`}
                onClick={() => handleFileSelect(media.name)}
              >
                {media.name}<br />
              </button>
            </div>
          ))}
        </div>

        <div className="row w-100 mt-4 p-2">
          <div className="col-md-9">
            {selectedMediaType === 'Image' && (
              <div className="media-container">
                <label htmlFor="file-upload" className="label">Drag and Drop</label>
                <p className='txt'>Or</p>
                <label htmlFor="file-upload" className="label">Upload Your Media</label>
                <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleImageFile} />
                <p className="txt1">Maximum size 10 Mb</p>
              </div>
            )}
            {selectedMediaType === 'Text' && (
              <div className="media-container">
                <textarea className="text-area form-control media-container" style={{ backgroundColor: "transparent" }} placeholder="Enter Your Text Here" value={text} onChange={handleTextChange}></textarea>
              </div>
            )}
            {selectedMediaType === 'Audio' && (
              <div className="media-container">
                <div className="container mt-5">
                  <div className="row">
                    {/* Left column for recording */}
                    <div className="col-md-6">
                      <div
                        className="border p-4 mt-4 mt-md-0"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        style={{
                          backgroundColor: 'transparent',
                          border: '2px dashed #000000',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <button
                          className={`btn ${isRecording ? 'btn-danger' : 'btn-primary'} me-2 mt-3 text-center text-dark align-center`}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: 'white',
                            color: '#000000',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            border: '2px dashed #000000',
                            display: 'inline-block',
                            textAlign: 'center',
                          }}
                          onClick={isRecording ? stopRecording : startRecording}
                        >
                          {isRecording ? (
                            <>Stop Recording</>
                          ) : (
                            <>
                              <BsRecordCircle className="me-1" /> Start Recording
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Right column for upload */}
                    <div className="col-md-6">
                      <div
                        className="border p-4 mt-4 mt-md-0"
                        onClick={handleButtonClick}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        style={{
                          backgroundColor: 'transparent',
                          border: '2px dashed #000000',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <button
                          className="btn"
                          style={{
                            padding: '8px 16px',
                            backgroundColor: 'white',
                            color: '#000000',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            border: '2px dashed #000000',
                            display: 'inline-block',
                            textAlign: 'center',
                          }}

                        >
                          <BsCloudUpload className="me-1" /> Upload / Drag & Drop Audio file here
                        </button>
                      </div>
                    </div>
                  </div>

                  <input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                  />

                  {audioURL && (
                    <div className="mt-4">
                      <h3>Preview File:</h3>
                      <audio src={audioURL} controls />
                      <p className="mt-2">{audioFile ? audioFile.name : 'Recorded audio'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="col-md-3">
            <h3 className="media-type-heading">Result:</h3>
            {isClicked && (
              <div className="loader-container">
                <TailSpin color="#00BFFF" height={50} width={50} timeout={3000} />
                <p className="text-dark">Loading...</p>
              </div>
            )}
            <p className="media-type-heading">{result}</p>
            <button className="btn btn-outline submit-button mt-2 mb-2" disabled={isClicked} onClick={() => predictMedia(pulsatingMediaType)}>AI or Human?</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextDetector;
