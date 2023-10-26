import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import Transaction from "../models/transactionModel.js";

export const addTransaction = (req, res) => {
    try {
        let transactionId = 0
        Transaction.create({
            userId: req.body.userId,
            paymentMethod: req.body.paymentMethod,
            amountPaid: req.body.amountPaid
        }).then(result => {
            transactionId = result.transactionId
            Cart.update({
                transactionId: result.transactionId
            }, {
                where: {
                    userId: req.body.userId,
                    transactionId: null
                }
            }).then(() => {
                return Cart.findAll({
                    where:{
                        transactionId: transactionId
                    }, 
                    include:{
                        model: Product
                    }
                })
            }).then((cart)=>{
                cart.forEach(item => {
                    Product.update({
                        productStock: item.product.productStock - item.productQty 
                    }, {
                        where: {
                            productId: item.productId
                        }
                    })
                });
                res.json({message: "Transaction Success", cart: cart})
            });
        });   

    } catch (error) {
        res.json({message: "Something Went Wrong", error: error.message})
    }
    

}

export const getAllTransaction = async(req, res) => {
    try {
        const transactions = await Transaction.findAll()
        res.json({response: transactions})
    } catch (error) {
        res.json({message: "Something Went Wrong", error: error.message})
    }
}

export const getUserTransaction = async(req, res) => {
    try {
        const transactions = await Transaction.findAll({
            where:{
                userId: req.params.id
            }
        })
        res.json({response: transactions})
    } catch (error) {
        res.json({message: "Something Went Wrong", error: error.message})
    }
}

export const getTransactionDetail = async(req, res) => {
    try {
        const detail = await Cart.findAll({
            where: {
                transactionId: req.params.id
            },
            include: {
                model: Product
            }
        })
        res.json({response: detail})
    } catch (error) {
        res.json({message: "Something Went Wrong", error: error.message})
    }
}

