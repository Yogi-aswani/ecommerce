import React from 'react'
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
   <>
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px', height: '100vh' }}>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to='/product' className="nav-link active" aria-current="page">
            Product
          </Link>
        </li>
        
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
   </>
  )
}

export default SideBar