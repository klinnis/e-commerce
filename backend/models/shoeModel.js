const mongoose = require('mongoose');



const shoeSchema = new mongoose.Schema({

brand: {
	type: String
},

barcode: {
	type: String
},

colors: [
{type: String}
],

sizes: [
{type: String}
],

price: {
	type: Number
},

quantity: {
	type: Number
},

category: {
	type: String
},

description: {
	type: String
},

images: [
{type: String}
],

cart_quantity : {
	type: String
},

cart_price : {
	type: Number,
	default: 0
}


});


const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;