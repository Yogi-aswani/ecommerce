const Supplier = require('../Model/SupplireSchema');
const User = require('../Model/UserSchema');
const Product = require('../Model/ProductSchema');
const ProductImages = require('../Model/Productimages');
const Inventory = require('../Model/InventorySchema');
const {FileUpload} = require('../Utility/cloudinary');
const SuppliOrder = require('../Model/SupplireOrder');


exports.addProduct = async (req, res) => {
  console.log(req.user._id)
  
    try {
        if (!req.files || req.files.length === 0) { // Check if files array is empty or undefined
          return res.status(400).json({ message: 'Please upload at least one image' });
        }
        const supplire = await User.findOne({ _id: req.user._id });
        console.log(supplire)
        const { product_name, price, description, qty, category } = req.body;
        const product = new Product({
          supplierId: supplire.supplier_id,
          category,
          product_name,
          price,
          description,
          qty,
        });
        const newProduct = await product.save();
        let uploadedFiles = [];
        const filesArray = Object.values(req.files);
        for(files of filesArray){
          const result = await FileUpload(files);
          console.log('result', result);
          result.forEach(file => {
            uploadedFiles.push(file.url);
          });
        }
        console.log('uploadedFiles', uploadedFiles);
        const newProductImage = new ProductImages({
          productId: newProduct._id,
          image: uploadedFiles
        });
        await newProductImage.save();
        const inventory = new Inventory({
          productId: newProduct._id,
          supplierId: supplire.supplier_id,
          qty: qty,
        });
        await inventory.save();
        return res.status(200).json({ message: 'Product added' });
    
      } catch (error) {
        console.error('Error in addProduct', error); // Use console.error for errors
        return res.status(500).json({ message: 'Internal server error' });
      }
    
}

exports.getProducts = async (req, res) => {
  const Supplire = await User.findById(req.user._id);
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'Supplier ID is required' });
    }
    const products = await Product.find({ supplierId: Supplire.supplier_id });
    // console.log(products)
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


exports.productView = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // const productImas = await ProductImages.find({ productId: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getAllOrders = async(req,res)=>{

  const Supplire = await User.findById(req.user._id);
    try {
      if (!req.user || !req.user._id) {
        return res.status(400).json({ message: 'Supplier ID is required' });
      }

      const getAllOrder = await SuppliOrder.find({ supplireId: Supplire.supplier_id })
          .populate('addressId') // Populate address details
          .populate('productId'); // Populate product details
      
      if (!getAllOrder || getAllOrder.length === 0) {
          return res.status(404).json({ message: 'No orders found for this user' });
      }
      return res.status(200).json(getAllOrder);
      } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
      }

}

exports.UpdateActions = async(req,res)=>{
 
  const action = req.body.action;
  const id = req.body.id;
  try {
    const updatedOrder = await SuppliOrder.findByIdAndUpdate(
      id,
      { status: action },
      { new: true } // Return the updated document
    );

     if (updatedOrder) {
        if(action === 'approved'){
          // Increase the quantity back in the inventory table
          await Inventory.findOneAndUpdate(
            { productId: updatedOrder.productId },
            { $inc: { qty: updatedOrder.quantity } }, // Increment the quantity
            { new: true }
            );
        }
      }

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ message: 'Order status updated', updatedOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getAllInventory = async(req,res)=>{
  const Supplire = await User.findById(req.user._id);
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'Supplier ID is required' });
    }
    const inventory = await Inventory.find({ supplierId: Supplire.supplier_id })
    .populate('productId'); // Populate product details
    if (!inventory || inventory.length === 0) {
      return res.status(404).json({ message: 'No inventory found' });
    }
    return res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
exports.updateInventory = async(req,res)=>{
  const id = req.body.id;
  const qty = req.body.qty;
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      { $inc: { qty: qty } }, // Increment the quantity
      { new: true } // Return the updated document
    );
    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    return res.status(200).json({ message: 'Inventory updated', updatedInventory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}