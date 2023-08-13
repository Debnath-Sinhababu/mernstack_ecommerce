import express from 'express'
import { deleteUser, getAllUser, getSingleUser, getUserDetails, LoginUser, Logout, RegisterUser, resetPassword, updatePassword, updateProfile, updateUserRole } from '../controllers/UserController.js'
import { forgotPassword } from '../controllers/UserController.js'
import { isAuthenticatedUser } from '../middlewares/auth.js'
import { authorizeRole } from '../middlewares/authorizeRole.js'
import multipart from 'connect-multiparty'
import multer from 'multer'
const router=express.Router()

router.route('/auth/register').post(RegisterUser)
router.route('/auth/login').post(LoginUser)
router.route('/auth/logout').get(Logout)
router.route('/auth/forgot-password').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/auth/me').get( isAuthenticatedUser,getUserDetails)
router.route('/auth/updatepassword').put(isAuthenticatedUser,updatePassword)
router.route('/auth/updateprofile').put(isAuthenticatedUser,updateProfile)
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllUser);
  router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser).put(isAuthenticatedUser, authorizeRole("admin"),updateUserRole).delete(isAuthenticatedUser, authorizeRole("admin"),deleteUser)
export default router