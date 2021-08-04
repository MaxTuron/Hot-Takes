//Logique métier
const Sauce = require('../models/sauce');
const fs = require('fs'); // importation du package file system de node, qui donne notamment accès aux fonctions permettant de supprimer les fichiers.

//Création d'une sauce
exports.createSauce = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;

    //est-ce que ma sauce existe ? (findOne) Si oui -> redirect vers edit Sauce / si non -> on continue
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

// Fonction OK
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? // Si req.file existe
        {
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // On traite la nouvelle image
        } : { ...req.body };  // Sinon on traite l'objet entrant (sans image)
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // Mise à jour de la sauce avec l'id passé en premier argument
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'})) // Requête traitée avec succès
        .catch(error => res.status(400).json({ error })); //Bad Request
};


// Fonction OK
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) //On récupère la sauce grâce à son id
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]; //On utilise le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier
            fs.unlink(`images/${filename}`, () => { // On utilise la fonction unlink du package fs pour supprimer ce fichier
                Sauce.deleteOne({ _id: req.params.id }) // callback : Suppression de la sauce avec l'id correspondant
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'})) // Requête traitée avec succès
                    .catch(error => res.status(400).json({ error })); // Bad request
            });
        })
        .catch(error => res.status(500).json({ error })); // Internal Server Error
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
                                res.status(200).json({ message: "Stop Like !" });
                            })
                            .catch(error => res.status(400).json({ error }));
                    } else if (sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } })
                            .then(() => {
                                res.status(200).json({ message: "Stop Dislike !" });
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