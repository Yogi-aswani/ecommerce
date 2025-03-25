import React, { useState } from 'react';
import { Link  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';



const UserSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'user',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:7000/API/usersignup', { ...formData })
        .then((res) => {
          console.log('Data saved', res);
          // alert(res.data.message)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User SignUp Success",
            showConfirmButton: false,
            timer: 1500
          });
  
          navigate('/login');
        })
        .catch((err) => {
          console.log('Error saving data', err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
  
          });
        });
      console.log('Form Data Submitted: ', formData);
  
        // Add your form submission logic here
    };

    return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 mt-5">
            <h2 className="text-center mb-4">Create User Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your full name" required value={formData.name} onChange={handleChange} name="name"/>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange} name="email"/>
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" required value={formData.phone} onChange={handleChange} name="phone"/>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Create a password" required value={formData.password} onChange={handleChange} name="password"/>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </div>
            </form>
            <p className='text-center mt-3 mb-0'>
                <span className="badge bg-warning text-dark p-2"><Link to='/supplire'>Create Supplire Account</Link> </span>
            </p>

            <p className="text-center mt-3 mb-0">   
              Already have an account? <Link to='/login'>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>       
    );
};

export default UserSignup;