import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import Header from './header';
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';

const Product = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [ViewModal, setViewModal] = useState(false);
  const [product, setProduct] = useState([]);
  const [SingleproductView, setProductView] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    product_name: '',
    price: '',
    qty: '',
    description: '',
  });


  const openmodal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleimageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const addpro = new FormData();
    Object.keys(formData).forEach(key => {
      addpro.append(key, formData[key]);
    });
    images.forEach((image) => {
      addpro.append('images', image);
    }
    );
    // get products api
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:7000/API/addProduct', addpro,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': `Bearer ${token}`
        }
      });
      setModal(false);
      // getproducts();

      console.log(response.data);

    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    const getproducts = async() => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get('http://localhost:7000/API/getAllProduct', {
        headers: {
          'authorization': `Bearer ${token}`
        }
        })
        console.log(response.data)
        setProduct(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getproducts();
  }, []);
  let count = 1;

  //product view

  const productView = async(id) => {
    console.log(id)
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`http://localhost:7000/API/productView/${id}`, {
        headers: {  
          'authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      setViewModal(true);
      setProductView(response.data);
       // Use the response data
      // Optionally, update the state or perform other actions with response.data
    }
    catch (error) {
      console.log(error)
    }
  }

 
  return (
    <>
    <Header/>
    <div className="container text-end mt-2">

    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myFormModal" onClick={openmodal}>Add Product</button>
    </div>
     
    <div className="d-flex">
      <div className="flex-grow-1 p-4">
      <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Category</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>QTY.</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      
        {product.map((item, index) => (
          <tr key={index}>
            <td>{count++}</td>
            <td>{item.category}</td>
            <td>{item.product_name}</td>
            <td>{item.price}</td>
            <td>{item.qty}</td>
            <td>{item.status ? 'Active': 'InActive'}</td>
            <td>
              <button className="btn btn-sm btn-info me-1" data-bs-toggle="modal" data-bs-target="#myViewModal" onClick={(e)=>productView(item._id)}>
                <i className="bi bi-eye"></i>
              </button>
              <button className="btn btn-sm btn-primary me-1" onClick={(e)=>productEdit(item._id)}>
                <i className="bi bi-pencil"></i>
              </button>
              <button className="btn btn-sm btn-danger" onClick={(e)=>productDelete(item._id)}>
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </div>
  {modal && ( <div className="container mt-5">
      <div className="modal fade" id="myFormModal" tabIndex="-1" aria-labelledby="myFormModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="myFormModalLabel">Add Product</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="myModalForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Prodcut Category</label>
                  <select className="form-select"  id="category" value={formData.category} onChange={handleChange} name="category"  required>
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home&Kitchen">Home & Kitchen</option>
                  <option value="Books&Stationery">Books & Stationery</option>
                  <option value="Beauty&PersonalCare">Beauty & Personal Care</option>
                  <option value="Toys&Games">Toys & Games</option>
                  <option value="Sports&Outdoors">Sports & Outdoors</option>
                  <option value="Grocery&GourmetFoods">Grocery & Gourmet Foods</option>
                  <option value="Health&Wellness">Health & Wellness</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter your name"  value={formData.product_name} onChange={handleChange} name="product_name"/>
                </div>
                <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input type="text" className="form-control" id="price" name="price" placeholder="Enter Price" value={formData.price} onChange={handleChange}/>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="qty" className="form-label">QTY.</label>
                  <input type="number" className="form-control" id="qty" name="qty" placeholder="Enter QTY" value={formData.qty} onChange={handleChange}/>
                </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Product Description</label>
                  <textarea className="form-control" id="message" rows="3" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="qty" className="form-label">Product Images</label>
                  <input type="file" className="form-control" id="qty" name="images" multiple  onChange={(e)=>handleimageChange(e)}/>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" form="myModalForm" className="btn btn-primary">Submit</button>
              </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>)}

    {ViewModal && ( 
    <div className="container mt-5">
      <div className="modal fade" id="myViewModal" tabIndex="-1" aria-labelledby="myViewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="myViewModalLabel">Product View</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="table-responsive">
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>Category</th>
                        <td>{SingleproductView.category}</td>
                    </tr>
                    <tr>
                        <th>Product Name</th>
                        <td>{SingleproductView.product_name}</td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>${SingleproductView.price}</td>
                    </tr>
                    <tr>
                        <th>Qty</th>
                        <td>{SingleproductView.qty}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{SingleproductView.description}</td>
                    </tr>
                    <tr>
                        <th>Product Images</th>
                        <td>Clothing</td>
                    </tr>
                </tbody>
            </table>
        </div>


            </div>
            
          </div>
        </div>
      </div>  
    </div>)}


        </>
  )
}

export default Product
