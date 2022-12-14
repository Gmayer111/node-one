const { Pokemon } = require('../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../auth/auth')

  
module.exports = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      // return permet de transmettre l'erreur éventuelles de la méthode findByPk 
      // directement dans le bloc catch situé plus bas
      return Pokemon.findByPk(id).then(pokemon => {
        if (pokemon == null) {
          // Si le client souhaite modifier un pokément dont l'id n'existe pas en bdd
          const message = `Le pokémon demandé n'existe pas. Réessayez avec une autre identifiant.`
          return res.statut(404).json({message})
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
      // Cette érreur retourne des érreurs de validation / faute du client
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = `Le pokémon n'a pas pu être récupéré. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error})
    })
  })
} 

