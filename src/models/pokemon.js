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
            allowNull: false
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            }
        }                             
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}