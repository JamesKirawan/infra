import Discount from "../models/discountModel.js";
import Product from "../models/productModel.js";

export const getAllDiscount = async(req, res) => {
    try {
        const discounts = await Discount.findAll()
        res.json({response: discounts})
    } catch (error) {
        res.json({message: "Something Went Wrong", error: error.message})
    }
}

export const getDiscount = async(req, res) => {
    try {
        const discounts = await Discount.findAll({
            where: {
                discountId: req.params.id
            }
        })
        res.json({response: discounts})
    } catch (error) {
        res.json({message: "Something Went Wrong", error: error.message})
    }
}

export const createDiscount = async(req, res) => {
    try {
        await Discount.create({
            discountName: req.body.discountName,
            discountPercent: req.body.discountPercent
        });
        res.json({message: "Discount Created!"})
    } catch (error) {
        res.json({messsage: "Something Went Wrong!", error: error})
    }
}

export const updateDiscount = async(req, res) => {
    try {
        await Discount.update({
            discountName: req.body.discountName,
            discountPercent: req.body.discountPercent
        }, {
            where: {
                discountId: req.params.id
            }
        });
        res.json({message: "Discount Updated!"})
    } catch (error) {
        res.json({messsage: "Something Went Wrong!", error: error})
    }
}

export const destroyDiscount = async(req, res) => {
    try {
        await Discount.destroy({
            where: {
                discountId: req.params.id
            }
        });
        res.json({message: "Discount Deleted!"})
    } catch (error) {
        res.json({messsage: "Something Went Wrong!", error: error})
    }
}

export const setDiscount = async(req, res) => {
    try {
        await Product.update({
            discountId: req.body.discountId
        },{
            where: {
                productId: req.params.id
            }
        });
        res.json({message: "Set Discount to this Product!"})
    } catch (error) {
        res.json({message: "Something Went Wrong", error: error.message})
    }
}
