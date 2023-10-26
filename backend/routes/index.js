import express from "express";
import {
    addToCart,
    getUserCart,
    removefromCart
} from "../controllers/cart.js";
import {
    destroyComment, editComment, getAllComment,
    postComment
} from "../controllers/comment.js";
import {
    destroyDiscount, getAllDiscount,
    setDiscount
} from "../controllers/discount.js";
import {
    createImage,
    destroyImage, getAllGallery, getGallery, updateUsedImage
} from "../controllers/gallery.js";
import {
    createProduct, destroyProduct, getAllProducts,
    getProduct, updateProduct
} from "../controllers/products.js";
import {
    getRating,
    getRatingUser, ratingProduct
} from "../controllers/rating.js";
import { refreshToken } from "../controllers/refreshToken.js";
import {
    addTransaction,
    getAllTransaction, getTransactionDetail, getUserTransaction
} from "../controllers/transaction.js";
import {
    getAllUser,
    getUserById, login,
    logout, register,
    updateUserProfile
} from "../controllers/user.js";
import {
    addToWishlist,
    getUserWishlist,
    removefromWishlist
} from "../controllers/wishlist.js";
import uploadFile from "../middleware/upload.js";
import uploadAvatar from "../middleware/uploadAvatar.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//Main Routing
router.get('/users', verifyToken, getAllUser);
router.get('/user/:id', verifyToken, getUserById);
router.put('/user/:id', verifyToken, uploadAvatar.single("file"), updateUserProfile);
router.get('/token', refreshToken);
router.post('/user',register);
router.post('/login', login);
router.delete('/logout', logout);

//Product Routing
router.get('/products', getAllProducts);

router.get('/products/:id', getProduct);

router.post('/products', verifyToken, uploadFile.single("file"), createProduct);

router.put('/products/:id', verifyToken, uploadFile.single("file"), updateProduct);

router.delete('/products/:id', verifyToken, destroyProduct);


//Gallery Routing
router.get('/gallery', getAllGallery)
router.get('/gallery/product/:id', getGallery);
router.post('/gallery', verifyToken, uploadFile.single("file"), createImage);
router.put('/product/:id/image', updateUsedImage)
router.delete('/gallery/:id', verifyToken, destroyImage);


//Comment Routing
router.get('/product/:id/comments', getAllComment)
router.post('/comments', verifyToken, postComment)
router.put('/comment/:id', verifyToken, editComment)
router.delete('/comment/:id', verifyToken, destroyComment)

//Rating Routing
router.post('/rate', verifyToken, ratingProduct)
router.get('/product/:id/rating',getRating)
router.get('/product/:productId/rating/user/:userId',getRatingUser)

//Discount Routing
router.get('/discounts', getAllDiscount)
router.put('/product/:id/discount', setDiscount)
router.delete('/product/:id/discount', destroyDiscount)

//Wishlist Routing
router.post('/wishlist', addToWishlist)
router.get('/user/:id/wishlist', getUserWishlist)
router.delete('/user/:userId/product/:productId', removefromWishlist)

//Cart Routing
router.post('/cart', addToCart)
router.get('/user/:id/cart', getUserCart)
router.delete('/cart/user/:userId/product/:productId', removefromCart)

//Transaction Routing
router.post('/transaction', addTransaction)
router.get('/transaction', getAllTransaction),
router.get('/user/:id/transaction', getUserTransaction)
router.get('/transaction/:id', getTransactionDetail)
export default router;