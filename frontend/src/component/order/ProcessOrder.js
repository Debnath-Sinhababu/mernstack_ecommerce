import { Typography } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import Sidebar from '../Admin/Sidebar'
import Loader from '../Layout/Loader/Loader'
import MetaData from '../Layout/MetaData'
import { Link } from 'react-router-dom'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getOrderDetails } from '../../actions/orderAction';
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux';
import './processOrder.css'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant';
import { clearError } from '../../actions/orderAction';
import { updateOrder } from '../../actions/orderAction';
const ProcessOrder = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { isUpdated ,error:updateerror} = useSelector((state) => state.order);
    const [status, setStatus] = useState("");
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    console.log(order)
    useEffect(()=>{
         if(updateerror){
            alert.error(updateerror)
            dispatch(clearError())
            return
         }

         if(isUpdated){
            alert.success("Order Updated Successfully")
            dispatch({type:UPDATE_ORDER_RESET})
         }
         console.log(1)
        dispatch(getOrderDetails(id));
    },[id,dispatch,isUpdated,updateerror])

    const updateOrderSubmitHandler=(e)=>{
        e.preventDefault()
       
        const myform=new FormData()
        myform.append("status",status)
        dispatch(updateOrder(id,myform))
    }
  return (
    <Fragment>
    <MetaData title="Process Order" />
    <div className="dashboard">
      <Sidebar />
      <div className="newProductContainer">
        {loading ? (
          <Loader />
        ) : (
          <div
            className="confirmOrderPage"
            style={{
              display: order.orderStatus === "delhivered" ? "block" : "grid",
            }}
          >
            <div>
              <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>

                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>

                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "delhivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div
              style={{
                display: order.orderStatus === "delhivered" ? "none" : "block",
              }}
            >
              <form
                className="updateOrderForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Order</h1>

                <div>
                  <AccountTreeIcon />
                  <select  onChange={(e)=>{
                   
                     setStatus(e.target.value)
                  }}>
                    <option value="">Choose Category</option>
                    {order.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}

                    {order.orderStatus === "Shipped" && (
                      <option value="delhivered">Delivered</option>
                    )}
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    loading ? true : status===""?true : false
                  }
                >
                  Process
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  </Fragment>
  )
}

export default ProcessOrder
