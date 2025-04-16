import React, { useState } from 'react';


const DashBorad = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Initially show the sidebar

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  
  return (
    <>
    <div id="wrapper" className={`d-flex ${isSidebarVisible ? '' : 'toggled'}`}>
      {/* Sidebar */}
      <div
        className={`bg-light border-right ${
          isSidebarVisible ? 'sidebar-expanded-left' : 'sidebar-collapsed-left'
        }`}
        id="sidebar-wrapper"
      >
        <div className="sidebar-heading p-3">
          {isSidebarVisible ? 'Dashboard Menu' : <i className="bi bi-list"></i>}
        </div>
        <div className="list-group list-group-flush">
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="bi bi-house me-2"></i>
            {isSidebarVisible && 'Dashboard'}
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="bi bi-bar-chart-line me-2"></i>
            {isSidebarVisible && 'Analytics'}
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="bi bi-gear me-2"></i>
            {isSidebarVisible && 'Settings'}
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="bi bi-envelope me-2"></i>
            {isSidebarVisible && 'Messages'}
          </a>
          <a href="#" className="list-group-item list-group-item-action bg-light">
            <i className="bi bi-person me-2"></i>
            {isSidebarVisible && 'Profile'}
          </a>
        </div>
      </div>

      {/* Page Content */}
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container-fluid">
            <button className="btn btn-light" id="sidebarToggle" onClick={toggleSidebar}>
              <i className="bi bi-list"></i>
            </button>
            <div className="d-flex align-items-center ms-auto">
              <i className="bi bi-bell me-3"></i>
              <i className="bi bi-gear me-3"></i>
              <span className="user-info">Welcome, John Doe</span>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <h1 className="mt-4">Main Content</h1>
          <p>This is the main content area of your unique dashboard.</p>
          {/* Your main content here */}
        </div>
      </div>
    </div>

    </>
  )
}

export default DashBorad