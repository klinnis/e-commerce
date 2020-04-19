const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({

brand: {
	type: String
},


barcode: {
	type: String
},

color: {
	type: String
},


size: {
	type: String
},

price: {
	type: Number
},


category: {
	type: String
},


images: [
{type: String}
],

ordernumber: {
	type: Number
},

total: {
	type: Number
}


});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;