import Sequelize from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const ProductImage = db.define('product_gallery',{
    imageId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    imageType:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imageName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imagePath:{
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE
    },
    used:{
        type: DataTypes.ENUM('True', 'False'),
        allowNull: false
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
})

export default ProductImage;