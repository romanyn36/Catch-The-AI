import React, { useState, useRef } from 'react';

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
    mediaRecorderRef.current.stop();
    setIsRecording(false);
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

  return (
    <div className="container mt-5 w-100">
      <div className="mb-3 ">
        <button
          className={`btn ${isRecording ? 'btn-danger' : 'btn-primary'} me-2`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
       
        <input
          id="audio-upload"
          type="file"
          accept="audio/*"
          className="form-control-file ms-1"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
      </div>
      <div
        className="drop-zone mt-1 bg-dark p-5"
        onClick={() => document.getElementById('audio-upload').click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{color:'white', width: "100%", height: "100%", border: '2px dashed #ccc', borderRadius: '10px', textAlign: 'center' }}
      >
        Upload 
        <br />
        or
        Drag & Drop audio file here
      </div>
      {audioURL && (
        <div className="mt-4">
          <h3 style={{color:"white"}}>Preview:</h3>
          <audio src={audioURL} controls />
          <p className="mt-2">File: {audioFile ? audioFile.name : 'Recorded audio'}</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorderUploader;
