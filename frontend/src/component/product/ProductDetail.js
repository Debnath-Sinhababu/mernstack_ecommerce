import React, { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { clearError, getProductDetail, newReview } from '../../actions/ProductAction'
import { useAlert } from 'react-alert';
import ReactStars from "react-rating-stars-component";
import top1 from '../../images/top2.jpg'
 import './style.css'
import ReviewCard from './ReviewCard'
import Loader from '../Layout/Loader/Loader'
import { addItemsToCart } from '../../actions/cartAction'
import { NEW_REVIEW_RESET } from '../../constants/productConstant'
import { Rating } from "@material-ui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [open,setOpen]=useState(false)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
       const dispatch=useDispatch()
       const alert=useAlert()
        const {loading,error,product}=useSelector((state)=>state.ProductDetail)
        const {user}=useSelector((state)=>state.UserReducer)
        const {error:reviewerror,success}=useSelector((state)=>state.newReview)
       const {id}=useParams()
      
    useEffect(()=>{
         if(error){
            alert.error(error.message)
            dispatch(clearError())
            return
         }
         if(reviewerror){
          alert.error(reviewerror.message)
          dispatch(clearError())
          return
         }
         if(success){
          alert.success('review created successfully')
          dispatch({type:NEW_REVIEW_RESET})
         }
       dispatch(getProductDetail(id))
    },[id,error,dispatch,reviewerror,success])

    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };
  
    const reviewSubmitHandler = () => {
      const myForm = new FormData();
  
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", id);
  
      dispatch(newReview(myForm));
  
      setOpen(false);
    };
    const increaseQuantity = () => {
      if (product.Stock <= quantity) return;
  
      const qty = quantity + 1;
      setQuantity(qty);
    };
     const addToCartHandler=()=>{
         if(user==null){
          alert.error('please login to add to cart')
          return
         }
        dispatch(addItemsToCart(product._id,quantity))
        alert.success('product added to cart')
     }
    const decreaseQuantity = () => {
      if (1 >= quantity) return;
  
      const qty = quantity - 1;
      setQuantity(qty);
    };
    const options = {
      size: "large",
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };
  return (
    <>
    {
        loading? <Loader/>:
        <>
        <div className='ProductDetails'>
     <div>
     <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
                 
              </Carousel>

     </div>
          <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options}/>
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity} >-</button>
                    <input  type="number" readOnly value={quantity} />
                    <button onClick={increaseQuantity} >+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                   onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button  className="submitReview"
              onClick={submitReviewToggle}
              >
                Submit Review
              </button>
              </div>
    </div>
    <h3 className="reviewsHeading">REVIEWS</h3>
    <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

    <div>
    {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
          </div>
        </>
    }
    
    </>
  )
}

export default ProductDetail
