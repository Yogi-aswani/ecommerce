import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ResetPassword = () => {
     const [formData, setFormData] = useState({
                    
                    opass: '',
                    newpass: '',
                    cpass:''
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
                    console.log('Form Data Submitted:', formData);
                    // Add your form submission logic here
                };
  return (
   <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 mt-5">
            <h2 className="text-center mb-4"> Reset Password </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="opass" className="form-label">Old Password</label>
                <input type="password" className="form-control" id="opass" placeholder="Enter your old Password" required value={formData.opass} onChange={handleChange} name="opass"/>
              </div>

              <div className="mb-3">
                <label htmlFor="newpass" className="form-label">New Password</label>
                <input type="password" className="form-control" id="newpass" placeholder="Enter your New Password" required value={formData.newpass} onChange={handleChange} name="newpass"/>
              </div>

              <div className="mb-3">
                <label htmlFor="cpass" className="form-label">Comfirm Password</label>
                <input type="password" className="form-control" id="cpass" placeholder="Enter your Comfirm Password" required value={formData.newpass} onChange={handleChange} name="cpass"/>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>

            <p className="text-center mt-3 mb-0">
              You Want To <Link to='/login' style={{textDecoration:'none'}}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default ResetPassword
