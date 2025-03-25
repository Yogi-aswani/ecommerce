const express = require('express');
const authController = require('./../Controller/authController');
const authuser = require("../Middleware/auth")
const supplireController = require('../Controller/supplierController');

const router = express.Router();



router.post('/addProduct', authuser,supplireController.addProduct);
router.get('/getAllProduct', authuser,supplireController.getProducts);
router.get('/productView/:id', authuser,supplireController.productView);;

module.exports = router;