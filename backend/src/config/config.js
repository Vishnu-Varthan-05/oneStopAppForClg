const dotenv = require('dotenv');

dotenv.config({path:__dirname+'/./../../.env'});

module.exports = {
    development:{
        username:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_NAME,
        host:process.env.DB_HOST,
        dialect: 'mysql',
        logging: true
    },
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET
}