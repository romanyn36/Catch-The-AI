import React from "react";
import { Link } from 'react-router-dom'
import style from "./UpdateProfile.module.css";
import { useState, useEffect } from 'react';
import useFetchData from '../utils/useFetchData';
import { BASE_DOMAIN_URL } from '../index';

function UpdateProfile() {
  const [userData, setUserData] = useState({
    name: "name ",
    firstname: "firstname",
    lastname: "lastname",
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
    newPassword: "",
    confirmPassword: "",
    currentPassword: "",
  });

  // session token
  const token = localStorage.getItem('token');
  console.log("token", token);
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  // Create the options object

  const { data, loading, error } = useFetchData(BASE_DOMAIN_URL + '/users/get_user_info/', [
    'GET',
    null,
    headers,
  ]);

  useEffect(() => {
    // console.log("getdata", data);
    if (data) {
      setUserData(data);
      // set firstname and lastname
      const { name, ...rest } = data;
      // split until the first space  and take the first part as the first name and the rest as the last name
      const [firstname, ...lastnameParts] = name.split(' ');
      const lastname = lastnameParts.join(' ');
      console.log("firstname", firstname);
      console.log("lastname", lastname);
      setUserData((prevUserData) => ({
        ...prevUserData,
        firstname: firstname,
        lastname: lastname,
        newPassword: "",
        confirmPassword: "",
        currentPassword: "",
      }));
    }

  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { name, firstname, lastname, username, email,
    age, address, subscription, subscription_start_date,
    subscription_end_date, remain_attempts, image, role, newPassword, confirmPassword, currentPassword } = userData;

  const handleSaveChanges = (e) => {
    e.preventDefault();
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
    body.append('name', firstname + ' ' + lastname);
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
      const response = await fetch(BASE_DOMAIN_URL + '/users/edit_profile/', {
        method: 'POST',
        body: body, //with form data
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        // console.log('User data:', data);
        // if the user data is updated successfully
        if (data.status === 1) {
          // redirect the user to the profile page
          window.location.href = '/UserProfile/'+username;
        }
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    // console.log(id, value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value || '',
    }));
  };

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
            <label htmlFor="firstname" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstname" value={firstname} onChange={handleChange} placeholder="User" />
          </div>
          <div className="mb-5">
            <label htmlFor="lastname" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastname" value={lastname} onChange={handleChange} placeholder="User" />
          </div>
        </div>
        <div className={style.profileContent}>
          <div className="mb-5">
            <label htmlFor="username" className="form-label">UserName</label>
            <input type="text" className="form-control" id="username" value={username} onChange={handleChange} placeholder="User" />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={handleChange} placeholder="User@" />
          </div>
        </div>
        <div className="borderDiv"></div>

        <div className={style.profileContent}>
          <div className="mb-5">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={handleChange} />
          </div>
          <div className="mb-5 ">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={handleChange} />
          </div>
        </div>
        <div className={`mb-5 ${style.differ}`}>
          <label htmlFor="currentPassword" className="form-label">Current Password</label>
          <input type="password" className="form-control" id="currentPassword" value={currentPassword} onChange={handleChange} />
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" className={`btn btn-dark ${style.deleteBtn2}`}>
            <Link to="/UserProfile">Cancel</Link></button>

          <button type="submit" className={`btn ${style.submitBtn}`} style={{ backgroundColor: "#384D6C",color:'white'}}>Save Changes</button>
        </div>
      </form>



    </div>
  );
}

export default UpdateProfile;
