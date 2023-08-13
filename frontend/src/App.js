import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './component/Layout/Header/Header';
import Footer from './component/Layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetail from './component/product/ProductDetail';
import Products from './component/product/Products';
import Search from './component/product/Search';
import LoginSignup from './component/User/LoginSignup';
import { loadUser } from './actions/UserActions';
import { useState,useEffect } from 'react';
import store from './store';
import { useSelector } from 'react-redux';
import UserOptions from './component/Layout/Header/UserOptions';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/Updatepassword';
import ForgotPassword from './component/User/forgotpassword';
import ResetPassword from './component/User/resetpasswrod';
import Cart from './component/cart/Cart';
import Shipping from './component/cart/CheckoutAddress';
import ConfirmOrder from './component/cart/confirmOrder';
import API from './services/API';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './component/cart/Payment';
import OrderSuccess from './component/cart/OrderSuccess';
import MyOrders from './component/order/myorders';
import OrderDetails from './component/order/Orderdetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/Productlist';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/updateProduct';
import OrderList from './component/Admin/orderList';
import ProcessOrder from './component/order/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import PageNotFound from './component/PageNotFound';
import Contact from './component/Layout/contact/Contact';
function App() {
   const {isAuthenticated,user}=useSelector((state)=>state.UserReducer)
   const [stripeApiKey, setStripeApiKey] = useState("");
   async function getStripeApiKey() {
      const { data } = await API.get("/stripeapikey");
  
      setStripeApiKey(data.stripeApiKey);
    }
   console.log(isAuthenticated)
     useEffect(()=>{
        store.dispatch(loadUser())
        getStripeApiKey()
     },[])
  return (
   <BrowserRouter>
     <Header/>
     {
     isAuthenticated && <UserOptions user={user}/>
     }
     <Routes>
      <Route  path='/' element={ <Home/>}/>
      {
         stripeApiKey && (
            
        <Route  path='/process/payment' element={ 
         <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment apikey={stripeApiKey}/>
        </Elements>
        }/>
      
         )
      }
      
     
      <Route  path='/product/:id' element={<ProductDetail/>}/>
      <Route exact path='/products' element={<Products/>}/>
      <Route exact path='/search' element={<Search/>}/>
      <Route exact path='/products/:keyword' element={<Products/>}/>
      <Route exact path='/login' element={<LoginSignup/>}/>
      <Route exact path='/account' element={<Profile/>}/>
      <Route exact path='/me/update' element={<UpdateProfile/>}/>
      <Route exact path='/password/update' element={<UpdatePassword/>}/>
      <Route exact path='/password/forgot' element={<ForgotPassword/>}/>
      <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
      <Route exact path="/cart" element={<Cart/>} />
      <Route exact path="/shipping" element={<Shipping/>} />
      <Route exact path="/order/confirm" element={<ConfirmOrder/>} />
     
      <Route exact path="/success" element={  <OrderSuccess/>} />
      <Route exact path="/orders" element={<MyOrders/>} />
      <Route exact path="/order/:id" element={<OrderDetails/>} />
      <Route exact path="/admin/dashboard" element={ isAuthenticated? <Dashboard/>:<LoginSignup/>} />
      <Route exact path="/admin/products" element={ isAuthenticated ?<ProductList/>:<LoginSignup/>} />
      <Route exact path="/admin/product" element={ isAuthenticated? <NewProduct/>:<LoginSignup/>} />
      <Route exact path="/admin/product/:id" element={isAuthenticated ?<UpdateProduct/>:<LoginSignup/>} />
      <Route exact path="/admin/orders" element={ isAuthenticated ? <OrderList/>:<LoginSignup/>} />
      <Route exact path="/admin/order/:id" element={isAuthenticated? <ProcessOrder/>:<LoginSignup/>} />
      <Route exact path="/admin/users" element={isAuthenticated? <UsersList/>:<LoginSignup/>} />
      <Route exact path="/admin/user/:id" element={isAuthenticated? <UpdateUser/>:<LoginSignup/>} />
      <Route exact path="/contact" element={<Contact/>} />
      <Route exact path="*" element={<PageNotFound/>} />
     </Routes>
    <Footer/>
   </BrowserRouter>
  );
}

export default App;
