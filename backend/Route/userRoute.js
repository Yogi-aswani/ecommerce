const express = require('express');
const userController = require('../Controller/userController');
const auth = require('../Middleware/auth');

const router = express.Router();
router.get('/ViewAllProduct', userController.ViewAllProduct);
router.get('/getSingleProduct/:id', userController.getSingleProduct);
router.post('/addWishlist', auth,userController.addWishlist);
router.post('/addTocart', auth,userController.addTocart);
router.get('/getAllCart', auth,userController.getAllCart);
router.get('/getAllWishlist', auth,userController.getAllWishlist);


module.exports = router;