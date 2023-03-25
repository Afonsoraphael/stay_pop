require('dotenv').config({path:__dirname+'/../../.env'})

const config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'stay_pop',
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        seederStorage: "sequelize",
        seederStorageTableName: "sequelize_data"
    }
}

module.exports = config

