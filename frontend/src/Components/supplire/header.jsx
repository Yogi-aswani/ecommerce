import React from 'react'
import { Link } from 'react-router-dom';


const header = () => {
  return (
    
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">{localStorage.getItem('name')}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Profile</a>
            </li>
            <li className="nav-item">
              <Link to='/product' className="nav-link active" aria-current="page" >Products</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default header
