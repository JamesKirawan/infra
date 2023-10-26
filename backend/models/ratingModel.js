import Sequelize from "sequelize";
import db from "../config/database.js";
import Product from "./productModel.js";
import User from "./userModel.js"

const { DataTypes } = Sequelize;

const ProductRating = db.define('product_rating',{
    productRatingId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productRating:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true
})

User.belongsToMany(Product, { 
    through: ProductRating,
    foreignKey: 'userId'
});

Product.belongsToMany(User, { 
    through: ProductRating,
    foreignKey: 'productId'
});

ProductRating.belongsTo(User, { 
    foreignKey: 'userId' 
})
ProductRating.belongsTo(Product,{
    foreignKey: 'productId'
})
Product.hasMany(ProductRating, {
    foreignKey: 'productId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

User.hasMany(ProductRating, {
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})


export default ProductRating;