import React from "react";
import { Link } from 'react-router-dom'
function UpdateProfile() {
  return (
  <div class="formDiv">
    <form>
      <Link to="/UserProfile">    <h3>User Profile</h3></Link>

      <div class="profile">
        <img src="images/user.svg" alt="" />
        <div class="profileDiv">
          <Link to="/UpdateProfile"> <button class="newBtn"><i class="fa-regular fa-pen-to-square"></i></button></Link>
          <button class="deleteBtn"><i class="fa-solid fa-trash-can-arrow-up"></i></button>

        </div>
        <div>
          <h5>User</h5>
          <p>Team Lead</p>
        </div>
      </div>

      <div class="profileContent">
        <div class="mb-5">
          <label for="FnameEmail1" class="form-label">First Name</label>
          <input type="text" class="form-control" id="FnameEmail1" placeholder="User" />
        </div>
        <div class="mb-5">
          <label for="LnameEmail1" class="form-label">Last Name</label>
          <input type="text" class="form-control" id="LnameEmail1" placeholder="User" />
        </div>
      </div>
      <div class="profileContent">
        <div class="mb-5">
          <label for="UnameEmail1" class="form-label">User Name</label>
          <input type="text" class="form-control" id="UnameEmail1" placeholder="User" />
        </div>
        <div class="mb-5">
          <label for="emailEmail1" class="form-label">Email</label>
          <input type="email" class="form-control" id="emailEmail1" placeholder="User@" />
        </div>
      </div>
      <div class="borderDiv"></div>

      <div class="profileContent">
        <div class="mb-5">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" />
        </div>
        <div class="mb-5">
          <label for="passwordC" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" id="passwordC" />
        </div>
      </div>
      <div class="mb-5 differ">
        <label for="cPassword" class="form-label">Current Password</label>
        <input type="password" class="form-control" id="cPassword" />
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary deleteBtn2">
          <Link to="/UserProfile">Cancel</Link></button>

        <button type="submit" class="btn btn-primary submitBtn">Save Changes</button>
      </div>
    </form>



  </div>
  );
}

export default UpdateProfile;
