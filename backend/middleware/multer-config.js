const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
//Création de la constante storage contenant les informations de stockages
const storage = multer.diskStorage({
    //Définition du dossier de destination
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    //Indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier.
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

//Export de multer avec la constante configurée
module.exports = multer({storage: storage}).single('image');