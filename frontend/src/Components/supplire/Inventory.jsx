import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './header';

const Inventory = () => {
    const isLogin = localStorage.getItem('token');
    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);
    const [quantity, setQuantity] = useState();
    const image = "https://m.media-amazon.com/images/I/51s1iQ3NU1L._SX300_SY300_QL70_FMwebp_.jpg"

    const getYourOrder = async() => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get('http://localhost:7000/API/getAllInventory', {
                headers: {
                'authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
            setCart(response.data)
            setQuantity(response.data.qty)
            
        
        } catch (error) {
            console.log(error)
        }
        }
    
    useEffect(() => {
    getYourOrder();
    }, []);

    const handleQuantity = async(qty,id) => { 
        console.log(qty,id)   
        setData({
            id: id,
            qty: qty
        })
        
        
    }

    const submitQuntity = (id) => async(e) => {
        e.preventDefault();
        console.log(data)
        const token = localStorage.getItem('token')
        try {
            const response = await axios.post('http://localhost:7000/API/updateInventory',data, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
            Swal.fire({
                icon: 'success',
                title: 'Update Successfull',
                showConfirmButton: false,
                timer: 1500
              })
              setQuantity('')
              getYourOrder();
        } catch (error) {
            console.log(error)
        }
    }
        
    
    
  return (
   <>
      <Header/>
      <div className="container-fluid mt-4">
        <h4>Inventory Handle</h4>
      </div>
      <div className="container-fluid mt-4">
      <div className="d-flex">
        <div className="flex-grow-1 p-4">
        
        <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Category</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>QTY</th>
                        <th>Increase Qty</th>
                    </tr>
                </thead>
                {isLogin ? (
                <tbody>
                    {cart.map((item) => (
                        
                        <tr key={item._id}>
                            <td><img src={image} alt={item.productId.product_name} style={{ width: '50px', height: '50px' }} /></td>
                            <td>{item.productId.category}</td>
                            <td>{item.productId.product_name}</td>
                            <td>{item.productId.price}</td>
                            <td>{item.qty}</td>
                            <td style={{display:'flex',alignItems:'center'}} >
                                <input type="number" name="quantity" id="" value={quantity} onChange={(e)=>handleQuantity(e.target.value,item._id)}/>
                                <button className='btn btn-success' style={{fontSize:'13px'}} onClick={submitQuntity(item._id)}>Ok</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                ):(
                 <h6>Your Inventory Is Empty</h6>
        )}
            </table>
     
        </div>
    </div>
      </div>
   </>
  )
}

export default Inventory
