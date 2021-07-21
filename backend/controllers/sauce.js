const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject)
    const sauce = new Sauce({
        ...sauceObject,
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};


exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauce) => {
            res.status(200).json(sauce);})
        .catch((error) => {res.status(400).json({error: error});
        }
    );
};

