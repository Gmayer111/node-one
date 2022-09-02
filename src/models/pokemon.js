const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    // Define permet de déclarer un nouveau model auprès de sequelize
    // Datatype permet de définir les types de données de chaque propriétés des modèles
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: `Le nom est déjà pris.`
            },
            validate: {
                len: {
                  args: [1, 25],
                  msg: 'Le nom doit contenir entre 1 et 25 caractères.'
                },
                notEmpty: { msg: 'Le nom ne peut pas être vide.' },
                notNull: { msg: 'Le nom est une propriété requise.'}
              }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour les point de vie.`},
                min: {
                    args: [0],
                    msg: `Vous devez au minimum indiquer un nombre pour les points de vie.`
                },
                max: {
                    args: [999],
                    msg: `Les points de vie doivent êtres infèrieurs ou égales 999.`
                },
                notNull: { msg: `Les points de vie sont une proprité requise.`}
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: `Utilisez uniquement des nombres entiers pour les point de dégat.`},
                min: {
                    args: [0],
                    msg: `Vous devez au minimum indiquer un nombre pour les points de dégat.`
                },
                max: {
                    args: [99],
                    msg: `Les points de dégat doivent êtres infèrieurs ou égales 999.`
                },
                notNull: { msg: `Les points de dégat sont une proprité requise.`}
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: `Utilisez uniquement une URL valide pour l'images.`},
                notNull: { msg: `L'image sont une proprité requise.`}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            // Validateur personnalisé
            validate: {
                // Value correspond à la propriété types en bdd
                // ici par exemple plante, poison sous la forme d'une chaîne de caractère et non un tableau
                isTypesValid(value) {
                    if (!value) {
                        throw new Error(`Un pokémon doit au moins avoir un type.`)
                    }
                    if (value.split(',').length > 3) {
                        throw new Error(`Un pokémon ne doit pas avoir plus de 3 types.`)
                    }
                    value.split(',').forEach(type => {
                        if (!validTypes.includes(type)) {
                            throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
                        }
                    })
                }
            }
        }                             
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}