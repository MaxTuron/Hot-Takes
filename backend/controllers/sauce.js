const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        mainPepper: req.body.mainPepper,
        heat: req.body.heat,
    });
    console.log(sauce)
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

