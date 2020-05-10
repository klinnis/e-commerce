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
    let updated_temp = [];

    temp = req.body;
    	

	 temp.forEach(function (arrayItem) {
     
     const newOrder = Order.create({
     	brand: arrayItem.parsedshoe.brand,
     	barcode: arrayItem.parsedshoe.barcode,
     	color: arrayItem.color,
     	size: arrayItem.size,
     	price: arrayItem.parsedshoe.cart_price,
        quantity: arrayItem.parsedshoe.cart_quantity,
     	category: arrayItem.parsedshoe.category,
     	images: arrayItem.parsedshoe.images,
     	ordernumber: ordercode,
     	total: arrayItem.total
     	  
     });

     updateShoes(arrayItem.parsedshoe.barcode, arrayItem.parsedshoe.cart_quantity);
    
});
	let update = {number: ordercode};
	let updated = await OrderNumber.findOneAndUpdate({}, update);
    async function updateShoes(barcode, quantity) {

        const filter = { barcode: barcode };
        const update = { $inc: { quantity: -quantity } };
        let doc = await Shoe.findOneAndUpdate(filter, update, {
        returnOriginal: false
         });
     }

    res.status(201).json({codeNum: ordercode});



	});


   
	

	
	
