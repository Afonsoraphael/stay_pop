module.exports = (sequelize, dataTypes) => {
  const Order = sequelize.define('Order', {
     productId: {
        type: dataTypes.INTEGER(10),
        allowNull: false,
        foreignKey: true,
        field: 'product_id',
      },

      orderNumber: {
        type: dataTypes.STRING(700),
        allowNull: false,
        field: 'order_number',
      },

      quantity: {
        type: dataTypes.INTEGER(10),
        allowNull: false,
      }
  }, 
  { 
    tableName: 'orders', 
    timestamps: false 
  })

  Order.associate = (models) => {
    Order.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'
    })
  }

  Order.removeAttribute('id');

  return Order
}