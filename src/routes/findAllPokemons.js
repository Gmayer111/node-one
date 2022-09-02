// Import du model pokemon
const { Pokemon } = require('../db/sequelize')
// Op est l'opérateur de seuqelize, eq pour equal, like ...
const { Op } = require('sequelize')
const auth = require('../auth/auth')

// Export fn avec le paramètre de l'application entière
// permet de définir les routes plus simplement
module.exports = (app) => {
  // Express permet de passer en 2ème argument l'auth
  // Peut s'appliquer aux autres méthodes
  app.get('/api/pokemons', auth, (req, res) => {
    if (req.query.name) {
      // query indique a express que l'on souhaite extraire le param name de l'url, à l'aide de req
      const name = req.query.name
      // retourne soit le nombre indiquer dans l'url soit la valeur par défaut 5
      // ne pas oublier que les param en url sont des string
      const limit = parseInt(req.query.limit) || 5

      if (name.length < 2) {
        const message = `Vous devez indiquer au moins 2 caractères.`
        return res.status(400).json({ message })      
      }

      return Pokemon.findAndCountAll({
        where: {
          // crochet car tous les opérateurs s'exécutent comme cela
          name: {// Name correspond à la propriété du model
            // % pour indiquer ou effectuer la recherche
            [Op.like]: `%${name}%` // 'name' est le critère dela recherche
          }        
        },
        order: ['name'],
        // limite les réultats à 5
        limit: limit
      })
      // count et rows correspond au résultats sous formes de variables
      .then(({count, rows}) => {
        const message = `Il y a ${count} pokemons qui correspondent au terme de la recherche ${name}`
        res.json({ message, data: rows })
      })
    }else {
      Pokemon.findAll({ order: ['name'] })
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