import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style1.css';
import Overview from './Overview';
import UserList from './UserList';
import MessageList from './MessageList';
import UserGrowthChart from './UserGrowthChart';

const Sidebar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const handleToggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const handleSidebarItemClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className={`wrapper ${sidebarActive ? 'active' : ''}`}>
      <nav id="sidebar" className={sidebarActive ? 'active' : ''}>
        <div className="sidebar-header">
          <h3>Admin Dashboard</h3>
        </div>

        <ul className=" components">
          <p>get started</p>
          <li>
            <a href="#" onClick={() => handleSidebarItemClick(<Overview />)}>
              Overview
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleSidebarItemClick(<UserList />)}>
              Users
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleSidebarItemClick(<MessageList />)}>
              Messages
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleSidebarItemClick(<UserGrowthChart />)}>
              User Growth
            </a>
          </li>
        </ul>
        <ul className=" CTAs">
          <li>
            <a href="#" className="download">Home page</a>
          </li>
          <li>
            <a href="#" className="article">profile</a>
          </li>
        </ul>
      </nav>

      <div id="content" className={sidebarActive ? 'active' : ''}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={handleToggleSidebar}>
              <i className="fas fa-align-left"></i>
              <span>Toggle Sidebar</span>
            </button>
            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-align-justify"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item active"><a className="nav-link" href="#">Page</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Page</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Page</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Page</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className='content'>
          {activeComponent}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
