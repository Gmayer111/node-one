const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000


// Création d'un middlewaire pour logger l'url / ici le module morgan permet de le faire
// Nous pouvons chainer les middleware
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    // Nous permet de parser toutes nos chaines en json
    .use(bodyParser.json())

 sequelize.initDb()
 
// Ici nous placerons nos futurs points de terminaison
// (app) à la fin est un raccourscis de syntaxe
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

// On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})


app.listen(port, () => console.log(`Notre application est démarrée sur le port : http://localhost:${port}`))