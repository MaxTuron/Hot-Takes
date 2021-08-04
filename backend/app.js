const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//Import des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//Connexion à la base de données
mongoose.connect('mongodb+srv://Max:3174uwk02h@cluster0.qtlwm.mongodb.net/testAPI?retryWrites=true&w=majority',
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

//Définition du dossier ou les images seront intégrer
app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;