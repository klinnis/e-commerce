const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({

name: {
	type: String,
	required: [true, 'Please enter your name']
},

email: {
	type: String,
	required: [true, 'Please give your email'],
	unique: true,
	lowercase: true,
	validate: [validator.isEmail, 'Please provide a valid email']
},

photo: {
	type: String,
	default: 'default.png'
},

role: {
	type: String,
	enum: ['user', 'admin'],
	default: 'user'
},

password: {
	type: String,
	required: [true, 'Please provide your Password'],
	minlenght: 8,
	select: false
},

passwordConfirm: {
	type: String,
	required: [true, 'Please confirm your password'],
	
},

passwordChangeAt: Date,
passwordResetToken: String,
passwordResetExpires: Date,
active: {
	type: Boolean,
	default: true,
	select: false
}
});


//For saving user in Database
// Run this function before save the user to encrypt password
userSchema.pre('save', async function save(next) {

	// Execute the function only when the password is not modified
  if (!this.isModified('password')) return next();
  try {
  
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
    return next();
  } catch (err) {
    return next(err);
  }
});


// Compare the password the user sends to login with the actual password
userSchema.methods.correctPassword = async function(
  incomingPassword,
  realPassword
) {
  return await bcrypt.compare(incomingPassword, realPassword);
};


const User = mongoose.model('User', userSchema);

module.exports = User;