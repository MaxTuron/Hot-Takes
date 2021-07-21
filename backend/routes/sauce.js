const express = require('express');
const router = express.Router();


const sauceCtrl = require('../controllers/sauce');

router.get('/',sauceCtrl.getAllSauces);
router.post('/',sauceCtrl.createSauce);

module.exports = router;