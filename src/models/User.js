module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_admin',
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
          }
    }, {
        tableName: 'users', 
        underscored: true, 
        timestamps: true, 
        paranoid: true 
    })

    return User
}