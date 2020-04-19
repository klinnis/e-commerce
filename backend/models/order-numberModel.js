const mongoose = require('mongoose');



const ordernumberSchema = new mongoose.Schema({

number: {
	type: Number,
	default: 0
}

});



const OrderNumber = mongoose.model('OrderNumber', ordernumberSchema);

module.exports = OrderNumber;