//Import du framework express'
const express = require('express');
const mongoose = require('mongoose');
//Import de dotenv pour sécuriser les mots de passes
require('dotenv').config()
//Sécurisation de la BDD via dotenv
const mongodb = process.env.MONGODB;
const fs = require('fs');
const filesDir = 'images';
const path = require('path');

//Import des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//Connexion à la base de données
mongoose.connect(mongodb,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//Header - Gestion du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //accède à l'api depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajoute les headers aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoie les requêtes avec les méthodes mentionnées
    next();
});

//body parser
app.use(express.json());


//Permet de créer le dossier images si il n'existe pas
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

//Définition du dossier ou les images seront intégrer
app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;