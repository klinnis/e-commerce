const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const shoesController = require('../controllers/shoesController');

const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/checkEmail', authController.checkEmail);
router.get('/men-shoes', shoesController.menShoes);



module.exports = router;