import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const CartItemCard = ({ item,deleteCartItems }) => {
  const dispatch=useDispatch()
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => dispatch(deleteCartItems(item.product))}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;