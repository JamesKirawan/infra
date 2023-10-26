import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import ProductImage from "../models/galleryModel.js";
import Discount from "../models/discountModel.js";

export const getUserCart = async(req, res) => {
    try {
        let cart = await Cart.findAll({
            where: {
                userId: req.params.id,
                transactionId: null
            },
            include: [
                {
                    model: Product,
                }
            ]
        })
        
        for (const item of cart){
            if (item.productQty > item.product.productStock){
                console.log(item.product.productStock)
                console.log(item.productQty)
                await Cart.update({
                    productQty: item.product.productStock
                }, {
                    where: {
                        userId: item.userId,
                        productId: item.productId,
                        transactionId: null
                    }
                })
            }
        }

        cart = await Cart.findAll({
            where: {
                userId: req.params.id,
                transactionId: null
            },
            include: [
                {
                    model: Product
                }
            ]
        }).then(items=> {
            if (items.length == 0){
                res.json({cart: []})
            }
            items.forEach(function(item,idx,array){
                Product.findOne({
                    where: {
                        productId: item.productId
                    },
                    include:[{
                        model: ProductImage,
                        where : {
                            used: 'True'
                        },
                        required: false
                    }, {
                        model: Discount
                    }],
                }).then(detail=>{
                    
                    item.product.setDataValue('imagePath', detail.product_galleries[0].imagePath)  
                    
                    if(item.product.discountId){
                        item.product.setDataValue('product_discount', detail.product_discount)
                        item.product.setDataValue("beforeDiscount", item.product.productPrice)
                        item.product.productPrice = (100 - detail.product_discount.discountPercent) / 100 * item.product.productPrice    
                    }
                }).catch((err) => {
                    console.log(err)
                }).then(()=>{
                    if(idx === array.length -1){
                        res.json({cart: items})
                    }
                })
            })
        })

    } catch (error) {
        res.json({message: "Something Went Wrong", error: error.message})
    }

}

export const addToCart = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                productId: req.body.productId
            },
            attributes: ['productStock']
        })
        if (req.body.productQty > product.productStock){
            res.json({message: "Insufficient Stock"})
        } else {
            const count = await Cart.count({
                where:{
                    userId: req.body.userId,
                    productId: req.body.productId,
                    transactionId: null
                }
            });
            if (count != 0){
                await Cart.update({
                    productQty: req.body.productQty
                }, {
                    where: {
                        userId: req.body.userId,
                        productId: req.body.productId
                    }
                });
                res.json({message: "Cart Updated!"})
            } else {
                await Cart.create({
                    userId: req.body.userId,
                    productId: req.body.productId,
                    productQty: req.body.productQty
                });
                res.json({message: "Added to Cart!"})
            }
    
        }
    } catch (error) {
        res.json({message: "Something Went Wrong", error: error.message})
    }
}

export const removefromCart = async(req, res) => {
    try {
        await Cart.destroy({
            where:{
                userId: req.params.userId,
                productId: req.params.productId
            }
        })
        res.json({message: "This Item Removed From Your Cart"})
    } catch (error) {
        res.json({message: "Something Went Wrong!", error: error.message})
    }
}
