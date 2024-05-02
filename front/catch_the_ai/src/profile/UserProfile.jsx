import React from 'react'
import { Link } from 'react-router-dom'
import './profile.css'
function UserProfile() {
  return (
    
        <>
          <div class="formDiv secondDivv">
            <form>
              <h3>User Profile</h3>
    
              <div class="profile">
                <img src="images/user.svg" alt="" />
    
                <div>
                  <h5>User</h5>
                  <p>Team Lead</p>
                </div>
              </div>
              <h3>User Info</h3>
    
              <div class="profileContent">
                <div class="mb-3">
                  <label class="form-label">First Name: </label>
                  <h4>User</h4>
                </div>
                <div class="mb-3">
                  <label class="form-label">Last Name: </label>
                  <h4>User</h4>
                </div>
              </div>
              <div class="profileContent">
                <div class="mb-3">
                  <label class="form-label">User Name: </label>
                  <h4>User</h4>
                </div>
                <div class="mb-3">
                  <label class="form-label">Email: </label>
                  <h4>User@gmail.com</h4>
                </div>
              </div>
              <button type="submit" class="btn editBtn">
              <Link to="/UpdateProfile">Edit Profile <i class="fa-regular fa-pen-to-square"></i></Link>
              </button>
    
              <div class="borderDiv"></div>
    
              <h3> Subscription Info</h3>
              <div class="profileContent">
                <div class="mb-3">
                  <label for="FnameEmail1" class="form-label">
                    Plan Name:{" "}
                  </label>
                  <h4>Professional</h4>
                </div>
                <div class="mb-3">
                  <label for="LnameEmail1" class="form-label">
                    Remain Attembts:{" "}
                  </label>
                  <h4>10</h4>
                </div>
              </div>
              <div class="profileContent">
                <div class="mb-3">
                  <label for="FnameEmail1" class="form-label">
                    Start Date:{" "}
                  </label>
                  <h4>20/3/2020</h4>
                </div>
                <div class="mb-3">
                  <label for="LnameEmail1" class="form-label">
                    End Date:{" "}
                  </label>
                  <h4>30/2/2021</h4>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <button type="button" class="btn deleteBtn2">
                  Change Plan
                </button>
              </div>
            </form>
          </div>
        </>
  )
}

export default UserProfile;
