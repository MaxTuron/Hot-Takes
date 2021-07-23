//Logique métier
const Sauce = require('../models/sauce');

//Création d'une sauce
exports.createSauce = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(sauce);
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({error}));
}

//Fonction OK
exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauce) => {
            res.status(200).json(sauce);})
        .catch((error) => {res.status(400).json({error: error});
        }
    );
};

// Fonction OK
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({                 // Renvoir le Thing unique ayant le même _id que le paramètre de la requêt
        _id: req.params.id      // On récupère l'id de la sauce
    })
        .then(sauce => res.status(200).json(sauce))   // Sauce retournée dans une promise et envoyée au frontend
        .catch(error => res.status(404).json({error}));
}