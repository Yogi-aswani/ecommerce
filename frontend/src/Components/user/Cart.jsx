import React, { useEffect, useState } from 'react';
import Home from './Home';
import axios from 'axios';
import Swal from 'sweetalert2';

const Cart = () => {
    const isLogin = localStorage.getItem('token');
    const [cart, setCart] = useState([]);
    const [add, setadd] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(false);
    const [paymentMode, setPaymentMode] = useState(null);
    const image = "https://m.media-amazon.com/images/I/51s1iQ3NU1L._SX300_SY300_QL70_FMwebp_.jpg";


    const getcart = async () => {
      const token = localStorage.getItem('token');
      try {
          const response = await axios.get('http://localhost:7000/API/getAllCart', {
              headers: {
                  'authorization': `Bearer ${token}`
              }
          });
          setCart(response.data);
      } catch (error) {
          console.error("Error fetching cart:", error);
      }
  };
    useEffect(() => {
        getcart();
    }, []);

    useEffect(() => {
        const getAddress = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:7000/API/getAddress', {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                });
                setadd(response.data);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };
        getAddress();
    }, []);

    const handleRemoveItem = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.get(`http://localhost:7000/API/cartDelete/${id}`, {
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
            getcart();
            setCart(cart.filter(item => item.productId._id !== id));
        } catch (error) {
            console.error("Error removing item:", error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to remove item',
            });
        }
    };

    const handleAddressSelection = (id) => {
        setSelectedAddressId(id);
    };

    const handlePaymentModeSelection = (mode) => {
        setPaymentMode(mode);
    };

  const handleSubmitPayment = async () => {
      if (!selectedAddressId) {
          Swal.fire({ icon: 'error', title: 'Please select an address.' });
          return;
      }
      if (!paymentMode) {
          Swal.fire({ icon: 'error', title: 'Please select a payment mode.' });
          return;
      }

      const token = localStorage.getItem('token');
      try {
          await axios.post(
              'http://localhost:7000/API/PlaceOrder',
              { addressId: selectedAddressId, payment_mode: paymentMode ,cart:cart},
              { headers: { 'authorization': `Bearer ${token}` } }
          );
          Swal.fire({ icon: 'success', title: 'Order Placed Successfully', showConfirmButton: false, timer: 1500 });
          setCart([]);
          document.querySelector('#myFormModal .btn-close').click();
          setSelectedAddressId(false);
          setPaymentMode(null);
      } catch (error) {
          console.error("Error placing order:", error);
          Swal.fire({ icon: 'error', title: 'Failed to place order.' });
      }
  };

  const handleQuantityChangePlus = async(id) => {
  const token = localStorage.getItem('token');
    try {
        await axios.get(`http://localhost:7000/API/plusQuantity/${id}`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        getcart();
    } catch (error) {
        console.error("Error removing item:", error);
        Swal.fire({
            icon: 'error',
            title: 'Failed to remove item',
        });
    }
  };

  const handleQuantityChangeMinus = async(id) => {
    const token = localStorage.getItem('token');
      try {
          await axios.get(`http://localhost:7000/API/MinusQuantity/${id}`, {
              headers: {
                  'authorization': `Bearer ${token}`
              }
          });
          getcart();
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
  <Home />
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
      {isLogin ? (
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td><img src={image} alt={item.productId.product_name} style={{ width: '50px', height: '50px' }} /></td>
              <td>{item.productId.product_name}</td>
              <td>{item.productId.price}</td>
              <td>
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChangeMinus(item._id,)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChangePlus(item._id)}>+</button>
                </div>
              </td>
              <td>{(item.productId.price * item.quantity)}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleRemoveItem(item._id)}><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
          {cart.length > 0 ? (
          <tr>
            <td colSpan="4" className="text-right"><strong>Total:</strong></td>
            <td>{cart.reduce((total, item) => total + item.productId.price * item.quantity, 0)}</td>
            <td></td>
          </tr>
        ) : <h6>Your Cart Is Empty</h6>}
        </tbody>
      ) : (
        <h6>Your Cart Is Empty</h6>
      )}
    </table>
    {cart.length > 0 ? (
      <div className='text-end'>
      <button className='btn btn-info' style={{ color: 'white' }} data-bs-toggle="modal" data-bs-target="#myFormModal">Place Order</button>
    </div>
    ) : null}
    
  </div>

  <div className="container mt-5">
  <div className="modal fade" id="myFormModal" tabIndex="-1" aria-labelledby="myFormModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="myFormModalLabel">Select Address</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <table className="table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Receiver Name</th>
                <th>Receiver Phone</th>
                <th>Pincode</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Address</th>
              </tr>
            </thead>
            {isLogin ? (
              <tbody>
                {add.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="radioGroup" id={`radio-${item._id}`} value={item._id} onChange={() => handleAddressSelection(item._id)} />
                      </div>
                    </td>
                    <td>{item.receiverName}</td>
                    <td>{item.receiverPhone}</td>
                    <td>{item.pincode}</td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td>{item.country}</td>
                    <td>{item.address}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <h6>Your Cart Is Empty</h6>
            )}
          </table>
          {selectedAddressId ? (
            <form>
              <div className="container">
                <label htmlFor="" className='form-label'>Select Payment Mode</label>
                <select className="form-select" id="category" value={paymentMode} onChange={(e) => handlePaymentModeSelection(e.target.value)} name="payment_mode" required>
                  <option value="">Select Payment</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary"  onClick={handleSubmitPayment}>Save</button>
              </div>
            </form>
          ) : (
            <h6>Select Any Address To Place Order</h6>
          )}
        </div>
        </div>
      </div>
      </div>
    </div>

    
     </>
    )
}

export default Cart
