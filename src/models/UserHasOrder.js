module.exports = (Sequelize, dataTypes) => {
  const UserHasOrder = Sequelize.define('UserHasOrder', {
    orderNumber: {
      type: dataTypes.STRING(700),
      allowNull: false,
      field: 'order_number',
    },
    userId: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
      foreignKey: true,
      field: 'user_id',
    },
    totalPrice: {
      type: dataTypes.FLOAT(10,2),
      allowNull: false,
      field: 'total_price',
    },
    totalProduct: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
      field: 'total_product',
    },
    locationId: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
      foreignKey: true,
      field: 'location_id',
    },
    estimateDate: {
      type: dataTypes.DATE,
      allowNull: false,
      field: 'estimate_date',
    }
  },
  {
    tableName: 'user_has_order',
    timestamps: false,
  })

  UserHasOrder.associate = (models) => {
    UserHasOrder.belongsTo(models.Location, {
      foreignKey: 'locationId',
      as: 'location'
    })
  }

  UserHasOrder.removeAttribute('id')

  return UserHasOrder
}