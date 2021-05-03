const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const saucesCtrl = require ('../controllers/sauces');
const multer = require("../middleware/multer-config")

router.post('/sauces',multer,saucesCtrl.postSauce);
router.get('/sauces', saucesCtrl.getSauces);
router.get('/sauces/:id', saucesCtrl.getOneSauce);


module.exports = router;