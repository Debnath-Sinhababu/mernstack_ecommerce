import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import './Home.css'
import { useNavigate } from 'react-router-dom';
const Product = ({product}) => {
      const navigate=useNavigate()
    const options={
        edit:false,
        color:'rgb(20,20,20,0.1)',
        activeColor:'tomato',
        size:25,
        value:product.ratings,
        isHalf:true
    }
  return (
    <div className='productCard' onClick={()=>{
         navigate(`/product/${product._id}`)
    }}>
      <img src={product.images[0]?.url} alt={product.name}/>
      <p>{product.name}</p>
      <div>
      <ReactStars {...options}/>
      <span>{product.numOfReviews}</span>
      </div>
      <span>{product.price}</span>
    </div>
  )
}

export default Product
