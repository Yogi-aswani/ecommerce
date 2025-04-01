import React, { useState,useEffect } from 'react';
import Home from './Home';
import axios from 'axios';

import $ from 'jquery';
import Swal from 'sweetalert2'

const address = () => {
    const isLogin = localStorage.getItem('token');
    const [add, setadd] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    receiverName: '', receiverPhone: '', pincode: '', city: '', state: '', country: '', address: '', apartment: '', landmark: '', alternativeNumber: '',
  });
  const [formDataEdit, setFormDataEdit] = useState({
    receiverName: '', receiverPhone: '', pincode: '', city: '', state: '', country: '', address: '', apartment: '', landmark: '', alternativeNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
}; 
const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setFormDataEdit({
        ...formDataEdit,
        [name]: value,
    });
};


  
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:7000/API/addressAdd',{...formData},{
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': `Bearer ${token}`
        }
      });
      console.log(response.data)
      Swal.fire({
        icon: 'success',
        title: 'Address Add Successfull',
        showConfirmButton: false,
        timer: 1500
      })
      setShowModal(false)
      getAddress();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      console.log(error);
    }

  }
  const getAddress = async() => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get('http://localhost:7000/API/getAddress', {
            headers: {
            'authorization': `Bearer ${token}`
            }
        })
        
        console.log(response.data)
        setadd(response.data)
    } catch (error) {
        console.log(error)
    }
    }

  useEffect(() => {
    getAddress();
}, []);

let id;
const adressEdit = async(id)=>{
  id=id;
  console.log(id);
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`http://localhost:7000/API/getSingleAdress/${id}`, {
        headers: {  
          'authorization': `Bearer ${token}`
        }
      });
      setShowEditModal(true);
      setFormDataEdit(response.data)      

      console.log(response.data);
    }
    catch (error) {
      console.log(error)
    }


}

const addressDelete = async(id) => {
    console.log(id)
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`http://localhost:7000/API/addressdelete/${id}`, {
        headers: {  
          'authorization': `Bearer ${token}`
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'Delete Successfull',
        showConfirmButton: false,
        timer: 1500
      })
      getAddress();

     
    }
    catch (error) {
      console.log(error)
    }
}

const handleSubmitEdit = async()=>{
  try {
    const token = localStorage.getItem('token');
    formDataEdit.id = id;
    const response = await axios.post('http://localhost:7000/API/editAdress',{...formDataEdit},{
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': `Bearer ${token}`
      }
    });
    console.log(response.data)
    Swal.fire({
      icon: 'success',
      title: 'Address Edit Successfull',
      showConfirmButton: false,
      timer: 1500
    })
    setShowEditModal(false)
    getAddress();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
    console.log(error);
  }

}


    
  return (
    <>
       <Home/>
       <div className="container mt-5">
      <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>Add Address</button>

      {showModal && (
        <div className="modal show d-block fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Address</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form  onSubmit={handleSubmit}>
                  <div className="form-group"><label htmlFor="receiverName">Receiver Name</label><input type="text" className="form-control" id="receiverName" name='receiverName' required value={formData.receiverName} onChange={handleChange} placeholder="Enter receiver name" /></div>
                  <div className="form-group"><label htmlFor="receiverPhone">Receiver Phone</label><input type="tel" className="form-control" id="receiverPhone" name='receiverPhone' required value={formData.receiverPhone} onChange={handleChange} placeholder="Enter receiver phone" /></div>
                  <div className="form-group"><label htmlFor="pincode">Pincode</label><input type="text" className="form-control" id="pincode" name='pincode' required value={formData.pincode} onChange={handleChange} placeholder="Enter pincode" /></div>
                  <div className="form-group"><label htmlFor="city">City</label><input type="text" className="form-control" id="city" name='city' required value={formData.city} onChange={handleChange} placeholder="Enter city" /></div>
                  <div className="form-group"><label htmlFor="state">State</label><input type="text" className="form-control" id="state" name='state' required value={formData.state} onChange={handleChange} placeholder="Enter state" /></div>
                  <div className="form-group"><label htmlFor="country">Country</label><input type="text" className="form-control" id="country" name='country' required value={formData.country} onChange={handleChange} placeholder="Enter country" /></div>
                  <div className="form-group"><label htmlFor="address">Address</label><textarea className="form-control" id="address" name='address' required rows="3" value={formData.address} onChange={handleChange} placeholder="Enter address" /></div>
                  <div className="form-group"><label htmlFor="apartment">Apartment/Building</label><input type="text" className="form-control" id="apartment" name='apartment' value={formData.apartment} onChange={handleChange} placeholder="Enter apartment/building" /></div>
                  <div className="form-group"><label htmlFor="landmark">Landmark</label><input type="text" className="form-control" id="landmark" name='landmark' required value={formData.landmark} onChange={handleChange} placeholder="Enter landmark" /></div>
                  <div className="form-group"><label htmlFor="alternativeNumber">Alternative Number</label><input type="tel" className="form-control" required id="alternativeNumber" name='alternativeNumber' value={formData.alternativeNumber} onChange={handleChange} placeholder="Enter alternative number" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary">Close</button>
                    <button type="submit" className="btn btn-primary">Save Address</button>
                </div>
                </form>
              </div>
             
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="container mt-5">
      <h2>Your Address</h2>
     
        <table className="table">
          <thead>
            <tr>
              <th>Reciver Name</th>
              <th>Reciever Phone</th>
              <th>Pincode</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          {isLogin ? (
          <tbody>
            {add.map((item) => (
              <tr key={item._id}>
                <td>{item.receiverName}</td>
                <td>{item.receiverPhone}</td>
                <td>{item.pincode}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.country}</td>
                <td>{item.address}</td>
                <td>
                <button className="btn btn-sm btn-primary me-1" onClick={(e)=>adressEdit(item._id)}>
                <i className="bi bi-pencil"></i>
              </button>
              <button className="btn btn-sm btn-danger" onClick={(e)=>addressDelete(item._id)}>
                <i className="bi bi-trash"></i>
              </button>
                </td>
              </tr>
            ))}
          </tbody>
          ):(
           <h6>Your Wishlist Is Empty</h6>
      )}
        </table>
    </div>  {showEditModal && (
        <div className="modal show d-block fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Address</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group"><label htmlFor="receiverName">Receiver Name</label><input type="text" className="form-control" id="receiverName" name='receiverName' required value={formDataEdit.receiverName} onChange={handleChangeEdit} placeholder="Enter receiver name" /></div>
                  <div className="form-group"><label htmlFor="receiverPhone">Receiver Phone</label><input type="tel" className="form-control" id="receiverPhone" name='receiverPhone' required value={formDataEdit.receiverPhone} onChange={handleChangeEdit} placeholder="Enter receiver phone" /></div>
                  <div className="form-group"><label htmlFor="pincode">Pincode</label><input type="text" className="form-control" id="pincode" name='pincode' required value={formDataEdit.pincode} onChange={handleChangeEdit} placeholder="Enter pincode" /></div>
                  <div className="form-group"><label htmlFor="city">City</label><input type="text" className="form-control" id="city" name='city' required value={formDataEdit.city} onChange={handleChangeEdit} placeholder="Enter city" /></div>
                  <div className="form-group"><label htmlFor="state">State</label><input type="text" className="form-control" id="state" name='state' required value={formDataEdit.state} onChange={handleChangeEdit} placeholder="Enter state" /></div>
                  <div className="form-group"><label htmlFor="country">Country</label><input type="text" className="form-control" id="country" name='country' required value={formDataEdit.country} onChange={handleChangeEdit} placeholder="Enter country" /></div>
                  <div className="form-group"><label htmlFor="address">Address</label><textarea className="form-control" id="address" name='address' required rows="3" value={formDataEdit.address} onChange={handleChangeEdit} placeholder="Enter address" /></div>
                  <div className="form-group"><label htmlFor="apartment">Apartment/Building</label><input type="text" className="form-control" id="apartment" name='apartment' value={formDataEdit.apartment} onChange={handleChangeEdit} placeholder="Enter apartment/building" /></div>
                  <div className="form-group"><label htmlFor="landmark">Landmark</label><input type="text" className="form-control" id="landmark" name='landmark' required value={formDataEdit.landmark} onChange={handleChangeEdit} placeholder="Enter landmark" /></div>
                  <div className="form-group"><label htmlFor="alternativeNumber">Alternative Number</label><input type="tel" className="form-control" required id="alternativeNumber" name='alternativeNumber' value={formDataEdit.alternativeNumber} onChange={handleChangeEdit} placeholder="Enter alternative number" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary">Close</button>
                    <button type="button" onClick={handleSubmitEdit} className="btn btn-primary">Edit Address</button>
                </div>
                </form>
              </div>
             
            </div>
          </div>
        </div>
      )}



    </>
  )
}

export default address
