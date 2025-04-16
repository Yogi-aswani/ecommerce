const express = require('express');
const userController = require('../Controller/userController');
const auth = require('../Middleware/auth');

const router = express.Router();
router.get('/ViewAllProduct', userController.ViewAllProduct);
router.get('/getSingleProduct/:id', userController.getSingleProduct);
router.post('/addWishlist', auth,userController.addWishlist);
router.post('/addTocart', auth,userController.addTocart);
router.get('/getAllCart', auth,userController.getAllCart);
router.get('/getYourOrders', auth,userController.getYourOrders);
router.get('/getAllWishlist', auth,userController.getAllWishlist);
router.post('/addressAdd', auth,userController.addressAdd);
router.post('/editAdress', auth,userController.editAdress);
router.get('/getAddress', auth,userController.getAddress);
router.get('/getAddress', auth,userController.getAddress);
router.get('/getSingleAdress/:id', auth,userController.getSingleAdress);
router.get('/addressdelete/:id', auth,userController.addressdelete);
router.get('/cartDelete/:id', auth,userController.cartDelete);
router.get('/wishListDelete/:id', auth,userController.wishListDelete);
router.get('/plusQuantity/:id', auth,userController.plusQuantity);
router.get('/MinusQuantity/:id', auth,userController.MinusQuantity);
router.get('/orderCancel/:id', auth,userController.orderCancel);
router.get('/orderReturn/:id', auth,userController.orderReturn);
router.post('/PlaceOrder', auth,userController.PlaceOrder);


module.exports = router;