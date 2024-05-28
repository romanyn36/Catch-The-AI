import React from "react";
import { Link } from 'react-router-dom'
import style from "./UpdateProfile.module.css";
import { useState, useEffect } from 'react';
import useFetchData from '../utils/useFetchData';
import { BASE_DOMAIN_URL } from '../index';
function UpdateProfile() {

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

  const { name, username, email, age, address, subscription, subscription_start_date, subscription_end_date, remain_attempts, image } = userData;
  const firstname= name.split(" ")[0];
  const lastname= name.split(" ")[1];


  return (
    <div className={style.formDiv}>
      <form>
        

        <div className={style.profile}>
          <img className={style.img} src={BASE_DOMAIN_URL+userData.image} alt="" />
          <div className={style.profileDiv}>
             <button className={style.newBtn} ><i className={"fa-regular fa-pen-to-square"}></i></button>
            <button className={style.deleteBtn}><i className={"fa-solid fa-trash-can-arrow-up"}></i></button>

          </div>
          <div>
            <h5>User</h5>
            <p>Team Lead</p>
          </div>
        </div>

        <div className={style.profileContent}>
          <div className="mb-5">
            <label htmlFor="FnameEmail1" className="form-label">First Name</label>
            <input type="text" className="form-control" id="FnameEmail1" value={firstname} placeholder="User" />
          </div>
          <div className="mb-5">
            <label htmlFor="LnameEmail1" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="LnameEmail1" value={lastname} placeholder="User" />
          </div>
        </div>
        <div className={style.profileContent}>
          <div className="mb-5">
            <label htmlFor="UnameEmail1" className="form-label">User Name</label>
            <input type="text" className="form-control" id="UnameEmail1" value={username} placeholder="User" />
          </div>
          <div className="mb-5">
            <label htmlFor="emailEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="emailEmail1" value={email} placeholder="User@" />
          </div>
        </div>
        <div className="borderDiv"></div>

        <div className={style.profileContent}>
          <div className="mb-5">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="mb-5">
            <label htmlFor="passwordC" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="passwordz" />
          </div>
        </div>
        <div className={`mb-5 ${style.differ}`}>
          <label htmlFor="cPassword" className="form-label">Current Password</label>
          <input type="password" className="form-control" id="cPassword" />
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" className={`btn btn-primary ${style.deleteBtn2}`}>
            <Link to="/UserProfile">Cancel</Link></button>

          <button type="submit" className={`btn btn-primary ${style.submitBtn}`}>Save Changes</button>
        </div>
      </form>



    </div>
  );
}

export default UpdateProfile;
