const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = process.env.PORT || 3000


// Création d'un middlewaire pour logger l'url / ici le module morgan permet de le faire
// Nous pouvons chainer les middleware
app
.use(favicon(__dirname + '/favicon.ico'))
// Nous permet de parser toutes nos chaines en json
.use(bodyParser.json())

sequelize.initDb()

 app.get('/', (req, res) => {
    res.json('Hello Heroku 👋')
 })
 
// Ici nous placerons nos futurs points de terminaison
// (app) à la fin est un raccourscis de syntaxe
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})


app.listen(port, () => console.log(`Notre application est démarrée sur le port : http://localhost:${port}`))