const User = require('../models/user');  // Import du modele de donnée

exports.signup = (req, res, next) => {
    delete req.body._id;
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });
    console.log(user);
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) // Requête traitée avec succès et création d’un document
        .catch(error => res.status(400).json({ error })); // Bad Request
};

