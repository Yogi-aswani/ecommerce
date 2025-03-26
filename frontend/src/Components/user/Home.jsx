import React from 'react'
import Main from './Main';
import { Link,useNavigate } from 'react-router-dom';
const islogin = localStorage.getItem('token');
const name = localStorage.getItem('name');

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
        {name ? (<Link className="navbar-brand" to={'/home'}>Hello {name}</Link>):(
          <Link to={'/home'} className="navbar-brand" href="#"> Hello John Doe</Link>)
        }
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to={'/home'}>Product</Link></li>
              <li className="nav-item"><Link className="nav-link" to={'/cart'}>Cart</Link></li>
              <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
          {islogin ? (
            <button onClick={handleLogout} className="nav-link logout-link" >Logout</button>) : (
            <Link className="nav-link logout-link" to={'/login'}>Login</Link>)
          }
            
            <i className="bi bi-person-fill"></i>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Home