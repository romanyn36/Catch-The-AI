import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetchData from '../utils/useFetchData';
import './profile.css';
import { BASE_DOMAIN_URL } from '../index';

function UserProfile() {
  console.log("BASE_URL", BASE_DOMAIN_URL);

  const [userData, setUserData] = useState({
    name: "name ",
    username: "username",
    email: "empty@gmail.com",
    age: -8,
    address: "Egypt",
    subscription: "Basic",
    subscription_start_date: null,
    subscription_end_date: null,
    remain_attempts: 5,
    role: "user",
    image: "images/user.svg"
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
  const { data, loading, error } = useFetchData(BASE_DOMAIN_URL + '/get_user_info/', options);

  useEffect(() => {
    if (data) {
      setUserData(data);
    }

  }, [data]);

  console.log("my user data", userData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { name, username, email, age, address, subscription, subscription_start_date, subscription_end_date, remain_attempts, image, role } = userData;
  console.log("role", role)
  const firstname = name.split(" ")[0];
  const lastname = name.split(" ")[1];
  return (
    <div className="container p-0 formDiv secondDivv">
      <form>
        <h3>User Profile</h3>

        <div className="profile">
          <img src={BASE_DOMAIN_URL + image} alt="" />
          <div>
            <h5>{name}</h5>
            {role !== 'user' ? <p>{role}</p> : null}
          </div>
        </div>
        <h3>User Info</h3>

        <div className="row profileContent">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name: </label>
            <h4>{firstname}</h4>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name: </label>
            <h4>{lastname}</h4>
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


        {role == 'user' ? (
          <div>
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
          </div>) : null}
      </form>
    </div>
  );
}

export default UserProfile;
