//Logique métier
const Sauce = require('../models/sauce');
const fs = require('fs');

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
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
}

// Fonction OK
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
};


// Fonction OK
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Gestion des likes
exports.likeSauce = (req, res, next) => {

    const userId = req.body.userId;
    const like = req.body.like;

    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            switch (like) {
                case 1:
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: userId } })
                        .then(() => {
                            res.status(200).json({ message: "Like !" });
                        })
                        .catch(error => res.status(400).json({ error }));
                    break;
                case 0:
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: userId } })
                            .then(() => {
                                res.status(200).json({ message: "Like retiré !" });
                            })
                            .catch(error => res.status(400).json({ error }));
                    } else if (sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } })
                            .then(() => {
                                res.status(200).json({ message: "Dislike retiré !" });
                            })
                            .catch(error => res.status(400).json({ error }));
                    }
                    break;
                case -1:
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: userId } })
                        .then(() => {
                            res.status(200).json({ message: "Dislike !" });
                        })
                        .catch(error => res.status(400).json({ error }));
                    break;
                default:
                    console.log("error");
            }
        })
        .catch(error => {
            res.status(404).json({ error });
        });
};