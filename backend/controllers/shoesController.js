const Shoe = require('../models/shoeModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');



exports.menShoes = catchAsync(async (req, res, next) => {

	const shoes = await Shoe.find({});

	res.status(200).json({
		shoes: shoes
	});

	
   
    


	
	
});