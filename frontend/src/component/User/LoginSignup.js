import React, { useState ,useRef,useEffect} from 'react'
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch } from 'react-redux';
import Profile from '../../images/Profile.png'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { clearError,Login,Signup} from '../../actions/UserActions';
import './LoginSignup.css';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../Layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {

  const [searchParams] = useSearchParams();
  console.log(searchParams.get('redirect'))
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(Profile);
    const navigate=useNavigate()
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const dispatch=useDispatch()
    const alert=useAlert()
    const [signupuser, setUser] = useState({
        name: "",
        email: "",
        password: "",
      });
      const {loading,error,isAuthenticated,user}=useSelector((state)=>state.UserReducer)
      console.log(1)
      const { name, email, password } = signupuser;
      const redirect=searchParams.get('redirect')? `/${searchParams.get('redirect')}`:'/account'
      console.log(redirect)
      useEffect(()=>{
           if(error){
            alert.error(error.message)
            dispatch(clearError())
           }
           if(isAuthenticated){
             navigate(redirect)
           }
      },[error,user,redirect])
     
      const registerSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
       if(avatarPreview==Profile){
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
       }
       else{
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set('avatar',avatarPreview)
       }
      
     
       dispatch(Signup(myForm))
     
       
      };
      function loginSubmit(e){
        e.preventDefault();
           dispatch(Login(loginEmail,loginPassword))
      }
      function registerDataChange(e) {
        // console.log(e.target.files);
        
        if (e.target.name === "avatar") {
            const reader = new FileReader();
      
            reader.onload = () => {
              if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
              
              }
            };
          
            reader.readAsDataURL(e.target.files[0]);
          } else {
            setUser({ ...signupuser, [e.target.name]: e.target.value });
          }
    }
    const switchTabs = (e, tab) => {
        if (tab === "login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          registerTab.current.classList.remove("shiftToNeutralForm");
          loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          registerTab.current.classList.add("shiftToNeutralForm");
          loginTab.current.classList.add("shiftToLeft");
        }
      };
    

  return (
   
        <>
    {
       
       loading? <Loader/>: 
       <div className="LoginSignUpContainer">
       <div className="LoginSignUpBox">
         <div>
           <div className="login_signUp_toggle">
             <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
             <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
           </div>
           <button ref={switcherTab}></button>
         </div>
         <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
           <div className="loginEmail">
             <MailOutlineIcon />
             <input
               type="email"
               placeholder="Email"
               required
               value={loginEmail}
               onChange={(e) => setLoginEmail(e.target.value)}
             />
           </div>
           <div className="loginPassword">
             <LockOpenIcon />
             <input
               type="password"
               placeholder="Password"
               required
               value={loginPassword}
               onChange={(e) => setLoginPassword(e.target.value)}
             />
           </div>
           <Link to="/password/forgot">Forget Password ?</Link>
           <input type="submit" value="Login" className="loginBtn" />
         </form>
         <form
           className="signUpForm"
           ref={registerTab}
         
           onSubmit={registerSubmit}
           method='post'
           encType="multipart/form-data"
         >
           <div className="signUpName">
             <FaceIcon />
             <input
               type="text"
               placeholder="Name"
               required
               name="name"
               value={name}
               onChange={registerDataChange}
             />
           </div>
           <div className="signUpEmail">
             <MailOutlineIcon />
             <input
               type="email"
               placeholder="Email"
               required
               name="email"
               value={email}
               onChange={registerDataChange}
             />
           </div>
           <div className="signUpPassword">
             <LockOpenIcon />
             <input
               type="password"
               placeholder="Password"
               required
               name="password"
               value={password}
               onChange={registerDataChange}
             />
           </div>
   
           <div id="registerImage">
             <img src={avatarPreview} alt="Avatar Preview" />
             <input
               type="file"
               name="avatar"
               accept="image/*"
               onChange={registerDataChange}
             />
           </div>
           <input type="submit" value="Register" className="signUpBtn" />
         </form>
       </div>
     </div>
     
    }
    </>
  )
}

export default LoginSignup
