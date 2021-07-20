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


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })   // On utilise le modèle mongoose User pour vérifier que l'email rentré correspond à un email de la bas de données
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // Unauthorized
            }
                    res.status(200).json({ // Requête traitée avec succès
                        userId: user._id,     // On renvoie l'id
                    });
        })
};
