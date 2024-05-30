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
    email: "empty@gmail.com",
    age: -8,
    address: "Egypt",
    subscription: "Basic",
    subscription_start_date: null,
    subscription_end_date: null,
    remain_attempts: 5,
    image: "images/user.svg",
    role: "user",
  });

  // session token
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  // Create the options object

  const { data, loading, error } = useFetchData(BASE_DOMAIN_URL + '/get_user_info/', [
    'GET',
    null,
    headers,
  ]);

  useEffect(() => {
    // console.log("getdata", data);
    if (data) {
      setUserData(data);
    }

  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { name, username, email, age, address, subscription, subscription_start_date, subscription_end_date, remain_attempts, image, role } = userData;
  const firstname = name.split(" ")[0];
  const lastname = name.split(" ")[1];

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const newPassword = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confPassword').value;
    const currentPassword = document.getElementById('currPassword').value;
    const inputfile = document.getElementById('fileInput').files[0];

    // get the image data
    var image_file;
    // get the uploaded image
    if (inputfile) {
      image_file = inputfile;
    }
    // incase the user did not upload a new image or remove the current image
    else {
      image_file = document.getElementById('profile_image').src;
      image_file = image_file.split('media/').pop();
    }
    // console.log("image_name", image_file);


    // check if the new password and confirm password are the same
    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    // create a form data object to send the data to the server
    var body = new FormData();
    body.append('name', name);
    body.append('username', username);
    body.append('email', email);
    body.append('new_password', newPassword);
    body.append('current_password', currentPassword);
    body.append('image', image_file);


    //  print the form data
    // for (const entry of body.entries()) {
    //   console.log(entry);
    // }

    // send the updated data to the server

    fetchUserData(body);
    console.log("Save Changes");
  }
  const fetchUserData = async (body) => {
    try {
      const response = await fetch(BASE_DOMAIN_URL + '/edit_profile/', {
        method: 'POST',
        body: body, //with form data
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        console.log('User data:', data);
        // if the user data is updated successfully
        if (data.status === 1) {
          // redirect the user to the profile page
          window.location.href = '/UserProfile';
        }
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  const handleChange = (e) => {
    // const { name,id, value } = e.target;
    // setUserData({ ...userData, [name]: value });
  }
  const deleteImage = () => {
    console.log("delete image");
    const image = document.getElementById('profile_image');
    // image.src = '/images/user.svg';
    image.src = BASE_DOMAIN_URL + '/media/default.png';
    // and delete any uploaded image
    const fileInput = document.getElementById('fileInput');
    fileInput.value = null;
  }
  const editImage = () => {
    //open the file dialog
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
    // set the image to the selected image
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        const image = document.getElementById('profile_image');
        image.src = reader.result;
      }
      reader.readAsDataURL(file);
    }

  }

  // Decode base64 string and create a Blob
  const connvertedBase64ToBlob = (imageBase64) => {
    const byteCharacters = atob(imageBase64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const imageBlob = new Blob([byteArray], { type: 'image/png' }, { name: 'image.png' });
    return imageBlob;
  }
  // render components
  return (

    <div className={style.formDiv}>
      <div className={style.profile}>
        <img id="profile_image" className={style.img} src={BASE_DOMAIN_URL + image} alt="" />
        <div className={style.profileDiv}>
          <input type="file" id="fileInput" style={{ display: 'none' }} />
          <button id="editimg" onClick={editImage} className={style.newBtn} ><i className={"fa-regular fa-pen-to-square"}></i></button>
          <button id="delete_img" onClick={deleteImage} className={style.deleteBtn}><i className={"fa-solid fa-trash-can-arrow-up"}></i></button>

        </div>
        <div>
          <h5>User</h5>
          <h5>{name}</h5>
          {role !== 'user' ? <p>{role}</p> : null}
        </div>
      </div>
      <form onSubmit={handleSaveChanges}>
        <div className={style.profileContent}>
          <div className="mb-5">
            <label htmlFor="FnameEmail1" className="form-label">First Name</label>
            <input type="text" className="form-control" id="FnameEmail1" value={firstname} onChange={handleChange} placeholder="User" />
          </div>
          <div className="mb-5">
            <label htmlFor="LnameEmail1" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="LnameEmail1" value={lastname} onChange={handleChange} placeholder="User" />
          </div>
        </div>
        <div className={style.profileContent}>
          <div className="mb-5">
            <label htmlFor="UnameEmail1" className="form-label">User Name</label>
            <input type="text" className="form-control" id="UnameEmail1" value={username} onChange={handleChange} placeholder="User" />
          </div>
          <div className="mb-5">
            <label htmlFor="emailEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="emailEmail1" value={email} onChange={handleChange} placeholder="User@" />
          </div>
        </div>
        <div className="borderDiv"></div>

        <div className={style.profileContent}>
          <div className="mb-5">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={handleChange} id="password" />
          </div>
          <div className="mb-5">
            <label htmlFor="confPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" onChange={handleChange} id="confPassword" />
          </div>
        </div>
        <div className={`mb-5 ${style.differ}`}>
          <label htmlFor="currPassword" className="form-label">Current Password</label>
          <input type="password" className="form-control" onChange={handleChange} id="currPassword" />
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
