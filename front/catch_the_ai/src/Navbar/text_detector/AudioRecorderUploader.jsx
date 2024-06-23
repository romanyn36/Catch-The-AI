import React, { useState, useRef } from 'react';
import { BsRecordCircle, BsCloudUpload } from 'react-icons/bs'; // Import Bootstrap icons
import { BASE_DOMAIN_URL } from '../../index';

const AudioRecorderUploader = () => {
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
  const fetchDetectionSystem = () => {
    
  
    console.log(`Predicting media type for audio...`);
    const formData = new FormData();
    formData.append('media_type', 'audio');
    formData.append('text', '');
    formData.append('media', audioFile);
    console.log("audio file ",  audioFile.type)

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
      


      })
      .catch((error) => {
        console.error('Error:', error);
        
      });

  }
  return (
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
      <button className="btn btn-primary mt-3" onClick={fetchDetectionSystem}>Submit</button>
    </div>
  );
};

export default AudioRecorderUploader;
