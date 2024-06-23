import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetchData from '../utils/useFetchData';
import style from './UserProfile.module.css';
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
    is_activated: true,
    image: "images/user.svg"
  });

  // session token
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  // Create the options object
  const options = [
    'GET',
    null,
    headers,
  ];
  const { data, loading, error } = useFetchData(BASE_DOMAIN_URL + '/users/get_user_info/', options);

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
  const verfiy_email = () => {
    document.getElementById('verfiy_link').remove();
    appendAlert('sending verfication email...', 'info')
    const url = BASE_DOMAIN_URL + '/users/send_activation_email/'
    console.log("url", url)
    fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    }).then((data) => {
      console.log(data);
      if (data.status === 1) {
        // destroy this element
        appendAlert('great, we have sent a new verfication email\n please check your email', 'success')
        
      }
      else {
        appendAlert('something went wrong, please try again later', 'danger')
      }

    }).catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    }
    );
  }

  // add alert for verfication email
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }

  

  const { name, username, email, age, address, subscription, subscription_start_date, subscription_end_date, remain_attempts, image, role, is_activated } = userData;
  console.log("role", role)
  const [firstname, ...lastnameParts] = name.split(' ');
  const lastname = lastnameParts.join(' ');
  return (
    <div className={`container  ${style.formDiv} ${style.secondDivv}`}>

      <div className='row p-2  w-100 justify-content-top align-items-start'>
        <div className="col-lg-12 d-flex flex-column  justify-content-center align-items-center">
          <h3 className=" d-inline">User Profile</h3>
          <img src={BASE_DOMAIN_URL + image} style={{ width: "170px", height: "170px", borderRadius: "50%", padding: "2px" }} alt="" />
          <h3>{name}</h3>
          {role !== 'user' ? <p>Role: {role}</p> : null}
          <div>
            {is_activated ? null :
              <div id='liveAlertPlaceholder'>
                <div id='verfiy_link' class="alert alert-warning alert-dismissible fade show" role="alert">
                  <strong>yor account isn't verfied</strong> please click <button onClick={verfiy_email}  class="btn btn-link" style={{ textDecoration: "underline" }}>here</button> to send a new verfication email
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>



                </div>


              </div>
            }
          </div>
        </div>
        <div className="col-lg-12 pt-3">
          <div className='row p-2  w-100 justify-content-top align-items-start'>

            <div className="col-lg-3  justify-content-top align-items-start">
              <div className='mb-lg-5'>
                {/* <h3>{name}</h3>
                {role !== 'user' ? <p>Role: {role}</p> : null} */}
              </div>

              {role == 'user' ? <h3>User Info</h3> : null}
            </div>
            <div className='col-lg-9  justify-content-top align-items-start'>
              <div className={`row ${style.profileContent}`}>
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name: </label>
                  <h4 className='bg-white border border-3 rounded p-2'>{firstname}</h4>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name: </label>
                  <h4 className='bg-white border border-3 rounded p-2'>{lastname}</h4>
                </div>
              </div>
              <div className={`row ${style.profileContent}`}>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Username: </label>
                  <h4 className='bg-white border border-3 rounded p-2'>{username}</h4>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email: </label>
                  <h4 className='bg-white border border-3 rounded p-2'>{email}</h4>
                </div>
              </div>
              <div className=" d-flex justify-content-center">
                <button className="btn " style={{ backgroundColor: "#384D6C", color: 'white' }}>
                  <Link to="/UpdateProfile" style={{ color: 'white' }}>Edit Profile <i className="ms-2 fa-regular fa-pen-to-square"></i></Link>
                </button>
              </div>
            </div>
          </div>
          {role == 'user' ? (
            <div>
              <div style={{ width: "95%", height: "4px", backgroundColor: "#86867e", margin: "20px auto" }}></div>
              <div className='row p-2  w-100 justify-content-top align-items-start'>
                <div className="col-lg-3 justify-content-top align-items-start">
                  <h3> Subscription Info</h3>
                </div>
                <div className="col-lg-9  justify-content-top align-items-start">
                  <div className="row p-2  w-100 justify-content-top align-items-start">

                    <div className="col-md-6 mb-3">
                      <label htmlFor="FnameEmail1" className="form-label">
                        Plan Name:
                      </label>
                      <h4 className='bg-white border border-3 rounded p-2'>{subscription}</h4>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="LnameEmail1" className="form-label">
                        Remain Attempts:
                      </label>
                      <h4 className='bg-white border border-3 rounded p-2'>{remain_attempts}</h4>
                    </div>
                  </div>
                  <div className="row p-2  w-100 justify-content-top align-items-start">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="FnameEmail1" className="form-label">
                        Start Date:
                      </label>
                      <h4 className='bg-white border border-3 rounded p-2'>{subscription_start_date}</h4>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="LnameEmail1" className="form-label">
                        End Date:{" "}
                      </label>
                      <h4 className='bg-white border border-3 rounded p-2'>{subscription_end_date}</h4>
                    </div>


                  </div>
                  <div className="d-flex   justify-content-center">
                    <button className="btn " style={{ backgroundColor: "#384D6C", color: 'white' }}>
                      <Link to="/UpdateProfile" style={{ color: 'white' }}>Change Plan<i className="ms-2 fa-regular fa-pen-to-square"></i></Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>) : null}

        </div>
      </div>

    </div >

  );
}

export default UserProfile;
