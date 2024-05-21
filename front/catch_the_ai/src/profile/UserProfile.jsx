import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetchData from '../utils/useFetchData';
import './profile.css';

function UserProfile() {
  // get the root domain
  // const domain = 'http://127.0.0.1:8000';
  const domain = 'https://romanyn36.pythonanywhere.com';

  const [imageurl, setImageurl] = useState('images/user.svg');
  const [userData, setUserData] = useState({
    name: "name ",
    username: "username",
    email: "romany@gmail.com",
    age: -8,
    address: "Egypt",
    subscription: "Basic",
    subscription_start_date: null,
    subscription_end_date: null,
    remain_attempts: 5,
    image: "/media/user_Romani%20Nasrat%20Shawqi/PicsArt_07-18-01.11.49.jpg"
  });

  // session token
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`,
};

// Create the options object
const options = [
    'GET',
     null,
    headers,
]; 
  // const { data, loading, error } = useFetchData('http://127.0.0.1:8000/get_user_info/',options);
  const { data, loading, error } = useFetchData('https://romanyn36.pythonanywhere.com/get_user_info/',options);

  useEffect(() => {
    if (data) {
      setUserData(data);
      setImageurl(domain + image);
      console.log("data", imageurl);
    }
    
  }, [data]);

  console.log("my user data", userData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { name, username, email, age, address, subscription, subscription_start_date, subscription_end_date, remain_attempts, image } = userData;

  return (
    <div className="container p-0 formDiv secondDivv">
      <form>
        <h3>User Profile</h3>

        <div className="profile">
          <img src={imageurl} alt="" />
          <div>
            <h5>User Role:</h5>
            <p>user</p>
          </div>
        </div>
        <h3>User Info</h3>

        <div className="row profileContent">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name: </label>
            <h4>{name}</h4>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name: </label>
            <h4>{name}</h4>
          </div>
        </div>
        <div className="row profileContent">
          <div className="col-md-6 mb-3">
            <label className="form-label">Username: </label>
            <h4>{username}</h4>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Email: </label>
            <h4>{email}</h4>
          </div>
        </div>
        <button type="submit" className="btn editBtn">
          <Link to="/UpdateProfile">Edit Profile <i className="fa-regular fa-pen-to-square"></i></Link>
        </button>

        <div className="borderDiv"></div>

        <h3> Subscription Info</h3>
        <div className="profileContent">
          <div className="mb-3">
            <label htmlFor="FnameEmail1" className="form-label">
              Plan Name:
            </label>
            <h4>{subscription}</h4>
          </div>
          <div className="mb-3">
            <label htmlFor="LnameEmail1" className="form-label">
              Remain Attempts:
            </label>
            <h4>{remain_attempts}</h4>
          </div>
        </div>
        <div className="profileContent">
          <div className="mb-3">
            <label htmlFor="FnameEmail1" className="form-label">
              Start Date:
            </label>
            <h4>{subscription_start_date}</h4>
          </div>
          <div className="mb-3">
            <label htmlFor="LnameEmail1" className="form-label">
              End Date:{" "}
            </label>
            <h4>{subscription_end_date}</h4>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" className="btn deleteBtn2">
            Change Plan
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
