import React, { useEffect,useState } from 'react';
import { useParams } from "react-router-dom";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
const ProductView = () => {
  const [product, setProduct] = useState([])
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const productImage = 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; 

  useEffect(() => {
      const getproducts = async() => {
        try {
          const response = await axios.get(`http://localhost:7000/API/getSingleProduct/${id}`, {
          })
          console.log(response.data)
          
          setProduct(response.data)
        } catch (error) {
          console.log(error)
        }
      }
      getproducts();
    }, []);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
// console.log(products.product_name)
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
    <Home/>
    <div className="container mt-5">
      {product.map((products) => (
      <div className="row" key={products._id}>
        <div className="col-md-6">
        {products.productImages.length > 0 ? (
          products.productImages.map((image, index) => (
          <img src={image.image[0]} className="card-img-top" alt={product.product_name} width="100px" height="100px" key={index}/>
          ))
          ) : (
            <p>No images available</p>
          )}
          {/* <img src={productImage} className="img-fluid mb-3" alt={products.name} /> */}
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-secondary me-2">Tab 1</button>
            <button className="btn btn-outline-secondary me-2">Tab 2</button>
            <button className="btn btn-outline-secondary">Tab 3</button>
          </div>
        </div>
        <div className="col-md-6">
          <h2>{products.product_name}</h2>
          <p>Category: {products.category}</p>
          <p className="fs-4">${products.price}</p>
          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-outline-secondary" onClick={handleDecrease}>
              <i className="bi bi-dash"></i>
            </button>
            <span className="mx-3">{quantity}</span>
            <button className="btn btn-outline-secondary" onClick={handleIncrease}>
              <i className="bi bi-plus"></i>
            </button>
          </div>
          <button className="btn btn-primary">Add to Cart</button>
          <div className="mt-4">
            <h4>Product Details</h4>
            <p>{products.description}</p>
          </div>
        </div>
      </div>
        ))}
    </div>

    </>
  )
}

export default ProductView