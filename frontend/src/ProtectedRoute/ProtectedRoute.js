import React from 'react'
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";



const ProtectedRoute = ({children}) => {
    
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute
