import React, { useEffect, useState } from 'react';
import Home from './Home';
import axios from 'axios';


const Cart = () => {
    const isLogin = localStorage.getItem('token');
    const [cart, setCart] = useState([]);
    const image = "https://m.media-amazon.com/images/I/51s1iQ3NU1L._SX300_SY300_QL70_FMwebp_.jpg"
    // const [cartItems, setCartItems] = useState([
    //     { id: 1, name: 'Product A', price: 25.99, quantity: 2, imageUrl: 'https://m.media-amazon.com/images/I/51s1iQ3NU1L._SX300_SY300_QL70_FMwebp_.jpg' },
    //     { id: 2, name: 'Product B', price: 15.50, quantity: 1, imageUrl: 'https://via.placeholder.com/150' },
    //     { id: 3, name: 'Product C', price: 35.00, quantity: 3, imageUrl: 'https://via.placeholder.com/150' },
    //   ]);
    
    //   const handleQuantityChange = (id, change) => {
    //     setCartItems((prevItems) =>
    //       prevItems.map((item) =>
    //         item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    //       )
    //     );
    //   };
    
    //   const handleRemoveItem = (id) => {
    //     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    //   };
    
     

      useEffect(() => {
        const getcart = async() => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get('http://localhost:7000/API/getAllCart', {
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
        getcart();
    }, []);


  return (
   <>
   <Home/>
    <div className="container mt-5">
      <h2>Your Cart</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          {isLogin ?(
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td><img src={image} alt={item.productId.product_name} style={{ width: '50px', height: '50px' }} /></td>
                <td>{item.productId.product_name}</td>
                <td>${item.productId.price}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChange(item.productId._id, -1)}>
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChange(item.productId._id, 1)}>
                      +
                    </button>
                  </div>
                </td>
                <td>${(item.productId.price * item.productId.qty)}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleRemoveItem(item.productId._id)}>
                    Remove
                  </button>
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
           <h6>Your Cart Is Empty</h6>
           )}
        </table>
      
    </div>
   </>
  )
}

export default Cart
