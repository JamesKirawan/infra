import Sequelize from "sequelize";
import db from "../config/database.js";
import User from "./userModel.js"
import Cart from "./cartModel.js";

const { DataTypes } = Sequelize;

const Transaction = db.define('transaction',{
    transactionId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paymentMethod:{
        type: DataTypes.STRING,
        allowNull: false
    },
    amountPaid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE
    },
},{
    freezeTableName: true,
    timestamps: false
})

Cart.belongsTo(Transaction, {
    foreignKey: 'transactionId'
})

Transaction.hasMany(Cart,{
    foreignKey: 'transactionId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Transaction.belongsTo(User, {
    foreignKey: 'userId'
})

User.hasMany(Transaction,{
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})



export default Transaction