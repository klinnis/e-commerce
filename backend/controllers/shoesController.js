const Shoe = require('../models/shoeModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');



exports.menShoes = catchAsync(async (req, res, next) => {


	const shoes = await Shoe.find({category: 'MEN'});

	res.status(200).json({
		shoes: shoes
	});

	
});

exports.womenShoes = catchAsync(async (req, res, next) => {

	const shoes = await Shoe.find({category: 'WOMEN'});

	res.status(200).json({
		shoes: shoes
	});
	
});

exports.kidsShoes = catchAsync(async (req, res, next) => {

	const shoes = await Shoe.find({category: 'KIDS'});

	res.status(200).json({
		shoes: shoes
	});
	
});