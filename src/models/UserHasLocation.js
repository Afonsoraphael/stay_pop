module.exports = (Sequelize, dataTypes) => {
  const UserHasLocation = Sequelize.define('UserHasLocation',{
    locationId: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
      foreignKey: true,
      field: 'location_id',
    },
    userId: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
      foreignKey: true,
      field: 'user_id',
    }
  }, {
    tableName: 'user_has_locations',
    timestamps: false,
  })

  UserHasLocation.removeAttribute('id');

  return UserHasLocation;
} 