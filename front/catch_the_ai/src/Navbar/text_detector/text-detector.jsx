import React, { useState, useEffect, useRef } from 'react';
import './text-detector.css';
import { BASE_DOMAIN_URL } from '../../index';
import { TailSpin } from 'react-loader-spinner';
import { BsRecordCircle, BsCloudUpload } from 'react-icons/bs';

const mediaData = [
  { id: 1, name: "Image" },
  { id: 2, name: "Text" },
  { id: 3, name: "Audio" },
];

const TextDetector = () => {
  const [selectedMediaType, setSelectedMediaType] = useState("Image"); // Set default media "Image"
  const [pulsatingMediaType, setPulsatingMediaType] = useState("Image");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Audio state and refs
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    // set result to empty when text is changed
    setResult("");
  };

  const predictMedia = (mediaType) => {
    console.log(`Predicting media type for ${mediaType}...`);

    if (mediaType === 'Image') {
      fetchDetectionSystem(mediaType);
    } else if (mediaType === 'Text') {
      fetchDetectionSystem(mediaType);
    } else if (mediaType === 'Audio') {
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

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
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
        // console.log(data);
        setResult(data.result);
        // set result image 
        if (data.previewUrl !== '') {
          // check if is url 
          if (data.previewUrl.includes('/media/user_')) {
          setPreviewUrl(BASE_DOMAIN_URL + data.previewUrl);
          }
          else {
            setPreviewUrl(data.previewUrl);
          }
          // 
        }
        setIsClicked(false);
        // if result have more
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsClicked(false);
      });
  };

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

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
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
  };

  return (
    <div className="container mt-5 mb-5">
      {/* advise users to sign in for better performance and experience */}
      { !localStorage.getItem('token') && !sessionStorage.getItem('token') &&
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Heads up!</strong> For better performance, experience,and access your history, please <a href="/Sign-In/" className="alert-link">sign in</a> to your account.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      }
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
              <div className="media-container d-flex ">
                <div className=" d-flex flex-column align-items-center" >
                  <label htmlFor="file-upload" className="label">Drag and Drop</label>
                  <p className='txt'>Or</p>
                  <label htmlFor="file-upload" className="label">Upload Your Media</label>
                  <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleImageFile} />
                  <p className="txt1">Maximum size 10 Mb</p>
                </div>
                {file ? (
                  <div>
                    <img src={previewUrl} alt="uploaded" style={{ width: "220px", height: "245px" }} />
                    <p className="txt1">{file.name}</p>
                  </div>
                ) : (
                  <div>
                    <p className="txt1">No file selected</p>
                  </div>
                )}
              </div>
            )}
            {selectedMediaType === 'Text' && (
              <div className="media-container">
                <textarea className="text-area  form-control media-container" style={{ backgroundColor: "transparent" }} placeholder="Enter Your Text Here" value={text} onChange={handleTextChange}></textarea>
              </div>
            )}
            {selectedMediaType === 'Audio' && (
              <div className="media-container">
                <div className=" ">
                  <div className="row">
                    {/* Left column for recording */}
                    <div className="col-md-6">
                      <div
                        className="border mt-4 mt-md-0"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        style={{
                          backgroundColor: 'transparent',
                          border: '2px dashed #000000',
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
                        className="border mt-4 mt-md-0"
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
                    <div className="mt-4" style={{ width: "85%", maxWidth: "350px" }}>
                      <h3>Preview File:</h3>
                      <audio src={audioURL} controls style={{ width: "270px" }}></audio>
                      <p className="mt-2">{audioFile ? audioFile.name : 'Recorded audio'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="col-md-3">
            <h3 className="media-type-heading">Result:</h3>
            {isClicked ?
              <div className="loader-container" style={{ height: "90px" }}>
                <TailSpin color="#00BFFF" height={50} width={50} timeout={3000} />
                <p className="text-light">Loading...</p>
              </div>
              : <textarea className="media-type-heading text-light" style={{ height: "100px", width: "250px" ,backgroundColor:"transparent"}} readOnly={true}>{result}</textarea>

            }
            <button className="btn btn-outline submit-button mt-2 mb-2" disabled={isClicked} onClick={() => predictMedia(pulsatingMediaType)}>AI or Human?</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextDetector;
