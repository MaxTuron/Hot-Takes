//Logique routing
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce')
//Création d'une sauce - Multer pour la gestion des images
router.post('/',auth, multer, sauceCtrl.createSauce);

//Récupéération de toutes les sauces
router.get('/', auth,  sauceCtrl.getAllSauces);

//Récupération d'une sauce
router.get('/:id',auth, sauceCtrl.getOneSauce);

//Modification d'une sauce - Multer pour la gestion des images
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

//Suppression d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Like/Dislike des sauces
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;