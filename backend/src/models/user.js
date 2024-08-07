const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
},
{
    tableName: 'users'
})

module.exports = User;