import Product from "../models/productModel.js"
import ProductImage from "../models/galleryModel.js"
import Sequelize  from "sequelize"
import * as fs from 'fs'

const Op = Sequelize.Op
const operatorAliases = {
    $like: Op.like,
    $not: Op.not
}

export const getAllGallery = async (req, res) => {
    try{
        const galleries = await ProductImage.findAll()
        res.json({gallery: galleries})
    } catch(error) {
        res.json({message: error.message})
    }
}
export const getGallery = async (req, res)=>{
    try {
        const gallery = await ProductImage.findAndCountAll({
           where: {
               productId: req.params.id
           }
        });
        

        res.json({gallery: gallery})
    } catch (error) {
        res.json({message: error.message})
    }
    
}

export const createImage = async (req, res)=>{
    try {
        await ProductImage.create({
            imageType : req.file.mimetype,
            imageName : req.file.originalname,
            imagePath : 'uploads/'+req.file.filename,
            used : 'False',
            productId : req.body.productId
        }).then((result) => {
            res.json({
                message: "Image Uploaded",
                result: result
            })
        })
    } catch (error) {
        res.json({message: error.message})
    }
    
}

export const destroyImage = async(req, res)=>{
    try {
        const file = await ProductImage.findOne({
            where: {
                imageId: req.params.id
            }
        })

        await ProductImage.destroy({
            where: {
                imageId: req.params.id
            }
        })

        fs.unlink(__dirname + "/resources/static/assets/" + file.imagePath, (err => {
            if (err) console.log(err);
            else {
              console.log("File Deleted");
            
            }
        }));

        res.json({message: "File Deleted"})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateUsedImage = async(req, res) => {
    try {
        ProductImage.update({
            used: 'False'
        },{
            where: {
                productId: req.params.id,
                used: 'True'
            }
        });

        ProductImage.update({
            used: 'True'
        }, {
            where: {
                productId: req.params.id,
                imageId: req.body.imageId
            }
        })

        res.json({message: "Thumbnail Updated!"})
    } catch (error) {
        res.json({message: "Something Went Wrong", error: error.message})
    }
}
