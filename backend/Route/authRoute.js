const express = require('express');
const authController = require('./../Controller/authController');
const authuser = require("../Middleware/auth")

const router = express.Router();



router.post('/usersignup', authController.usersignup);
router.post('/login', authController.login);

router.post('/getotp', authController.getOTP);

router.post('/forgetPassword', authController.forgatePassword);

router.post('/resetPassword', authuser,authController.resetPassword);
// router.post('/suppliresignup', authController.suppliresignup);
module.exports = router;