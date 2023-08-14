import { Backdrop, Box } from '@material-ui/core'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import React from 'react'
import { useState } from 'react'
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import { useNavigate } from 'react-router';
import { logout } from '../../../actions/UserActions';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import './Header.css'
import profile from '../../../images/Profile.png'
import { useSelector } from 'react-redux';
const UserOptions = ({user}) => {
    const [open,setopen]=useState(false)
    const { cartItems } = useSelector((state) => state.cart);
    const alert=useAlert()
    const navigate=useNavigate()
    const dispatch=useDispatch()
      function orders(){
         navigate('/orders')
      }
      function account(){
         navigate('/account')
      }
      function logoutUser(){
         
        dispatch(logout());
    alert.success("Logout Successfully");
    navigate('/login')
      }
      function dashboard(){
        navigate('/admin/dashboard')
      }
      function cart() {
        navigate("/cart");
      }
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        {
          icon: (
            <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];
    
      if (user?.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }
  return (
    <Box>
         <Backdrop open={open} style={{ zIndex: "10" }} />
    <SpeedDial
      ariaLabel="SpeedDial controlled open example"
      style={{ zIndex: "11" }}
      onClose={()=>{
        setopen(false)
      }}
      onOpen={()=>{
        setopen(true)
      }}
      direction="down"
      className="speedDial"
      open={open}
      icon={
        <img
        className="speedDialIcon"
        src={user?.avatar?.url}
        alt="Profile"
      />
      }
    >
        {options.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      
    </SpeedDial>
  </Box>
  )
}

export default UserOptions
