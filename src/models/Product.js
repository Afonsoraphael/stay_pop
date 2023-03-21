module.exports = (Sequelize, dataTypes) => {
  const Product = Sequelize.define('Product',  { 
    id: {
      type: dataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: dataTypes.STRING(500),
      allowNull: false
    },
    price: {
      type: dataTypes.FLOAT(10,2),
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING(1000),
      allowNull: false
    },
    category: {
      type: dataTypes.STRING(250),
      allowNull: false
    },
    img: {
      type: dataTypes.STRING(1000),
      allowNull: true
    },
    createdAt: {
      type: dataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: { 
      type: dataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
  }
  }, {tableName: 'products', underscored: true, timestamps: true })

  Product.associate = (models) => {
    Product.belongsToMany(models.User, {
      foreignKey: "productId",
      otherKey: "userId",
      through: models.Order
    })
  }

  return Product;
}