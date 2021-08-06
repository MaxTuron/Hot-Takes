const mongoose = require('mongoose');

// Création d'un schéma de données pour les sauces
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    //Deflaut 0 pour éviter que lors de la 1ere utilisation NaN soit afficher
    likes: { type: Number,  default: 0 },
    //Deflaut 0 pour éviter que lors de la 1ere utilisation NaN soit afficher
    dislikes: { type: Number,  default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

module.exports = mongoose.model('Sauce', sauceSchema); // on exporte le schéma de données