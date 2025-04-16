import React, { useEffect, useState } from 'react';
import Home from './Home';
import axios from 'axios';
import Swal from 'sweetalert2';
const YourOrder = () => {
    const isLogin = localStorage.getItem('token');
    const [cart, setCart] = useState([]);
    // const [filterr, setFilter] = useState([]);
    const image = "https://m.media-amazon.com/images/I/51s1iQ3NU1L._SX300_SY300_QL70_FMwebp_.jpg"


    const getYourOrder = async() => {
         const token = localStorage.getItem('token')
         try {
             const response = await axios.get('http://localhost:7000/API/getYourOrders', {
                 headers: {
                 'authorization': `Bearer ${token}`
                 }
             })
             console.log(response.data)
             setCart(response.data)
         } catch (error) {
             console.log(error)
         }
         }
   
       useEffect(() => {
        getYourOrder();
           }, []);

  const handleCancelItem = async(id) => {
  const token = localStorage.getItem('token');
    try {
        await axios.get(`http://localhost:7000/API/orderCancel/${id}`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        Swal.fire({
          icon: 'success',
          title: 'Cancel Successful',
          showConfirmButton: false,
          timer: 1500
      });
        getYourOrder();

    } catch (error) {
        console.error("Error removing item:", error);
        Swal.fire({
            icon: 'error',
            title: 'Failed to remove item',
        });
    }
  };    
  const handleReturnItem = async(id) => {
    const token = localStorage.getItem('token');
      try {
          await axios.get(`http://localhost:7000/API/orderReturn/${id}`, {
              headers: {
                  'authorization': `Bearer ${token}`
              }
          });
          Swal.fire({
            icon: 'success',
            title: 'Return Successful',
            showConfirmButton: false,
            timer: 1500
        });
          getYourOrder();
  
      } catch (error) {
          console.error("Error removing item:", error);
          Swal.fire({
              icon: 'error',
              title: 'Failed to remove item',
          });
      }
    };

    const handleFillter = (data) => {
      if (data.action === "allproduct") {
          getYourOrder(); // Fetch all orders again
      } else {
          const filteredData = cart.filter(item => item.status === data.action);
          setCart(filteredData);
      }
  };  
    
  return (
    <>
        <Home/>
        <div className="container mt-2 d-flex justify-content-between align-items-center">
              <h2>Your Orders</h2>
              <select name="" id="" className="form-select" style={{width:'200px'}} onChange={(e) => handleFillter({ action: e.target.value })}>
                <option value="allproduct">All Product</option>
                <option value="cancel">Cancel</option>
                <option value="approved">Returned</option>
                <option value="packaging">Processing</option>
                <option value="initied">Placed</option>
            </select>
        </div>
        <div className="container mt-5">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>ReciverName</th>
                <th>Adress</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>QTY</th>
                {/* <th>Status</th> */}
                <th>Action</th>
              </tr>
            </thead>
            {isLogin ? (
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td><img src={image} alt={item.productId.product_name} style={{ width: '50px', height: '50px' }} /></td>
                  <td>{item.addressId.receiverName}</td>
                  <td>{item.addressId.address}</td>
                  <td>{item.productId.product_name}</td>
                  <td>{item.productId.category}</td>  
                  <td>{item.productId.price}</td>
                  <td>{item.quantity}</td>
                  {/* <td>{item.status}</td> */}
                  <td>
                  {item.status === 'initied' && (
                    <button className='btn btn-danger' onClick={() => handleCancelItem(item._id)}>Cancel</button> 
                  )}
                  {item.status === 'delivery' && (      
                      <button className='btn btn-success' onClick={() => handleReturnItem(item._id)}>Return</button>
                  )}
                  {item.status === 'approved' && (      
                      <p className=''>Order Returned</p>
                  )}
                  {item.status === 'packaging' && (      
                      <p className=''>Order Processing</p>
                  )}
                  {item.status === 'cancel' && (      
                      <p className=''>Order Canceled</p>
                  )}
                  {item.status === 'return' && (      
                      <p className=''>Wait For Approvel</p>
                  )}  
                  </td>
                </tr>
              ))}
            </tbody>
            ):( 
            <h6>Your Orders Is Empty</h6>
        )}
          </table>
        </div>

    </>
  )
}

export default YourOrder
