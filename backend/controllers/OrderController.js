import { Asyncerror } from "../middlewares/asyncerror.js";
import Order from "../models/orderModel.js";
import productModel from "../models/productModel.js";
export const newOrder = Asyncerror(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});
export const getSingleOrder = Asyncerror(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
  
    if (!order) {
      return next(new ErrorHandler("order not found for this id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });
  export const myOrders = Asyncerror(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
  
    res.status(200).json({
      success: true,
      orders,
    });
  });

  export const getAllOrders = Asyncerror(async (req, res, next) => {
    const orders = await Order.find();
    
    let totalAmount = 0;
  
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });
  export const updateOrder=Asyncerror(async(req,res,next)=>{
         
        const order=await Order.findById(req.params.id)
        if(!order){
          return next(new ErrorHandler("product not found for this id", 404));
        }
        if (order.orderStatus === "Delivered") {
          return next(new ErrorHandler("this order has already been delhivered", 404));
          }
        const orderitems=order.orderItems
            if(req.body.status=="Shipped"){
         for(let i=0;i<orderitems.length;i++){
           await updatestock(orderitems[i].product,orderitems[i].quantity)
         }
        }
         order.orderStatus = req.body.status;
         if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
          }
          await order.save({ validateBeforeSave: false });
          res.status(200).json({
            success: true,
          });
        

  })
  async function updatestock(id,quantity){
       const product=await productModel.findById(id)
        product.Stock-=quantity
        await product.save({ validateBeforeSave: false })

  }

  export const deleteOrder = Asyncerror(async (req, res, next) => {
    console.log(req.params.id)
    const order = await Order.findById(req.params.id);
     console.log(order)
    if (!order) {
      return next(new ErrorHandler("order not found for this id", 404));
    }
  
    await Order.findByIdAndRemove(req.params.id);
  
    res.status(200).json({
      success: true,
    });
  });
  