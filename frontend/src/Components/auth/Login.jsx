import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
                
                email: '',
                password: '',
                role:''
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
                axios.post('http://localhost:7000/API/login', { ...formData })
                .then((res) => {
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('role', res.data.role);
                  localStorage.setItem('name', res.data.name);
                  axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                console.log(res.data.token)
                  if(res.data.role === 'user'){
                    navigate('/home');
                    window.location.reload();
                  } else if(res.data.role === 'supplier'){ 
                    navigate('/header');
                  }
            
                })
                .catch((err) => {
                  console.log('Error saving data', err);
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.response.data.message,
          
                  });
                });
              // console.log('Form Data Submitted: ', formData);
            };
  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 mt-5">
            <h2 className="text-center mb-4"> Login Account </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your Email" required value={formData.email} onChange={handleChange} name="email"/>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" required value={formData.password} onChange={handleChange} name="password"/>
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select className="form-select" name="role"  id="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="supplier">Supplire</option>
                <option value="user">User</option>
                </select>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </div>
            </form>

            <p className="text-center mt-3 mb-0">
              Don,t Have A Account <Link to='/' style={{textDecoration:'none'}}>Signup</Link>
            </p>
            <div className="text-center mt-3 mb-0" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <Link to='/reset' style={{textDecoration:'none',color:'black'}}>Reset Password</Link><Link to='/forgot' style={{textDecoration:'none', color:'black'}}>Forgot Password</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
