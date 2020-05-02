const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const shoesController = require('../controllers/shoesController');
const orderController = require('../controllers/orderController');

const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/checkEmail', authController.checkEmail);
router.use(authController.protect);
router.get('/men-shoes', shoesController.menShoes);
router.get('/women-shoes', shoesController.womenShoes);
router.get('/kids-shoes', shoesController.kidsShoes);
router.post('/order', orderController.createOrder);




module.exports = router;