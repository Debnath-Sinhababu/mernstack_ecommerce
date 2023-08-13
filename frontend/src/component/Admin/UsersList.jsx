import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


import { useNavigate } from "react-router-dom";

import MetaData from "../Layout/MetaData";
import { clearError, deleteUser, getAllUsers } from "../../actions/UserActions";
import Sidebar from "./Sidebar";
const UsersList = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.UserReducer);
  
  const { loading, success,error:deleteerror } = useSelector((state) => state.deleteUser);


  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearError());
    }

   if(deleteerror) {
    alert.error(deleteerror.message)
    dispatch(clearError())
   }
   if(success){
    alert.success('deleted successfully')
    dispatch(clearError())
   }

    dispatch(getAllUsers())
  }, [dispatch, alert, error,deleteerror,success]);

  const columns = [
    { field: "id", headerName: "UserId", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 0.8,
    },
    {
      field: "email",
      headerName: "email",
      type: "string",
      minWidth: 150,
      flex: 0.6,
    },

    {
      field: "Role",
      headerName: "Role",
      type: "string",
      minWidth: 270,
      flex: 0.5,
      cellClassName: (params) => {
      
        return params.getValue(params.id, "Role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
            onClick={()=>{
                dispatch(deleteUser(params.getValue(params.id, "id")))
            }}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email:item.email,
        Role: item.role,
       
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;