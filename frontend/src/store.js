import { combineReducers,createStore ,applyMiddleware} from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { ProductReducer,ProductDetailReducer, newReviewReducer, newProductReducer, deleteProductReducer } from './reducers/productReducer';
import { deleteUserReducer, profileReducer, userDetailsReducer, UserReducer } from './reducers/userReducer';
import { CartReducer } from './reducers/cartReducer';
import { forgotPasswordReducer } from './reducers/userReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';
const reducer=combineReducers({
  products:ProductReducer,
  ProductDetail:ProductDetailReducer,
  UserReducer,
  profile:profileReducer,
   forgotPassword :forgotPasswordReducer,
   cart:CartReducer,
   newOrder: newOrderReducer,
   myOrders: myOrdersReducer,
   orderDetails: orderDetailsReducer,
   newReview: newReviewReducer,
   newProduct:newProductReducer,
   deleteProduct:deleteProductReducer,
   allOrders:allOrdersReducer,
   order: orderReducer,
   userDetails: userDetailsReducer,
   deleteUser:deleteUserReducer
})
const middleware=[thunk]
const initialState={
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },

}
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk)
      // other store enhancers if any
    )
  );
  export default store