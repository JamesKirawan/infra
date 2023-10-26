import Sequelize from "sequelize";
import db from "../config/database.js";
import Product from "./productModel.js";
import User from "./userModel.js"

const { DataTypes } = Sequelize;

const Cart = db.define('cart',{
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productQty:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transactionId:{
        type: DataTypes.INTEGER,
    }
},{
    freezeTableName: true
})

Cart.removeAttribute('id');

User.belongsToMany(Product, { 
    through: Cart,
    foreignKey: 'userId'
});

Product.belongsToMany(User, { 
    through: Cart,
    foreignKey: 'productId'
});

Cart.belongsTo(User, { 
    foreignKey: 'userId' 
})

Cart.belongsTo(Product,{
    foreignKey: 'productId'
})

Product.hasMany(Cart, {
    foreignKey: 'productId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

User.hasMany(Cart, {
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default Cart;