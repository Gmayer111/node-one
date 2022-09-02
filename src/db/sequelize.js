// Ici on utilise l'afféctation déstructuré {} / Nous n'avons pas appeler la méthode helper
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')


const sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: { timezone: 'Etc/GMT-2'},
    logging: true
})

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    // Synchronisation de la bdd
    return sequelize.sync({force: true}).then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                // Join concatène le tableau en chaine en bdd
                types: pokemon.types
                // .then correspond à une promesse car requête asynchrone
                // toJSON permet de débugger les données envoyées
        }).then(pokemon => console.log(pokemon.toJSON()))
    })

    // 2 prams le mdp et un nombre entier qui correspond au saltrules soit el temps nécessaire pour hasher un mdp
    // compare est un traitment asynch, c'est donc une promesse
    bcrypt.hash('Pikachu', 10)
    .then(hash => User.create({username: 'Pikachu', password: hash}))
    .then(user => console.log(user.toJSON()))
    
        console.log('La base de données a bien été initialisée !');
    })
}

module.exports = {
    initDb, Pokemon, User
}




