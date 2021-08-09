const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //Extraction du token
        const token = req.headers.authorization.split(' ')[1];
        //Décodage du token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //Extraction de l'ID utilisateur
        const userId = decodedToken.userId;
        //Comparaison des ID utilisateurs
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requête non athentifiée !')
        });
    }
};