import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';

const Suppliresignup = () => {
    const navigate = useNavigate();
     const [formData, setFormData] = useState({
            name: '',
            password: '',
            phone: '',
            bussiness:'',
            email:'',
            gst:'',
            category:'',
            payment:'',
            location:'',
            role: 'supplier',
 
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
              title: "Supplire SignUp Success",
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

        };
    
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 mt-5">
            <h2 className="text-center mb-4">Create Supplire Account </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your full name" required value={formData.name} onChange={handleChange} name="name"/>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" required value={formData.phone} onChange={handleChange} name="phone"/>
              </div>

              <div className="mb-3">
                <label htmlFor="bussiness" className="form-label">Bussiness Name</label>
                <input type="text" className="form-control" id="bussiness" placeholder="Create a password" required value={formData.bussiness} onChange={handleChange} name="bussiness"/>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Bussiness Email</label>
                <input type="text" className="form-control" id="email" placeholder="Create a password" required value={formData.bemail} onChange={handleChange} name="email"/>
              </div>
              <div className="mb-3">
                <label htmlFor="gst" className="form-label">GST Number</label>
                <input type="text" className="form-control" id="gst" placeholder="Create a password" required value={formData.gst} onChange={handleChange} name="gst"/>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">Bussiness Category</label>
                <select className="form-select" name="category" id="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home&Kitchen">Home & Kitchen</option>
                <option value="Books&Stationery">Books & Stationery</option>
                <option value="Beauty&PersonalCare">Beauty & Personal Care</option>
                <option value="Toys&Games">Toys & Games</option>
                <option value="Sports&Outdoors">Sports & Outdoors</option>
                <option value="Grocery&GourmetFoods">Grocery & Gourmet Foods</option>
                <option value="Health&Wellness">Health & Wellness</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Payment Method</label>
                <select className="form-select" name="payment"  id="role" value={formData.payment} onChange={handleChange} required>
                <option value="">Select Method</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="about" className="form-label"  >Company Location</label>
                <textarea className="form-control" id="about" name="location"  placeholder="Tell us something about yourself" rows="3" required value={formData.location} onChange={handleChange}></textarea>
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
                <span className="badge bg-warning text-dark p-2"><Link to='/'>Create User Account</Link> </span>
            </p>

            <p className="text-center mt-3 mb-0">
              Already have an account? <Link to='/login'>Login</Link>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Suppliresignup
