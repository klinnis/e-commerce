const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');



const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express();


app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());



// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);


module.exports = app;