module.exports = (sequelize, dataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
        type: dataTypes.INTEGER(10),
        allowNull: false,
        foreignKey: true,
        field: 'user_id'
    },
    productId: {
        type: dataTypes.INTEGER(10),
        allowNull: false,
        foreignKey: true,
        field: 'product_id'
    },
    orderNumber: {
        type: dataTypes.STRING(700),
        allowNull: false,
        primaryKey: true,
        field: 'order_number'
    }
  }, {tableName: 'orders', timestamps: false })

  // Order.associate = (models) => {
  //   Order.belongsTo(models.User, {
  //     foreignKey: "userId",
  //     as: "user",

  //   })
  // }

  return Order
}