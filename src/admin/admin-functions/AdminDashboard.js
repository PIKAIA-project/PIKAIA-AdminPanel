import React, { useState, useEffect } from "react";
import * as MaterialLab from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./AdminDashboard.css";
import * as IoIcons from "react-icons/io";
import axios from "axios";
import { AiFillDatabase } from "react-icons/ai";
import { NavLink } from "react-router-dom";

{
  /* <IoIcons.IoIosSettings />;
<IoIcons.IoIosMusicalNotes />
<AiFillDatabase />

<TiWorld.TiWorld /> */
}

const AdminDashboard = () => {
  useEffect(() => {
    adminDashboardInfoAPI();
  }, []);

  const [openAlert, setOpenAlert] = useState(false); // alert dialog
  const [adminInfoIsLoading, setAdminInfoIsLoading] = useState(true);
  const [adminInfoOverview, setAdminInfoOverview] = useState({
    totalAdminUsers: "N/A",
    totalNormalUsers: "N/A",
    totalBinauralSongs: "N/A",
    totalNormalSongs: "N/A",
  });

  const adminDashboardInfoAPI = async () => {
    let adminDashInfo = [];
    var key = "1a55d8e0ffa94fc7988a1fc24deb69b0";
    let token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwdWJsaWNfaWQiOiJiNzQ5YTRjOS0wMWY0LTRjYzgtYjM4Ny0zMzFmNzE3NDQzMWQiLCJleHAiOjE2MTg4NTAxNDd9.9n7RvdnVHPbKyw6yPOOvf7iVQU_ZXh2PB_MYn8ZjFEY";
    try {
      let axiosConfig = {
        headers: {
          "x-access-token": token,
          "Ocp-Apim-Subscription-Key": key, //the token is a variable which holds the token
        },
      };

      const data = await axios.get(
        "https://pikaia-apim.azure-api.net/user?=",
        axiosConfig
      );

      if (data.data["users"]) {
        adminDashInfo = data.data["users"];
        onDataFetchSuccess(adminDashInfo);
      } else {
        onDataFetchFail();
      }
    } catch (err) {
      onDataFetchFail();
    }
  };

  const onDataFetchSuccess = (adminDashInfo) => {
    let totalAdminUsers = 0;
    let totalNormalUsers = 0;
    adminDashInfo.map((user, index, users) => {
      if (user["admin"]) {
        totalAdminUsers++;
      }
      if (!user["admin"]) {
        totalNormalUsers++;
      }
    });
    // setting admin info state
    setAdminInfoOverview((prevState) => ({
      ...prevState,
      ["totalAdminUsers"]: totalAdminUsers,
      ["totalNormalUsers"]: totalNormalUsers,
    }));
    setAdminInfoIsLoading(false);
  };

  const onDataFetchFail = () => {
    setOpenAlert(true);
  };

  return (
    <div className="admin-dash">
      <div className="admin-info">
        <h1>Welcome to the Admin Dashboard!</h1>
        <br />
        <h2>Here You can control the Project PIKAIA Application</h2>
        <br />
        {adminInfoIsLoading ? (
          <LoadingSkeleton />
        ) : (
          <div>
            <table>
              <tr>
                <td>Total Admin Users :</td>
                <td style={{ paddingLeft: "30px" }}>
                  {adminInfoOverview["totalAdminUsers"]}
                </td>
              </tr>
              <tr>
                <td>Total Normal Users :</td>
                <td style={{ paddingLeft: "30px" }}>
                  {adminInfoOverview["totalNormalUsers"]}
                </td>
              </tr>
              <tr>
                <td>Total Binaural Songs :</td>
                <td style={{ paddingLeft: "30px" }}>
                  {adminInfoOverview["totalBinauralSongs"]}
                </td>
              </tr>
              <tr>
                <td>Total Normal Songs :</td>
                <td style={{ paddingLeft: "30px" }}>
                  {adminInfoOverview["totalNormalSongs"]}
                </td>
              </tr>
            </table>
          </div>
        )}
      </div>
      <div className="admin-dash-body">
        <div className="dash-item dash-item1">
          {adminInfoIsLoading ? (
            <LoadingCircle />
          ) : (
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to="/admin/account-management"
              className="dash-item-inner-flex"
            >
              <p>User Account Management</p>
              <IoIcons.IoIosPeople
                style={{ color: "white", fontSize: "65px" }}
              />
            </NavLink>
          )}
        </div>
        <div className="dash-item dash-item2">
          {adminInfoIsLoading ? (
            <LoadingCircle />
          ) : (
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to="/admin/data-management"
              className="dash-item-inner-flex"
            >
              <p>User Data Management</p>
              <AiFillDatabase style={{ color: "white", fontSize: "60px" }} />
            </NavLink>
          )}
        </div>
        <div className="dash-item dash-item3">
          {adminInfoIsLoading ? (
            <LoadingCircle />
          ) : (
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to="/admin/content-management"
              className="dash-item-inner-flex"
            >
              <p>Content Management</p>
              <IoIcons.IoIosMusicalNotes
                style={{ color: "white", fontSize: "60px" }}
              />
            </NavLink>
          )}
        </div>
        <div className="dash-item dash-item4">
          {adminInfoIsLoading ? (
            <LoadingCircle />
          ) : (
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to="/admin/settings"
              className="dash-item-inner-flex"
            >
              <p>Your Settings</p>
              <IoIcons.IoIosSettings
                style={{ color: "white", fontSize: "60px" }}
              />
            </NavLink>
          )}
        </div>
      </div>
      <Dialog
        open={openAlert}
        onClose={() => {
          setOpenAlert(false);
        }}
      >
        <DialogTitle>{"Data Fetch Failed"}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenAlert(false);
            }}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const LoadingCircle = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress style={{ color: "white" }} />
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div>
      <MaterialLab.Skeleton width={200} animation="wave" />
      <MaterialLab.Skeleton width={200} animation="wave" />
      <MaterialLab.Skeleton width={200} animation="wave" />
    </div>
  );
};

export default AdminDashboard;
