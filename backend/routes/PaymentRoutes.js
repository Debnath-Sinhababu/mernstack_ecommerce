import express from 'express'
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { processPayment,sendStripeApiKey } from "../controllers/PaymentController.js";

const router=express.Router()

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);
export default router
