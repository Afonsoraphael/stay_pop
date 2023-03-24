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
    valid: {
      type: dataTypes.TINYINT,
      defaultValue: 1,
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
    },
    deletedAt: {
      type: dataTypes.DATE,
      allowNull: true,
      field: 'deleted_at',
    },
  }, {
    tableName: 'products', 
    underscored: true, 
    timestamps: true, 
    paranoid: true 
  })

  return Product;
}