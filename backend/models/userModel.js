import Sequelize from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define('user',{
    userId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userAvatar:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.ENUM('Admin', 'User'),
        allowNull: false
    },
    refresh_token:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
})


export default User;