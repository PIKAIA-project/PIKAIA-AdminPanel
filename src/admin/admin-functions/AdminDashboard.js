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
import { NavLink, useHistory } from "react-router-dom";
import {
  logOutUser,
  getToken,
  getApiURL,
  getSubscriptionKey,
} from "../../utils";

const AdminDashboard = () => {
  let history = useHistory();
  useEffect(() => {
    adminDashboardUserInfoAPI();
    adminDashboardMusicInfoAPI();
  }, []);

  const logOutAdmin = () => {
    logOutUser();
    window.location.href = "/login";
  };

  const [openAlert, setOpenAlert] = useState(false); // alert dialog
  const [adminInfoIsLoading, setAdminInfoIsLoading] = useState(true);
  const [adminInfoOverview, setAdminInfoOverview] = useState({
    totalAdminUsers: "N/A",
    totalNormalUsers: "N/A",
    totalBinauralSongs: "N/A",
    totalNormalSongs: "N/A",
  });

  const adminDashboardMusicInfoAPI = async () => {
    let beatsInfo = [];
    let musicInfo = [];
    var key = getSubscriptionKey();
    let token = getToken();

    try {
      let axiosConfig = {
        headers: {
          "x-access-token": token,
          "Ocp-Apim-Subscription-Key": key, //the token is a variable which holds the token
        },
      };

      const musicData = await axios.get(
        getApiURL() + "/all-songs",
        axiosConfig
      );

      const binauralData = await axios.get(
        getApiURL() + "/all-beats",
        axiosConfig
      );

      if (musicData.data["songs"] || binauralData.data["beats"]) {
        beatsInfo = binauralData.data["beats"];
        musicInfo = musicData.data["songs"];
        onMusicInfoFetchSuccess(beatsInfo, musicInfo);
      } else {
        onMusicDataFetchFail();
      }
    } catch (err) {
      onMusicDataFetchFail();
    }
  };

  const onMusicInfoFetchSuccess = (beatsInfo, musicInfo) => {
    if (beatsInfo.length !== 0) {
      setAdminInfoOverview((prevState) => ({
        ...prevState,
        ["totalBinauralSongs"]: beatsInfo.length,
      }));
    }
    if (musicInfo.length !== 0) {
      setAdminInfoOverview((prevState) => ({
        ...prevState,
        ["totalNormalSongs"]: musicInfo.length,
      }));
    }
    setAdminInfoIsLoading(false);
  };

  const onMusicDataFetchFail = () => {};

  const adminDashboardUserInfoAPI = async () => {
    let adminDashInfo = [];
    var key = getSubscriptionKey();
    let token = getToken();

    try {
      let axiosConfig = {
        headers: {
          "x-access-token": token,
          "Ocp-Apim-Subscription-Key": key, //the token is a variable which holds the token
        },
      };

      const data = await axios.get(getApiURL() + "/user?=", axiosConfig);

      if (data.data["users"]) {
        adminDashInfo = data.data["users"];
        onUserDataFetchSuccess(adminDashInfo);
      } else {
        onUserDataFetchFail();
      }
    } catch (err) {
      onUserDataFetchFail();
    }
  };

  const onUserDataFetchSuccess = (adminDashInfo) => {
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

  const onUserDataFetchFail = () => {
    // setOpenAlert(true);
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
              <tbody>
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
              </tbody>
            </table>
          </div>
        )}
        <br />
        <button
          className="admin-logout"
          variant="contained"
          onClick={logOutAdmin}
        >
          LogOut
        </button>
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
