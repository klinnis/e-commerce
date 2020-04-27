const express = require('express');
const multer = require('multer');
const adminController = require('../controllers/adminController');



const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'backend/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage
});



const router = express.Router();


router.post('/create-shoe', adminController.createShoe);
router.post('/save-images', upload.array('file'), adminController.saveImages);
router.get('/get-orders', adminController.getOrders);


module.exports = router;