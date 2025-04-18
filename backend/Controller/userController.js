const mongoose = require('mongoose');
const Product = require('../Model/ProductSchema');
const Productimages   = require('../Model/Productimages')
const Wishlist = require('../Model/WishlistSchema');
const User = require('../Model/UserSchema');
const Cart = require('../Model/CartSchema'); 
const Address = require('../Model/AdressSchema');
const SuppliOrder = require('../Model/SupplireOrder');
const Inventory = require('../Model/InventorySchema');

const Order = require('../Model/OrderSchema'); // Ensure you have an Order schema

exports.ViewAllProduct = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
              $lookup: {
            from: 'productimages', // The collection name for Productimages
            localField: '_id', // Field in the Product collection
            foreignField: 'productId', // Field in the Productimages collection
            as: 'productImages', // Alias for the joined data
              },
            },
            {
              $lookup: {
            from: 'inventories', // The collection name for Inventory
            localField: '_id', // Field in the Product collection
            foreignField: 'productId', // Field in the Inventory collection
            as: 'inventory', // Alias for the joined data
              },
            },
          ]);
        // const products = await Productimages.find().populate('productId');
        console.log(products);
        // return
        return res.status(200).json(products);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getSingleProduct = async (req, res) => {
    const productId = new mongoose.Types.ObjectId(req.params.id);
    try {
        const product = await Product.aggregate([
            {
              $match: { _id: productId } 
            },
            {
              $lookup: {
                from: 'productimages', 
                localField: '_id', 
                foreignField: 'productId', 
                as: 'productImages' 
              }
            }
          ]);
        console.log(product)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.addWishlist = async (req, res) => {
    console.log(req.user.id);
    const { productId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const newWishlist = new Wishlist({
            userId: req.user._id,
            productId: productId,
        });
        await newWishlist.save();
        return res.status(200).json({ message: 'Added to wishlist' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.addTocart = async (req, res) => {   
    console.log(req.user.id);
    const { productId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const existingCart = await Cart.findOne({ userId: req.user._id, productId: productId });
        if (existingCart) {
            existingCart.quantity += 1;
            await existingCart.save();
        } else {
            const newCart = new Cart({
            userId: req.user._id,
            productId: productId,
            quantity: 1,
            });
            await newCart.save();
        }
        return res.status(200).json({ message: 'Added to Cart' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getAllCart = async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.user._id, status: 'pending' }).populate('productId');
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAllWishlist = async (req, res) => {
    try {
        const Wish = await Wishlist.find({ userId: req.user._id }).populate('productId');
        // console.log(Wish);
        return res.status(200).json(Wish);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



exports.addressAdd = async (req, res) => {
    const { receiverName, receiverPhone, pincode, city, state, country ,address,apartment,landmark,alternativeNumber} = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const addaddress = new Address({
            userId:req.user._id,
            receiverName,
            receiverPhone,
            pincode,
            city,
            state,
            country,
            address,
            apartment,
            landmark,
            alternativeNumber
        });
        await addaddress.save();
        return res.status(200).json({ message: 'Address saved successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAddress = async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.user._id });
        if (!addresses || addresses.length === 0) {
            return res.status(404).json({ message: 'No addresses found for this user' });
        }
        return res.status(200).json(addresses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addressdelete = async (req, res) => {
    const { id } = req.params;
    try {
        const address = await Address.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!address) {
            return res.status(404).json({ message: 'Address not found or not authorized to delete' });
        }
        return res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.cartDelete = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const cart = await Cart.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found or not authorized to delete' });
        }
        return res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.PlaceOrder = async (req, res) => {
    try {
        const { addressId, payment_mode, cart } = req.body;

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or not provided correctly' });
        }

        const orders = [];
        const supplire_order=[];

        for (const item of cart) {
            const FindCart = await Cart.findById(item._id);
            if (!FindCart) {
                return res.status(404).json({ message: `Cart item with id ${item._id} not found` });
            }
            const FindInventory = await Inventory.findOne({productId:FindCart.productId});
            if (!FindInventory) {
                return res.status(404).json({ message: `Inventory item with id ${item._id} not found` });
            }
            else{
                if(FindInventory.qty<=FindCart.quantity){

                    const findProduct = await Product.findById(FindCart.productId);
                    return res.status(404).json({ message: `${findProduct.product_name} is out of stock` });
                }
                else{
                    FindCart.status='complete'
                    await FindCart.save();
                    const FindInventory = await Inventory.findOneAndUpdate(
                        { productId: FindCart.productId }, // Filter condition to find the document
                        { $inc: { qty: -FindCart.quantity } }, // Update operation to decrement the quantity
                        { new: true } // Option to return the updated document
                    );
                    const FindSupplire = await Product.findById(FindCart.productId);
                    const newOrder = new Order({
                        userId: req.user._id,
                        cartId: item._id,
                        addressId: addressId,
                        payment_mode: payment_mode,
                        deliveryDate:Date.now()
                    });

                    const savedOrder = await newOrder.save();
                    orders.push(savedOrder);
                    const supplireOrder = new SuppliOrder({
                        supplireId:FindSupplire.supplierId,
                        userId:req.user._id,
                        productId:FindCart.productId,
                        addressId:addressId,
                        payment_mode:payment_mode,
                        orderId:savedOrder._id,
                        quantity:FindCart.quantity,
                    })
                    const saveSuppliOrder = await supplireOrder.save();
                    supplire_order.push(saveSuppliOrder);
                    return res.status(200).json({ message: 'Order placed successfully', orders });
                }
            }                        
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.plusQuantity = async(req,res)=>{
    const { id } = req.params;
    console.log(id);
    try {
        const cart = await Cart.findOne({ _id: id, userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found or not authorized to update' });
        }

        const inventory = await Inventory.findOne({ productId: cart.productId });
        if (!inventory) {
            return res.status(404).json({ message: 'Product not found in inventory' });
        }

        if (cart.quantity + 1 > inventory.qty) {
            return res.status(400).json({ message: 'Insufficient stock in inventory' });
        }

        cart.quantity = cart.quantity + 1;
        await cart.save();
        return res.status(200).json({ message: 'successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.MinusQuantity = async(req,res)=>{
    const { id } = req.params;
    console.log(id);
    try {
        const cart = await Cart.findOne({ _id: id, userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found or not authorized to delete' });
        }
        if(cart.quantity>1){
            cart.quantity=(cart.quantity)-1;
            await cart.save();
        }
        else{
            console.log('quantity should not be minus')
        }
        return res.status(200).json({ message: 'successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.wishListDelete = async(req,res)=>{
    const { id } = req.params;
    console.log(id);
    try {
        const wishlist = await Wishlist.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found or not authorized to delete' });
        }
        return res.status(200).json({ message: 'Wishlist deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


exports.getSingleAdress = async(req,res)=>{
    const {id} = req.params;

    try {
        const addre = await Address.findOne({ _id: id, userId: req.user._id });
        if (!addre) {
            return res.status(404).json({ message: 'Data not found' });
        }
        return res.status(200).json(addre);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.editAdress = async(req,res)=>{ 
    
    try{
    const {_id ,receiverName, receiverPhone, pincode, city, state, country ,address,apartment,landmark,alternativeNumber} = req.body;
    const addre = await Address.findOne({ _id: _id});
    if(!addre){
        return res.status(404).json({ message: 'Adress not found' });
    }
    else{
        await Address.updateOne({ _id: id }, { receiverName, receiverPhone, pincode, city, state, country ,address,apartment,landmark,alternativeNumber});
        return res.status(200).json({ message: 'Address Edit successfully' });
    }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
}

exports.getYourOrders = async(req,res)=>{
    try {
        const getAllOrder = await SuppliOrder.find({ userId: req.user._id })
            .populate('addressId') // Populate address details
            .populate('productId'); // Populate product details
        // console.log(getAllOrder);
        if (!getAllOrder || getAllOrder.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        return res.status(200).json(getAllOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.orderCancel = async(req,res)=>{
    const { id } = req.params;
    // console.log(id);
    try {
        const order = await SuppliOrder.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { status: 'cancel' }, // Update the status field
            { new: true } // Return the updated document
        );
        if (order) {
            // Increase the quantity back in the inventory table
            await Inventory.findOneAndUpdate(
            { productId: order.productId },
            { $inc: { qty: order.quantity } }, // Increment the quantity
            { new: true }
            );
        }
        if (!order) {
            return res.status(404).json({ message: 'Order not found or not authorized to update' });
        }
        return res.status(200).json({ message: 'Order Cancel successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.orderReturn = async(req,res)=>{
    const { id } = req.params;
    // console.log(id);
    try {
        const order = await SuppliOrder.findOneAndUpdate(
            
            { _id: id, userId: req.user._id },
            { status: 'return' }, // Update the status field
            { new: true } // Return the updated document
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found or not authorized to update' });
        }
        return res.status(200).json({ message: 'Order Return successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

