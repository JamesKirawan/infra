import Product from "../models/productModel.js";
import ProductImage from "../models/galleryModel.js";
import ProductRating from "../models/ratingModel.js";
import Discount from "../models/discountModel.js";
import Sequelize from "sequelize";
import * as fs from "fs";

const Op = Sequelize.Op;
const operatorAliases = {
  $like: Op.like,
  $not: Op.not,
};

export const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  var whereStatement = {};
  try {
    if (req.query.filterBrand)
      whereStatement.productBrand = JSON.parse(req.query.filterBrand);
    if (whereStatement.productBrand.length === 0)
      delete whereStatement.productBrand;
  } catch {
    if (req.query.filterBrand)
      whereStatement.productBrand = req.query.filterBrand;
  }
  if (req.query.filterCategory)
    whereStatement.productCategory = req.query.filterCategory;
  // if (req.query.filterType){
  //     if (req.query.filterType == "Brand"){
  //         whereStatement.productBrand = req.query.filterValue
  //     } else if (req.query.filterType = "Category"){
  //         whereStatement.productCategory = req.query.filterValue
  //     }
  // }

  if (req.query.searchedProduct) {
    whereStatement.productName = {
      [Op.like]: "%" + req.query.searchedProduct + "%",
    };
  }
  try {
    let total = await Product.count();
    let products = await Product.findAndCountAll(
      {
        include: [
          {
            model: ProductImage,
            where: {
              used: "True",
            },
            required: false,
          },
          {
            model: Discount,
          },
          {
            model: ProductRating,
          },
        ],
        limit: size,
        offset: page * size,
        where: whereStatement,
      },
      {
        subQuery: false,
      }
    );

    products.rows.forEach((product) => {
      if (product.product_discount) {
        product.setDataValue("beforeDiscount", product.productPrice);
        product.productPrice =
          ((100 - product.product_discount.discountPercent) / 100) *
          product.productPrice;
      }
    });

    products.rows.forEach((product) => {
      let rating_count = product.product_ratings.length;
      let totalRating = 0;
      product.product_ratings.forEach((rating) => {
        totalRating = totalRating + rating.productRating;
      });
      let finalRating = totalRating / rating_count;
      product.setDataValue("finalRating", finalRating);
    });

    const brands = await Product.aggregate("productBrand", "DISTINCT", {
      plain: false,
    });
    const categories = await Product.aggregate("productCategory", "DISTINCT", {
      plain: false,
    });

    products.count = total;
    console.log(products.count);
    res.json({ products: products, brands: brands, categories: categories });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      include: [
        {
          model: ProductImage,
          where: {
            used: "True",
          },
          required: false,
        },
        {
          model: Discount,
        },
      ],
      where: {
        productId: req.params.id,
      },
    });

    if (product.product_discount) {
      product.setDataValue("beforeDiscount", product.productPrice);
      product.productPrice = String(
        parseInt(product.productPrice) -
          (parseInt(product.productPrice) *
            product.product_discount.discountPercent) /
            100
      );
    }
    res.json({ product: product });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    await Product.create(
      {
        productName: req.body.productName,
        productSummary: req.body.productSummary,
        productDesc: req.body.productDesc,
        productCategory: req.body.productCategory,
        productBrand: req.body.productBrand,
        productPrice: req.body.productPrice,
        productStock: req.body.productStock,
        product_galleries: [
          {
            imageType: req.file.mimetype,
            imageName: req.file.originalname,
            imagePath: "uploads/" + req.file.filename,
            used: "True",
            productId: res.productId,
          },
        ],
      },
      {
        include: ProductImage,
      }
    ).then((resp) => {
      res.json({ message: "Product Added!", product: resp });
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  console.log(req.body.productName);
  try {
    await Product.update(
      {
        productName: req.body.productName,
        productSummary: req.body.productSummary,
        productDesc: req.body.productDesc,
        productCategory: req.body.productCategory,
        productBrand: req.body.productBrand,
        productPrice: req.body.productPrice,
        productStock: req.body.productStock,
      },
      {
        where: {
          productId: req.params.id,
        },
      }
    );
    res.json({ message: "Product Updated" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const destroyProduct = async (req, res) => {
  try {
    const gallery = await ProductImage.findAll({
      where: {
        productId: req.params.id,
      },
    });

    await Product.destroy({
      where: {
        productId: req.params.id,
      },
    });

    for (const image in gallery) {
      fs.unlink(
        __dirname + "/resources/static/assets/" + gallery[image].imagePath,
        (err) => {
          if (err) console.log(err);
          else {
            console.log("File Deleted");
          }
        }
      );
    }

    res.json({ message: "Product Deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
