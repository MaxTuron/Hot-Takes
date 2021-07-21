const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name: {type: String},
    manufacturer: {type: String},
    description: {type: String},
    mainPepper: {type: String},
    imageUrl: {type: String},
    heat: {type: Number},
});

module.exports = mongoose.model('Sauce', sauceSchema); // on exporte le schéma de données