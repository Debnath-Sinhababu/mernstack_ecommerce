import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";

import { useNavigate } from "react-router-dom";
import { CLEAR_ERRORS, DELETE_PRODUCT_RESET } from "../../constants/productConstant";
import { clearError } from "../../actions/ProductAction";
import { getAdminProduct } from "../../actions/ProductAction";
import MetaData from "../Layout/MetaData";
import { deleteProduct } from "../../actions/ProductAction";
const ProductList = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { loading, success,error:deleteerror } = useSelector((state) => state.deleteProduct);


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
     dispatch({type:DELETE_PRODUCT_RESET})
   }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error,deleteerror,success]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
            onClick={()=>{
                dispatch(deleteProduct(params.getValue(params.id, "id")))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;