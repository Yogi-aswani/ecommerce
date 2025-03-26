import React, { useEffect, useState } from 'react';
import Home from './Home';
import axios from 'axios';


const Wishlist = () => {
    const isLogin = localStorage.getItem('token');
    const [cart, setCart] = useState([]);
    const image = "https://m.media-amazon.com/images/I/51s1iQ3NU1L._SX300_SY300_QL70_FMwebp_.jpg"

    useEffect(() => {
            const getWishlist = async() => {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.get('http://localhost:7000/API/getAllWishlist', {
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
            getWishlist();
        }, []);
    
  return (
    <>
<Home/>
    <div className="container mt-5">
      <h2>Your Wishlist</h2>
     
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Category</th>
              <th>Product</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          {isLogin ? (
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td><img src={image} alt={item.productId.product_name} style={{ width: '50px', height: '50px' }} /></td>
                <td>{item.productId.product_name}</td>
                <td>{item.productId.category}</td>
                <td>${item.productId.price}</td>
                <td>
                <i className="bi bi-balloon-heart-fill" style={{cursor: 'pointer',color:'red'}}></i>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" className="text-right"><strong>Total:</strong></td>
              <td>$0000</td>
              <td></td>
            </tr>
          </tbody>
          ):(
           <h6>Your Wishlist Is Empty</h6>
      )}
        </table>
    </div>
    </>
  )
}

export default Wishlist
