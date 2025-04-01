import React, { useEffect, useState } from 'react';
import Home from './Home';
import axios from 'axios';
import Swal from 'sweetalert2';
const YourOrder = () => {
    const isLogin = localStorage.getItem('token');
    const [cart, setCart] = useState([]);
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
    
  return (
    <>
        <Home/>
        <div className="container mt-5">
      <h2>Your Orders</h2>
     
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
              <th>Status</th>
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
                <td>{item.status}</td>
                <td>
                <button className='btn btn-info text-light' onClick={() => handleRemoveItem(item._id)}>Return</button>
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
