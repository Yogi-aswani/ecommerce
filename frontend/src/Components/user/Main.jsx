import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
import Home from './Home';

const Main = () => {
  const islogin = localStorage.getItem('token');
  const [products, setProduct] = useState([])
  useEffect(() => {
    const getproducts = async() => {
      try {
        const response = await axios.get('http://localhost:7000/API/ViewAllProduct', {
        })
        console.log(response.data)
        setProduct(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getproducts();
  }, []);

  const handleWishlist = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:7000/API/addWishlist',{productId:id},{
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': `Bearer ${token}`
        }
      });
      console.log(response.data)
      Swal.fire({
        icon: 'success',
        title: 'Added to Wishlist ',
        showConfirmButton: false,
        timer: 1500
      })

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      console.log(error);
    }

  }
  const handleLink = () => {  
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please login to continue',
    });
    // window.location.href = '/login';
  } 
  const handleCart = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:7000/API/addTocart',{productId:id},{
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': `Bearer ${token}`
        }
      });
      console.log(response.data)
      Swal.fire({
        icon: 'success',
        title: 'Added to cart',
        showConfirmButton: false,
        timer: 1500
      })

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
    {islogin ?
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-3">
          {/* Sidebar */}
          <div className="list-group">
            <Link to="/cart" className="list-group-item list-group-item-action">
              Cart
            </Link>
            <Link to="/wishlist" className="list-group-item list-group-item-action">
              Wishlist
            </Link>
            <Link to="/address" className="list-group-item list-group-item-action">
              Address
            </Link> 
            <Link to="/yourOrders" className="list-group-item list-group-item-action">
              Your Orders
            </Link>   
          </div>
        </div>
        <div className="col-md-9">
          {/* Product Grid */}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                  <div className="card h-100">
                <Link to={`/productView/${product._id}`} style={{ textDecoration: 'none' }}>
                    {product.productImages.length > 0 ? (
                      product.productImages.map((image, index) => (
                        <img
                          src={image.image[0]}
                          className="card-img-top"
                          alt={product.product_name}
                          width="100px"
                          height="100px"
                          key={index}
                        />
                      ))
                    ) : (
                      <p>No images available</p>
                    )}
                </Link>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.product_name}</h5>
                      <p className="card-text">{product.price.toFixed(2)}</p>
                      <div className="mt-auto">
                        <button className="btn btn-primary me-2"onClick={(e)=>handleCart(product._id)}>Add to Cart</button>
                        <i className="bi bi-heart" style={{ cursor: 'pointer' }} onClick={(e)=>handleWishlist(product._id)}></i>
                      </div>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>:
     <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-3 mb-4">
          <div className="card h-100">
          <Link to={`/productView/${product._id}`} style={{textDecoration: 'none'}}> 
              {product.productImages.length > 0 ? (
                  product.productImages.map((image, index) => (
                  <img src={image.image[0]} className="card-img-top" alt={product.product_name} width="100px" height="100px" key={index}/>
                  ))
                ) : (
                  <p>No images available</p>
                )}
          </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">{product.price.toFixed(2)}</p>
                <div className="mt-auto">
                  <button className="btn btn-primary me-2" onClick={handleLink}>Add to Cart</button>
                  <i className="bi bi-heart" style={{cursor: 'pointer'}} onClick={handleLink}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    }
    </>
  )
}

export default Main
