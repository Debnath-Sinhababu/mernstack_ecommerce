import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import Product from "../Home/Product";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { getProducts,clearError } from "../../actions/ProductAction";
import './products.css'
import { useParams } from "react-router";
import Pagination from "react-js-pagination";
import { Box, Slider, Typography } from "@material-ui/core";
const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [value, setValue] = useState([20, 50000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState('');
    const dispatch = useDispatch();
    const {keyword}=useParams()
  
    const {
        product,
        loading,
        error,
        productsCount,
        resultPerPage
      } = useSelector((state) => state.products);
    
      const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];
      
    const alert = useAlert();
    function setCurrentPageNo(e){
     
       setCurrentPage(e)
    }
    useEffect(() => {
        if (error) {
          alert.error(error.message);
          dispatch(clearError());
          return
        }
       console.log(currentPage)
        dispatch(getProducts(keyword,currentPage,value,category,ratings))
    
      }, [dispatch, alert, error,keyword,currentPage,value,category,ratings]);

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
  return (
    <div>
       {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {product &&
              product.map((obj) => (
                <Product key={product._id} product={obj} />
              ))}
          </div>
          <div className="filterBox">
          <Typography>Price</Typography>
          <Box sx={{ width: 300 }}>
      <Slider
       
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        min={20}
        step={10}
        max={50000}
      />
    </Box>
    <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

          </div>
          <div className="paginationBox">
            {
                resultPerPage<productsCount && <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            }
          
          </div>
          </Fragment>
      )
              }
    </div>
  )
}

export default Products
