const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Shoe = require('../models/shoeModel');
const express = require('express');





exports.createShoe = catchAsync(async  (req, res, next) => {

	// const url = req.protocol + '://' + req.get('host');
   
	const newShoe = await Shoe.create({
		
		brand: req.body.brand,
		barcode: req.body.barcode,
		price: req.body.price,
		quantity: req.body.quantity,
		category: req.body.category,
		description: req.body.description,
		colors: req.body.colors,
		sizes: req.body.sizes,
		images: req.body.filenames,	
	});


	
	
});


exports.saveImages = catchAsync(async (req, res, next) => {


	
res.status(201).json({message: 'Upload successful!!'});

	
});