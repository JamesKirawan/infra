import ProductComment from "../models/commentModel.js"
import Product from "../models/productModel.js"
import User from "../models/userModel.js"

export const getAllComment = async (req, res) => {
    try {
        const comments = await ProductComment.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password','refresh_token']
                    }
                },
                {
                    model: Product,
                    where: {
                        productId: req.params.id
                    }
                }
            ],
        })
        res.json({comments: comments})
    } catch (error) {
        console.log(error)
    }
    
}


export const postComment = async(req, res) => {
    try {
        await ProductComment.create({
            userId: req.body.userId,
            productId: req.body.productId,
            commentText: req.body.commentText
        }).then((result) => {
            res.json({
                message: "Comment Posted!",
                result: result
        })
        });
    } catch (error) {
        console.log(error)
    }
}

export const editComment = async (req, res) => {
    console.log("hello")
    try {
        
        await ProductComment.update({
            commentText: req.body.commentText
        }, {
            where: {
                commentId: req.params.id
            }
        })
        res.json({message: "Comment Updated"})
    } catch (error) {
        console.log(error)
    }
}

export const destroyComment = async (req, res) => {
   try {
        await ProductComment.destroy({
            where: {
                commentId: req.params.id
            }
        })
        res.json({message: "Comment Deleted"})
    } catch (error) {
        console.log(error)
    }
}