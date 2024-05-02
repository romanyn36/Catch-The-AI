import React from "react";

function AdminProfile() {
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
            <div class="mb-5">
              <label class="form-label">First Name</label>
              <h4>User</h4>
            </div>
            <div class="mb-5">
              <label class="form-label">Last Name</label>
              <h4>User</h4>
            </div>
          </div>
          <div class="profileContent">
            <div class="mb-5">
              <label class="form-label">User Name</label>
              <h4>User</h4>
            </div>
            <div class="mb-5">
              <label class="form-label">Email</label>
              <h4>User@gmail.com</h4>
            </div>
          </div>
          <div class="profileContent">
            <div class="mb-5">
              <label class="form-label">Role</label>
              <h4>lead</h4>
            </div>
          </div>
          <button type="submit" class="btn editBtn">
            Edit Profile
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminProfile;
