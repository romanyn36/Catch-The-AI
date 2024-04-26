import React from 'react';
import UserIcon from "./images/user.svg"; 
function MyComponent() {
  return (
    <section className="wholeSec">
      <div className="formDiv">
        <form>
          <h3>User Profile</h3>
          <div className="profile">
          <img src={UserIcon} alt="User" className="UserLogo" />
            <div className="profileDiv">
              <button className="newBtn"><i className="fa-regular fa-pen-to-square"></i></button>
              <button className="deleteBtn"><i className="fa-solid fa-trash-can-arrow-up"></i></button>
            </div>
            <div>
              <h5>User</h5>
              <p>Team Lead</p>
            </div>
          </div>
          <div className="profileContent">
            <div className="mb-5">
              <label htmlFor="FnameEmail1" className="form-label">First Name</label>
              <input type="text" className="form-control" id="FnameEmail1" placeholder="User" />
            </div>
            <div className="mb-5">
              <label htmlFor="LnameEmail1" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="LnameEmail1" placeholder="User" />
            </div>
          </div>
          <div className="profileContent">
            <div className="mb-5">
              <label htmlFor="UnameEmail1" className="form-label">User Name</label>
              <input type="text" className="form-control" id="UnameEmail1" placeholder="User" />
            </div>
            <div className="mb-5">
              <label htmlFor="emailEmail1" className="form-label">Email</label>
              <input type="email" className="form-control" id="emailEmail1" placeholder="User@" />
            </div>
          </div>
          <div className="borderDiv"></div>
          <div className="profileContent">
            <div className="mb-5">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="mb-5">
              <label htmlFor="passwordC" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="passwordC" />
            </div>
          </div>
          <div className="mb-5 differ">
            <label htmlFor="cPassword" className="form-label">Current Password</label>
            <input type="password" className="form-control" id="cPassword" />
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-primary deleteBtn2">Cancel</button>
            <button type="submit" className="btn btn-primary submitBtn">Save Changes</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default MyComponent;
