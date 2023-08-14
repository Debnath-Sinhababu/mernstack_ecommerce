import axios from 'axios'
import API from '../services/API'
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL, CLEAR_ERRORS, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL } from "../constants/productConstant"
import { PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS } from '../constants/productConstant'
export const getProducts=(keyword='',page='',price=[10,50000],category='',ratings='')=> async(dispatch)=>{
     try {
    
     dispatch({type:ALL_PRODUCT_REQUEST})
           
      const {data}=  await API.get(`/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings=${ratings}`)
      console.log(data)
      dispatch({
        type:ALL_PRODUCT_SUCCESS,
        payload:data
      })

     } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data
        })
     }
}

export const getProductDetail=(id)=> async(dispatch)=>{
    try {
   
    dispatch({type:PRODUCT_DETAILS_REQUEST})   
     const {data}= await API.get(`/products/${id}`)
     console.log(data)
     dispatch({
       type:PRODUCT_DETAILS_SUCCESS,
       payload:data.product
     })

    } catch (error) {
       dispatch({
           type:PRODUCT_DETAILS_FAIL,
           payload:error.response.data
       })
    }
}


export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await API.put(`/review`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data,
      });
    }
  };


  export const getAdminProduct = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });
  
      const { data } = await API.get("/admin/products");
  
      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload: error.response.data,
      });
    }
  };

  export const createProduct = (productData) => async (dispatch) => {
    console.log(productData)
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type":"multipart/form-data" },
      };
  
      const { data } = await API.post(
        `/admin/products/new`,
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data,
      });
    }
  };

  export const deleteProduct=(id)=> async(dispatch)=>{
    try {
   
    dispatch({type:DELETE_PRODUCT_REQUEST})   
     const {data}= await API.delete(`admin/products/${id}`)
     console.log(data)
     dispatch({
       type:DELETE_PRODUCT_SUCCESS,
       payload:data.success
     })

    } catch (error) {
      
       dispatch({
           type:DELETE_PRODUCT_FAIL,
           payload:error.response.data
       })
    }
}


export const updateProduct=(id,formdata)=> async(dispatch)=>{
  try {
 
  dispatch({type:UPDATE_PRODUCT_REQUEST})   
   const {data}= await API.put(`admin/products/${id}`,formdata,{
    headers:{
      "Content-Type":"application/json" ,
    }
   })
   console.log(data)
   dispatch({
     type:UPDATE_PRODUCT_SUCCESS,
     payload:data.success
   })

  } catch (error) {
     dispatch({
         type:UPDATE_PRODUCT_FAIL,
         payload:error.response.data
     })
  }
}

export const clearError= ()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS,

    })
}