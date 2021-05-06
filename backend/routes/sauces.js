const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const saucesCtrl = require ('../controllers/sauces');
const multer = require("../middleware/multer-config")

router.post('/sauces',auth,multer,saucesCtrl.postSauce);
router.get('/sauces', saucesCtrl.getSauces);
router.get('/sauces/:id', saucesCtrl.getOneSauce);
router.put('/sauces/:id',auth,multer, saucesCtrl.changeSauce);
router.delete('/sauces/:id',auth, saucesCtrl.deleteSauce);
router.post('/sauces/:id/like', saucesCtrl.likedSauce);



module.exports = router;