// Import du model pokemon
const { Pokemon } = require('../db/sequelize')

// Export fn avec le paramètre de l'application entière
// permet de définir les routes plus simplement
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if (req.query.name) {
      // query indique a express que l'on souhaite extraire le param name de l'url, à l'aide de req
      const name = req.query.name
      return Pokemon.findAll( { where: { name: name } })
      .then(pokemons => {
        const message = `Il y a ${pokemons.length} pokemons qui correspondent au terme de la recherche ${name}`
        res.json({ message, data: pokemons })
      })
    }else {
      Pokemon.findAll()
      .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = `La liste des pokémons n'a pas pu être récupérée. Réesayez dans quelques instants.`
          res.status(500).json({ message, data: error})
        })
    }
  })
}