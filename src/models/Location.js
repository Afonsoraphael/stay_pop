module.exports = (Sequelize, dataTypes) => {
  const Location = Sequelize.define('Location', {
    id: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    addressLine: {
      type: dataTypes.STRING(250),
      allowNull: false,
      field: 'address_line',
    },
    postalCode: {
      type: dataTypes.STRING(50),
      allowNull: false,
      field: 'postal_code',
    },
    number: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    state: {
      type: dataTypes.STRING(250),
      allowNull: false,
    },
    country: {
      type: dataTypes.STRING(250),
      allowNull: false,
    },
  }, {
    tableName: 'locations',
    timestamps: false,
  })

  Location.associate = (models) => {
    Location.belongsToMany(models.User, {
        through: models.UserHasLocation,
        foreignKey: 'locationId',
        otherKey: 'userId',
        as: 'users'
    })
}

  return Location
}