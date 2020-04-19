const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Order = require('../models/orderModel');
const OrderNumber = require('../models/order-numberModel');
const Shoe = require('../models/shoeModel');
const express = require('express');





exports.createOrder = catchAsync(async  (req, res, next) => {

	// const url = req.protocol + '://' + req.get('host');

    const code = await OrderNumber.findOne({});
    let ordercode = code.number + 1;
    let temp = [];

    temp = req.body;
    let kwdikoi = [];
   
	

	 temp.forEach(function (arrayItem) {
     
     const newOrder = Order.create({
     	brand: arrayItem.shoeObj.brand,
     	barcode: arrayItem.shoeObj.barcode,
     	color: arrayItem.color,
     	size: arrayItem.size,
     	price: arrayItem.shoeObj.price,
     	category: arrayItem.shoeObj.category,
     	images: arrayItem.shoeObj.images,
     	ordernumber: ordercode,
     	total: arrayItem.total
     	  
     });

     

     let newQuant = arrayItem.shoeObj.cart_quantity;
     let newQuant1 = parseInt(newQuant);

     let barcodeNew = arrayItem.shoeObj.barcode;

	Shoe.findOne({barcode: barcodeNew})
	.then(res => Shoe.findOneAndUpdate({}, { $inc: { quantity: -newQuant1} }));

    
});
	let update = {number: ordercode};
	let updated = await OrderNumber.findOneAndUpdate({}, update);



	});


   
	

	
	
