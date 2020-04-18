const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Order = require('../models/orderModel');
const express = require('express');





exports.createOrder = catchAsync(async  (req, res, next) => {

	// const url = req.protocol + '://' + req.get('host');
   
	res.status(200).json({order: req.body});

	
	
});