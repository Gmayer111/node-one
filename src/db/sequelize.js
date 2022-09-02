// Ici on utilise l'afféctation déstructuré {} / Nous n'avons pas appeler la méthode helper
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')


const sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: { timezone: 'Etc/GMT-2'},
    logging: false
})

const Pokemon = PokemonModel(sequelize, DataTypes)

const initDb = () => {
    // Synchronisation de la bdd
    return sequelize.sync().then(_ => {
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
        })
        .then(pokemon => console.log(pokemon.toJSON()))
    })
        console.log('La base de données a bien été initialisée !');
    })
}

module.exports = {
    initDb, Pokemon
}




