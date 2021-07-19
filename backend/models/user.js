const mongoose = require('mongoose');

const userSchema = mongoose.Schema({    // Création d'un schéma de données pour les utilisateurs
    email: { type: String, required: true},
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);