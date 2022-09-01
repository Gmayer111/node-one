// Import du model pokemon
const { Pokemon } = require('../db/sequelize')

// Export fn avec le paramètre de l'application entière
// permet de définir les routes plus simplement
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
      const message = `La liste des pokémons n'a pas pu être récupérée. Réesayez dans quelques instants.`
      res.status(500).json({ message, data: error})
  })
  })
}