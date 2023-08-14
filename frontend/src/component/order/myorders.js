import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myorders.css";
import { useSelector, useDispatch } from "react-redux";
import { myOrders,clearError } from "../../actions/orderAction";
import Loader from '../Layout/Loader/Loader'
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../Layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";


const MyOrders=()=>{
    const dispatch = useDispatch();

  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.UserReducer);
  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearError());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName:(params)=>{
        return params.value=='delhivered'?'greencolor':'redcolor'
         
      }
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
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
      renderCell: (params) =>{
        console.log(params.row.id)
      return <Link to={`/order/${params.row.id}`}>
           <LaunchIcon/>
      </Link>
      }
  },
    
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

    return (
        <Fragment>
          <MetaData title={`${user?.name} - Orders`} />
    
          {loading ? (
            <Loader />
          ) : (
            <div className="myOrdersPage">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight
               
              />
    
              <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
            </div>
          )}
        </Fragment>
      );
}
export default MyOrders