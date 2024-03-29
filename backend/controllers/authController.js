const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');




//const signToken = id => {
//	return jwt.sign({id}, process.env.JWT_SECRET, {
	//	expiresIn: 3000
	//});
//};


const createSendToken = (user, statusCode, req, res) => {
	const token = jwt.sign({email: user.email, userId: user._id}, 'secret-long', {expiresIn: '1h'});

//res.cookie('jwt', token, {
//	expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
//	httpOnly: true,
//	secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
//});

user.password = undefined;

res.status(statusCode).json({
	status: 'success',
	token: token,
	user: user,
	expiresIn: 3600
});

};

exports.signup = catchAsync(async (req, res, next) => {

	if(req.body.password!=req.body.passwordConfirm) {
		res.status(404).json({status: 'failure', status: false });
	}

     
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		photo: req.body.photo	
	});

	


	
	createSendToken(newUser, 201, req, res);
});


exports.login = catchAsync(async (req, res, next) => {
  
  const email = req.body.email;
  const password = req.body.password;

  // 1) Check if email and password exist
  if (!email || !password) {
    res.status(400).json({message: 'Incorrect email or password'});
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
     res.status(400).json({message: 'Incorrect email or password'});
  }

  

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});




exports.checkEmail = catchAsync(async (req, res, next) => {



	const { email } = req.body;
	console.log(email);
	const user = await User.findOne({ email });
	if(user) {
        return res.json({message: 'Email already exists'});
	}
	else {
		return res.json({message: ''});
}
});

exports.protect = catchAsync(async (req, res, next) => {

	if(req.headers.authorization === 'Bearer null'){
		res.status(401).json({message: 'Unauthorized1'});
	}
     
     let splitted = req.headers.authorization.split(" ");
     let token = splitted[1];

     var decoded = jwt.verify(token, 'secret-long');
     const exp = decoded.exp;
     const exp_date =  new Date(exp*1000);
     const token_expires = exp_date.toLocaleString();
     const tok = new Date(token_expires);
     const now = new Date().toLocaleString();
     const now1 = new Date(now);
     
       
       if(tok.getTime() < now1.getTime()) {
        
       	res.status(401).json({message: 'Unauthorized2'});
       } else {
         const user  = User.findOne({_id: decoded.userId});
          if(!user) {
       	  res.status(401).json({message: 'Unauthorized3'});
       }
          next();
       }
       
      
       
});



exports.protectAdmin = catchAsync(async (req, res, next) => {
     
	if(req.headers.authorization === 'Bearer null'){
		res.status(401).json({message: 'Unauthorized'});
	}
     
     let splitted = req.headers.authorization.split(" ");
     let token = splitted[1];

     var decoded = jwt.verify(token, 'secret-long');
     const exp = decoded.exp;
     const exp_date =  new Date(exp*1000);
      const token_expires = exp_date.toLocaleString();
     const tok = new Date(token_expires);
     const now = new Date().toLocaleString();
     const now1 = new Date(now);

       if(tok < now) {
       	res.status(401).json({message: 'Unauthorized'});
       } else {
         const user  = User.findOne({_id: decoded.userId, role: 'admin'});
          if(!user) {
       	  res.status(401).json({message: 'Unauthorized'});
       }
          next();
       }
});

