import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
// define base domain url 
// export var BASE_DOMAIN_URL = 'http://127.0.0.1:8000';

export  var BASE_DOMAIN_URL = 'https://romanyn36.pythonanywhere.com';
export  var BASE_phone_number = '+20 105 584 098';
export  var BASE_email = 'catchtheai@gmail.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
