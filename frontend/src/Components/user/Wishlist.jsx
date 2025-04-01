import React, { useEffect, useState } from 'react';
import Home from './Home';
import axios from 'axios';
import Swal from 'sweetalert2';



const Wishlist = () => {
    const isLogin = localStorage.getItem('token');
    const [cart, setCart] = useState([]);
    const image = "https://m.media-amazon.com/images/I/51s1iQ3NU1L._SX300_SY300_QL70_FMwebp_.jpg"

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

    useEffect(() => {
            getWishlist();
        }, []);

const handleRemoveItem = async (id) => {
  const token = localStorage.getItem('token');
  try {
      await axios.get(`http://localhost:7000/API/wishListDelete/${id}`, {
          headers: {
              'authorization': `Bearer ${token}`
          }
      });
      Swal.fire({
          icon: 'success',
          title: 'Delete Successful',
          showConfirmButton: false,
          timer: 1500
      });
      getWishlist();

  } catch (error) {
      console.error("Error removing item:", error);
      Swal.fire({
          icon: 'error',
          title: 'Failed to remove item',
      });
  }
};
        
    
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
                <td>{item.productId.price}</td>
                <td>
                <i className="bi bi-balloon-heart-fill" style={{cursor: 'pointer',color:'red'}} onClick={() => handleRemoveItem(item._id)}></i>
                </td>
              </tr>
            ))}
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
