import Sequelize from "sequelize";
import db from "../config/database.js";
import ProductImage from "./galleryModel.js";
import Discount from "./discountModel.js";

const { DataTypes } = Sequelize;

const Product = db.define('product',{
    productId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    productName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    productSummary:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    productDesc:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    productCategory:{
        type: DataTypes.STRING,
        allowNull: false
    },
    productBrand:{
        type: DataTypes.STRING,
        allowNull: false
    },
    productPrice:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productStock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discountId:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true,
    timestamps: false
})

ProductImage.belongsTo(Product, {
    foreignKey: 'productId'
})
Product.hasMany(ProductImage,{
    foreignKey: 'productId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Product.belongsTo(Discount, {
    foreignKey: 'discountId'
})

Discount.hasMany(Product, {
    foreignKey: 'discountId'
})

export default Product;