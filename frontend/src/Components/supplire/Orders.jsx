import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './header';

const Orders = () => {
const isLogin = localStorage.getItem('token');
const [cart, setCart] = useState([]);
const image = "https://m.media-amazon.com/images/I/51s1iQ3NU1L._SX300_SY300_QL70_FMwebp_.jpg"


const getYourOrder = async() => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get('http://localhost:7000/API/getAllOrders', {
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

const handleActions = async(data)=>{
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:7000/API/UpdateActions',data,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': `Bearer ${token}`
          }
        });
        console.log(response.data)
        Swal.fire({
          icon: 'success',
          title: 'Update Successfull',
          showConfirmButton: false,
          timer: 1500
        })
        getYourOrder();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        console.log(error);
      }
    
}  
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
    <Header/>
    <div className="container-fluid mt-4 d-flex justify-content-between align-items-center">
        <h4>My Orders</h4>
        <select name="" id="" className="form-select" style={{width:'200px'}} onChange={(e) => handleFillter({ action: e.target.value })}>
            <option value="allproduct">All Product</option>
            <option value="delivery">Deliverd</option>
            <option value="cancel">Cancel</option>
            <option value="approved">Returned</option>
            <option value="packaging">Packaging</option>
            <option value="initied">Inited</option>
        </select>
    </div>
     
    <div className="d-flex">
        <div className="flex-grow-1 p-4">
        
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
                        <th>Perform Action</th>
                    </tr>
                </thead>
                {isLogin ? (
                <tbody>
                    {cart.map((item) => (
                        <tr key={item._id}>
                            <td><img src={image} alt={item.productId.product_name} style={{ width: '50px', height: '50px' }} /></td>
                            <td>{item.addressId.receiverName}</td>
                            <td>{item.addressId.address}</td>
                            <td>{item.productId.product_name}</td>
                            <td>{item.productId.category}</td>
                            <td>{item.productId.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.status}</td>
                            <td>
                            <div className="mb-3">
                                <select className="form-select" value={item.status} id="category" name="category" onChange={(e) => handleActions({ action: e.target.value, id: item._id })} 
                                    required
                                >
                                {item.status === "initied" && (
                                    <>
                                        <option value="">Initied</option>
                                        <option value="cancel">Cancel</option>
                                        <option value="packaging">Packaging</option>
                                    </>
                                )}
                                {item.status === "packaging" && (
                                    <>
                                    <option value={item.status}>{item.status}</option>
                                    <option value="delivery">Delivery</option>
                                    </>
                                )}
                                {item.status === "return" && (
                                    <>
                                    <option value="">Order Return</option>
                                    <option value="approved">Approved</option>
                                    </>
                                )}
                                {item.status === "approved" && (
                                    <option><p>Order Returned</p></option>   
                                )}
                                {item.status === "delivery" && (
                                    <option><p>Order Delivered</p></option>
                                )}
                                {item.status === "cancel" && (
                                    <option><p>Order Canceled</p></option>
                                )}
                               
                                </select>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                ):(
                 <h6>Your Orders Is Empty</h6>
        )}
            </table>
     
        </div>
    </div>
 </>
)
}

export default Orders