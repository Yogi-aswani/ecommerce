const Product = require('../Model/ProductSchema');
const Productimages   = require('../Model/Productimages')
const Wishlist = require('../Model/WishlistSchema');
const User = require('../Model/UserSchema');
const Cart = require('../Model/CartSchema'); 

const mongoose = require('mongoose');

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
          ]);
        // const products = await Productimages.find().populate('productId');
        console.log(products);
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
        const newCart = new Cart({
            userId: req.user._id,
            productId: productId,
            quantity: 1,
        });
        await newCart.save();
        return res.status(200).json({ message: 'Added to Cart' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getAllCart = async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.user._id }).populate('productId');
        console.log(cart);
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAllWishlist = async (req, res) => {
    try {
        const Wish = await Wishlist.find({ userId: req.user._id }).populate('productId');
        console.log(Wish);
        return res.status(200).json(Wish);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


