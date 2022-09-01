// Ce fichier à pour but de conserver des point de terminaison en statique

// Affiche le nombre total de pokémon
// app.get('/api/pokemons', (req, res) => {
//     const message = 'La liste des pokémons a bien été trouvée.'
//     res.json(success(message, pokemons))
// })

// // Get est la méthode la requête => / le path => fn pour fournir une réponse au client
// // C'est un endpoint
// app.get('/', (req, res) => res.send('Hello, Express 3 👍'))

// app.get('/api/pokemons/:id', (req, res) => {
//     // Express convertit l'id en string
//     // Nous paramétrons l'id en int
//     const id = parseInt(req.params.id) 
//     const pokemon = pokemons.find(pokemon => pokemon.id === id)
//     const message = 'Un pokémon a bien été trouvé.'
//     res.json(success(message, pokemon))
// })

// app.post('/api/pokemons', (req, res) => {
//     const id = getUniqueId(pokemons)
//     const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
//     pokemons.push(pokemonCreated)
//     const message = `Le pokemon ${pokemonCreated.name} a bien été créé`
//     res.json(success(message, pokemonCreated))
// })

// // Put permet de modifier un pokémon
// app.put('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemonUpdated = { ...req.body, id: id}
//     pokemons = pokemons.map(pokemon => {
//         return pokemon.id === id ? pokemonUpdated : pokemon
//     })
//     const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié`
//     res.json(success(message, pokemonUpdated))
// })

// app.delete('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
//     pokemons.filter(pokemon => pokemon.id !== id)
//     const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé`
//     res.json(success(message, pokemonDeleted))
// })