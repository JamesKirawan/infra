import ProductImage from "../models/galleryModel.js";
import Product from "../models/productModel.js";
import Wishlist from "../models/wishlistModel.js";
import ProductRating from "../models/ratingModel.js"
import Discount from "../models/discountModel.js";
import Sequelize  from "sequelize";

export const getUserWishlist = async(req, res) => {
    try {
        await Wishlist.findAll({
            where: {
                userId: req.params.id
            },
            include: [
                {
                    model: Product,
                },
            ],
        })
        .then(items=> {
            if (items.length == 0){
                res.json({wishlist: []})
            }
            items.forEach(function(item,idx,array){
                Product.findOne({
                    where: {
                        productId: item.productId,
                    },
                    include:[{
                        model: ProductImage,
                        where : {
                            used: 'True'
                        },
                        required: false
                    }, {
                        model: Discount
                    }, {
                        model: ProductRating,
                        attributes: ['productRatingId', 
                            [Sequelize.fn('sum', Sequelize.col('productRating')), 'totalRating'],
                            [Sequelize.fn('count', Sequelize.col('productRatingId')), 'count']
                        ]
                    }],
                }).then(detail=>{
                    let finalrating = detail.product_ratings[0].dataValues.totalRating / detail.product_ratings[0].dataValues.count
                    item.product.setDataValue('finalRating', finalrating)
                    
                    const img = {imagePath: detail.product_galleries[0].imagePath}
                    item.product.setDataValue('product_galleries', [img])

                    if(item.product.discountId){
                        item.product.setDataValue('product_discount', detail.product_discount)
                        item.product.setDataValue("beforeDiscount", item.product.productPrice)
                        item.product.productPrice = (100 - detail.product_discount.discountPercent) / 100 * item.product.productPrice    
                    }
                }).catch((err) => {
                    console.log(err)
                })
                .then(()=>{
                    if(idx === array.length -1){
                        res.json({wishlist: items})
                    }
                })
            })
        })
        
    } catch (error) {
        res.json({message: "Something Went Wrong!", error: error.message})
    }
}

export const addToWishlist = async(req, res) => {
    try {
        
            const count = await Wishlist.count({
                where:{
                    userId: req.body.userId,
                    productId: req.body.productId
                }
            });
            if (count != 0){
                await Wishlist.update({
                    productQty: req.body.productQty
                }, {
                    where: {
                        userId: req.body.userId,
                        productId: req.body.productId
                    }
                });
                res.json({message: "Wishlist Updated!"})
            } else {
                await Wishlist.create({
                    userId: req.body.userId,
                    productId: req.body.productId,
                    productQty: req.body.productQty
                });
                res.json({message: "Added to Wishlist!"})
            }
    
        
    } catch (error) {
        res.json({message: "Something Went Wrong", error: error.message})
    }
}

export const removefromWishlist = async(req, res) => {
        try {
            await Wishlist.destroy({
                where:{
                    userId: req.params.userId,
                    productId: req.params.productId
                }
            })
            res.json({message: "Item Removed!"})
        } catch (error) {
            res.json({message: "Something Went Wrong!", error: error.message})
        }
}