import ProductRating from "../models/ratingModel.js"
import Product from "../models/productModel.js"
import User from "../models/userModel.js"

export const ratingProduct = async(req, res) => {
    try {
        const count = await ProductRating.count({
            where:{
                userId: req.body.userId,
                productId: req.body.productId
            }
        });
        if (count != 0){
            await ProductRating.update({
                productRating: req.body.productRating
            }, {
                where: {
                    userId: req.body.userId,
                    productId: req.body.productId
                }
            });
            res.json({message: "Rating Updated!"})
        } else {
            await ProductRating.create({
                userId: req.body.userId,
                productId: req.body.productId,
                productRating: req.body.productRating
                
            });
            res.json({message: "You Rated This Product!"})
        }

    } catch (error) {
        res.json({message: "Something Wrong!", error: error})
    }
}

export const getRating = async(req, res) => {
    try {
        const ratings = await ProductRating.findAndCountAll({
            where: {
                productId: req.params.id
            }
        })
    
        let totalRating = 0
        for (const rating in ratings.rows){
           totalRating = totalRating + ratings.rows[rating].productRating
        }
        let finalRating = totalRating / ratings.count
        res.json({response: ratings, rating:finalRating})
    } catch (error) {
        res.json({message: "Something went Wrong!"})
    }
}

export const getRatingUser = async(req, res) => {
    try {
        const ratings = await ProductRating.findAll({
            where: {
                productId: req.params.productId,
                userId: req.params.userId
            }
        })
    
        
        res.json({response: ratings})
    } catch (error) {
        res.json({message: "Something went Wrong!"})
    }
}

