const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({

brand: {
	type: String,
	required: [true, 'Brand is missing'],
},


barcode: {
	type: String,
	required: [true, 'Barcode is missing'],
},

color: {
	type: String,
	required: [true, 'Color is missing'],
},


size: {
	type: String,
	required: [true, 'Size is missing'],
},

price: {
	type: Number,
	required: [true, 'Price is missing'],
},


category: {
	type: String,
	required: [true, 'Category is missing'],
},


images: [
{type: String,
required: [true, 'Images are missing'],
},

],

ordernumber: {
	type: Number,
	default: 0
},

total: {
	type: Number,
	required: [true, 'Total is missing'],
},

quantity: {
	type: Number
}


});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;