import API from '../services/API'
import { LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_FAIL,SIGNUP_REQUEST,SIGNUP_FAIL,SIGNUP_SUCCESS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL} from "../constants/userConstant"
import { CLEAR_ERRORS } from "../constants/productConstant"
export const Login=(email,password)=>async(dispatch)=>{
         dispatch({
            type:'LOGIN_REQUEST'
         })
    try {
        const {data}=await API.post('/auth/login',{
             email,
             password
        },{
            headers:{ 'Content-Type': 'application/json'}
        })
        console.log(data)
        dispatch({
            type:'LOGIN_SUCCESS',
            payload:data.user
         })

    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data
        })
    }
}


export const Signup=(formdata)=>async(dispatch)=>{
    dispatch({
        type:'SIGNUP_REQUEST'
     })
try {
       console.log(formdata)
    
    const {data}=await API.post('/auth/register',formdata,{
        headers:{ 'Content-Type': 'multipart/form-data'}
    })
    console.log(data)
    dispatch({
        type:'SIGNUP_SUCCESS',
        payload:data.user
     })

} catch (error) {
    dispatch({
        type:SIGNUP_FAIL,
        payload:error.response.data
    })
}
}
export const clearError= ()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS,

    })
}
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await API.get(`/auth/me`);
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        console.log(error)
   
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data });
    }
  };

  export const logout = () => async (dispatch) => {
    try {
      await API.get(`/auth/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data });
    }
  };

  export const updateProfile = (userData) => async (dispatch) => {
      
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await API.put(`/auth/updateprofile`, userData, config);
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data,
      });
    }
  };


   export const updatePassword = (userData) => async (dispatch) => {
      
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
          console.log(userData)
      const { data } = await API.put(`/auth/updatepassword`, userData, config);
  
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data,
      });
    }
  };

  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await API.post(`/auth/forgot-password`, email, config);
  
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data,
      });
    }
  };


  export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await API.put(
        `/password/reset/${token}`,
        passwords,
        config
      );
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        console.log(error.response.data)
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data,
      });
    }
  };
  
  export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_USERS_REQUEST });
  
      const { data } = await API.get(`/admin/users`);
  
      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        console.log(error)
   
      dispatch({ type: GET_ALL_USERS_FAIL, payload: error.response.data });
    }
  };

  export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await API.get(`/admin/user/${id}`);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data });
    }
  };
  
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await API.put(
        `/admin/user/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data,
      });
    }
  };

  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const { data } = await API.delete(`/admin/user/${id}`);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data,
      });
    }
  };