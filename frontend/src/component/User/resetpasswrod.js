import React, { Fragment, useState, useEffect } from "react";
import "./resetpassword.css";

import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { clearError, resetPassword } from "../../actions/UserActions";
import { CLEAR_ERRORS } from "../../constants/productConstant";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate()
   const {token}=useParams()
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearError());
    }

    if (success) {
      alert.success("Password Updated Successfully");

     navigate('/login')
    }
  }, [dispatch, error, alert, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;