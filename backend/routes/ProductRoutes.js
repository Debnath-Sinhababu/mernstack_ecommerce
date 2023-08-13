import express from 'express'
import { creatProductReview, deleteProduct, deleteReview, getAdminProducts, Getallproducts, getProductDetail, getProductReviews, UpdateProduct } from '../controllers/ProductControllers.js';
import { CreateProduct } from '../controllers/ProductControllers.js';
import  {isAuthenticatedUser}  from "../middlewares/auth.js";
import { authorizeRole } from '../middlewares/authorizeRole.js';
const router=express.Router()

router.route("/products").get(Getallproducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAdminProducts);
router.route('/admin/products/new').post(isAuthenticatedUser,authorizeRole("admin"), CreateProduct)
router.route('/admin/products/:id').put(isAuthenticatedUser ,authorizeRole('admin'),UpdateProduct).delete(isAuthenticatedUser,authorizeRole('admin'),deleteProduct)
router.route('/products/:id').get(getProductDetail)
router.route("/review").put(isAuthenticatedUser, creatProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
export default router