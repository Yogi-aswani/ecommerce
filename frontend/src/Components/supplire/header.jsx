import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
const islogin = localStorage.getItem('token');
// const name = localStorage.getItem('name');



const header = () => {
   const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.clear();
      navigate('/login');
    }
  return (
    
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{color:'white'}}>Hello {localStorage.getItem('name')}</a>
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
            <li className="nav-item">
              <Link to='/orders' className="nav-link active" aria-current="page" >Orders</Link>
            </li>
            <li className="nav-item">
              <Link to='/inventory' className="nav-link active" aria-current="page" >Inventory</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
          
            <li className="nav-item">
            {islogin ? (
              <a className="nav-link"  onClick={handleLogout}>Logout</a>) : (
              <Link className="nav-link logout-link" to={'/login'}>Login</Link>)
          }
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default header
