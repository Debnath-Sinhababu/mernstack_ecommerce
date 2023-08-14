import React from 'react'
import { CgMouse } from "react-icons/cg";
import './Home.css';
import Product from './Product';
import Top from '../../images/top1.jpg';
import MetaData from '../Layout/MetaData';
import { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { clearError, getProducts } from '../../actions/ProductAction';
import Loader from '../Layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
const Home = () => {
      const alert=useAlert()

      const {loading,error,product,productsCount}=useSelector((state)=>state.products)
  const dispatch=useDispatch()
  const {isAuthenticated,user}=useSelector((state)=>state.UserReducer)
     console.log(product)
  useEffect(()=>{
       if(error){
        alert.error(error.message)
         dispatch(clearError())
       }
     dispatch(getProducts())
  },[dispatch,error])


  return (
    <div>
    {
        loading? <Loader/>:
        <>
        <MetaData title='Home page is working'/>
    <div className='banner'>
      <p>welcome to ecommerce</p>
      <h1>Find Amazing Products below</h1>
      <a href='#container'>
        <button>
          Scroll <CgMouse />  
        </button>
      </a>
    </div>
    <h2 className="homeHeading">Featured Products</h2>
      <div className='container' id='container'>
        {
          product &&  product.map((obj)=>(
               <Product product={obj} key={obj._id}/>
            ))
        }
      </div>
      <Link to='/products' style={{textDecoration:'none'}}>
      <h2 className='homeHeading'>View All Products</h2>
      </Link>
      
        </>
    }
     
    </div>
  )
}

export default Home
