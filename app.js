const express = require('express')
// Ici on utilise l'afféctation déstructuré {} / Nous n'avons pas appeler la méthode helper
const { success, getUniqueId } = require('./helper')
const { Sequelize } = require('sequelize')
const bodyParser = require('body-parser')
let pokemons = require('./mock-pokemon')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const app = express()
const port = 3000



const sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })

sequelize.authenticate()
    .then(_ => console.log('La connexion à la base de données a bien été établie'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

// Création d'un middlewaire pour logger l'url / ici le module morgan permet de le faire
// Nous pouvons chainer les middleware
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    // Nous permet de parser toutes nos chaines en json
    .use(bodyParser.json())




// Affiche le nombre total de pokémon
app.get('/api/pokemons', (req, res) => {
    const message = 'La liste des pokémons a bien été trouvée.'
    res.json(success(message, pokemons))
})

// Get est la méthode la requête => / le path => fn pour fournir une réponse au client
// C'est un endpoint
app.get('/', (req, res) => res.send('Hello, Express 3 👍'))

app.get('/api/pokemons/:id', (req, res) => {
    // Express convertit l'id en string
    // Nous paramétrons l'id en int
    const id = parseInt(req.params.id) 
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon))
})

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé`
    res.json(success(message, pokemonCreated))
})

// Put permet de modifier un pokémon
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié`
    res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé`
    res.json(success(message, pokemonDeleted))
})

app.listen(port, () => console.log(`Notre application est démarrée sur le port : http://localhost:${port}`))