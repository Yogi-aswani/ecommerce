import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [div ,setDiv]= useState(false)
    const [formData, setFormData] = useState({
          email: '',
      });
    const [otps ,setOtp]= useState({
        otp: '',
        newpass: '',
        cpass: '',
    })

                
      const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
              ...formData,
              [name]: value,
          });
      };
      const handleChangeotp = (e) => {
        const { name, value } = e.target;
        setOtp({
            ...otps,
            [name]: value,
        });
    };
      let email
      const handleSubmit = (e) => {
          e.preventDefault();
            axios.post('http://localhost:7000/API/getotp', { ...formData })
            .then((res) => {
              console.log('Data saved', res);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "OTP Send Success",
                showConfirmButton: false,
                timer: 1500
              });
      
              setDiv(true)
              email = formData.email
            })
            .catch((err) => {
              console.log('Error saving data', err);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.message,
      
              });
            });
          // Add your form submission logic here
        };

        const handleSubmitOtp = (e) => {
          e.preventDefault();
          if(formData.newpass!==formData.cpass){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Password and Comfirm Paass not match",
            });
          }
          else{
              console.log(formData.email)
              axios.post('http://localhost:7000/API/forgetPassword', { ...otps,formData })
              .then((res) => {
                console.log('Data saved', res);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Password Change Success",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/login')
        
              })
              .catch((err) => {
                console.log('Error saving data', err);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: err.response.data.message,
        
                });
              });
      
            }
        }
          
  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 mt-5">
            <h2 className="text-center mb-4"> Forgot Password </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Get OTP From Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" required value={formData.opass} onChange={handleChange} name="email"/>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Get OTP</button>
              </div>
            </form>
            <p className="text-center mt-3 mb-0">
            You Want To  <Link to='/login' style={{textDecoration:'none'}}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    {div&& ( <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 mt-5">
            <h2 className="text-center mb-4"> OTP Varify </h2>
            <form onSubmit={handleSubmitOtp}>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">OTP</label>
                <input type="otp" className="form-control" id="otp" placeholder="Enter OTP" required value={otps.otp} onChange={handleChangeotp} name="otp"/>
              </div>
              <div className="mb-3">
                <label htmlFor="new" className="form-label">New Password</label>
                <input type="new" className="form-control" id="new" placeholder="Enter New Password" required value={otps.newpass} onChange={handleChangeotp} name="newpass"/>
              </div>
              <div className="mb-3">
                <label htmlFor="cpass" className="form-label">Comfirm Password</label>
                <input type="cpass" className="form-control" id="cpass" placeholder="Enter  Comfirm Password" required value={otps.cpass} onChange={handleChangeotp} name="cpass"/>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>)}
   
    </>

  )
}

export default ForgotPassword