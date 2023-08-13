
import { LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_FAIL,SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_FAIL,LOAD_USER_REQUEST,LOAD_USER_FAIL,LOAD_USER_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_RESET, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, FORGOT_PASSWORD_RESET, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_RESET, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_RESET} from "../constants/userConstant"
import { CLEAR_ERRORS } from "../constants/productConstant"
import { DELETE_ORDER_FAIL } from "../constants/orderConstant"
export const UserReducer=(state={user:{},users:[]},action)=>{

    switch(action.type){
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
            case LOAD_USER_REQUEST:
        {
            return{
                ...state,
                loading:true,
                isAuthenticated: false,
            }
        }
        case LOGIN_SUCCESS:
            case SIGNUP_SUCCESS: 
            case LOAD_USER_SUCCESS: 
        {
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload,
                
                
            }
        }
        case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOAD_USER_FAIL:
        {
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
                
                
            }
        }
        case LOGOUT_FAIL:
      return {
       
        loading: false,
        isAuthenticated: true,
        error: action.payload,
      };
        case CLEAR_ERRORS:{
            return{
               ...state,
               error:null
            }
          }

        case GET_ALL_USERS_REQUEST:
          return {
            ...state,
              loading: true,
            }
          case GET_ALL_USERS_SUCCESS:
            return {
              ...state,
                loading: false,
                users: action.payload
            }
            case GET_ALL_USERS_FAIL:
              return {
              ...state,
                loading: false,
                error: action.payload
              } 
              case GET_ALL_USERS_RESET:
                return {
                ...state,
                  loading: false,
                  error: null,
                  users: null
                }   
        default:{
            return state
        }
    }

}
export const profileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_REQUEST:
      case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_PROFILE_SUCCESS:
      case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
          case UPDATE_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_PROFILE_RESET:
      case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST:
      case RESET_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
  
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
  
      case FORGOT_PASSWORD_FAIL:
      case RESET_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case FORGOT_PASSWORD_RESET:
            return {
              loading: false,
              message: null,
            };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
  
      case USER_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          success:action.payload.success
        };
  
      case DELETE_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          success:false
        };
  
      default:
        return state;
    }
  };