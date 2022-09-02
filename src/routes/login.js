const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privatKey = require('../auth/private_key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } }).then(user => {
        
      if (!user) {
        const message = `L'utilisateur demandé n'existe pas.`
        return res.status(404).json({ message })
      }  
      // Compare le mdt saisi par user avec le mdp en bdd  
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorrect.`;
          return res.status(401).json({ message })
        }

        // JWT
        // sign à besoin de 3 params, ensuite on peut récupérer le jeton dans la contante token
        const token = jwt.sign(
            { userId: user.id },
            privatKey,
            { expiresIn: '24h'}
        )

        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token })
      })
    })
    .catch(error => {
        const message = `L'utilisateur n'a pas pu petre connecté. Réessayé dans quelques instants.`;
        return res.json({ message, data: error })
    })
  })
}