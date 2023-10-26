import Sequelize from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Discount = db.define('product_discount',{
    discountId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    discountName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    discountPercent: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    freezeTableName: true
});

export default Discount