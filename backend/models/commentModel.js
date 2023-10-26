import Sequelize from "sequelize";
import db from "../config/database.js";
import Product from "./productModel.js";
import User from "./userModel.js"

const { DataTypes } = Sequelize;

const ProductComment = db.define('product_comment',{
    commentId:{
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
    commentText:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true
})

User.belongsToMany(Product, { 
    through: ProductComment,
    foreignKey: 'userId'
});

Product.belongsToMany(User, { 
    through: ProductComment,
    foreignKey: 'productId'
});

ProductComment.belongsTo(User, { 
    foreignKey: 'userId' 
})
ProductComment.belongsTo(Product,{
    foreignKey: 'productId'
})
Product.hasMany(ProductComment, {
    foreignKey: 'productId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

User.hasMany(ProductComment, {
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})


export default ProductComment;