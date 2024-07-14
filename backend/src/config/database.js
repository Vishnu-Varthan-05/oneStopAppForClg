const  { Sequelize }  = require('sequelize');
const config = require('./config');

const db = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect:config.development.dialect,
    logging:config.development.logging
});

(async ()=>{
    try {
        await db.authenticate();
        console.log("Connection established successfully");
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
})();


module.exports = db;