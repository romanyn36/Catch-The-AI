import React, { Component } from 'react';
import './AboutUs.css';
import m1Image from './m1.jpg'; // Import the image file
import img3 from './m1.jpg'; // Import the image file for Our Values
import vision from './vision.jpg'; // Import the image file
import m from './m.jpg'; // Import the image file

export class AboutUs extends Component {
  render() {
    return (
      <div className="about-us-container">
        <div className="title">
          <h1>About Us</h1>
        </div>
        <div className="content">
          <div className="left">
            <h2>Our Vision</h2>
            <p>We envision leading the way in digital content verification, making the internet a safer space. We see a future where people trust digital content, empowering them to make informed decisions online. Through innovation and collaboration, we strive to promote media integrity and literacy, fostering a positive digital landscape for all.</p>
          </div>
          <div className="right">
            <img src={vision} alt="Vision Image" /> {/* Use the imported image */}
          </div>
        </div>
        <div className="content">
          <div className="left">
            <img src={m1Image} alt="Mission Image" /> {/* Use the imported image */}
          </div>
          <div className="right">
            <h2>Our Mission</h2>
            <p>Our mission is to empower individuals and organizations with the tools and insights needed to navigate the evolving landscape of digital media confidently. We are committed to leveraging cutting-edge artificial intelligence technologies to detect and distinguish between AI-generated and human-authored content accurately. By providing reliable and transparent solutions, we strive to combat misinformation and promote media integrity. Through our mission, we aim to cultivate a digital environment where trust, authenticity, and ethical standards are upheld, ultimately fostering a safer and more informed online community for all.</p>
          </div>
        </div>
        <div className="content">
          <div className="left">
            <h2>Our Values</h2>
            <ul style={{ color: 'white' }}>
              <li><strong>Integrity:</strong> Uphold the highest standards of honesty, transparency, and accountability.</li>
              <li><strong>Innovation:</strong> Embrace creativity and continuous improvement to drive technological advancements.</li>
              <li><strong>Accuracy:</strong> Provide accurate and reliable solutions to empower informed decision-making.</li>
              <li><strong>Collaboration:</strong> Foster collaboration and partnerships to address complex challenges in digital media.</li>
              <li><strong>Impact:</strong> Make a positive impact on society by promoting media integrity and combating misinformation.</li>
            </ul>
          </div>
          <div className="right">
            <img src={m} alt="Values Image" /> {/* Use the imported image */}
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
