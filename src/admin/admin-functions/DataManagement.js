import React, { useEffect, useState } from "react";
import "./AccountManagement.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

import DropDown from "../dropdown/Dropdown";

import { getToken, getApiURL, getSubscriptionKey } from "../../utils";
import "./DataManagement.css";

const DataManagement = () => {
  const [users, setUsers] = useState({
    allUsers: [],
    adminUsers: [],
    normalUsers: [],
  });
  const [openAlert, setOpenAlert] = useState(false); // alert dialog
  const [normalUserListLoading, setNormalUserListLoading] = useState(true);
  const [adminUserListLoading, setAdminUserListLoading] = useState(true);

  const getAllUsersAPI = async () => {
    let allUsers = [];
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
        // setUsers((prevState) => ({
        //   ...prevState,
        //   ["allUsers"]: data.data["users"],
        // }));
        allUsers = data.data["users"];
        let normalUsers = [];
        let adminUsers = [];
        allUsers.map((user) => {
          if (user["admin"] === true) {
            adminUsers.push(user);
          }
          if (user["admin"] === false) {
            normalUsers.push(user);
          }
        });

        console.log(allUsers);

        setUsers((prevState) => ({
          ...prevState,
          ["allUsers"]: allUsers,
          ["normalUsers"]: normalUsers,
          ["adminUsers"]: adminUsers,
        }));
        // set loadings to false
        setTimeout(() => {
          setNormalUserListLoading(false);
          setAdminUserListLoading(false);
        }, 2000);
      } else {
        alert("failed to fetch");
        // failed to fetch
      }
    } catch (err) {
      // failed to fetch
      alert(err);
    }
  };

  useEffect(() => {
    getAllUsersAPI();
  }, []);

  const DeleteNormalUserComponent = () => {
    async function deleteUserDataAPI(public_id) {
      let response = [];
      const key = getSubscriptionKey();
      const token = getToken();

      try {
        let axiosConfig = {
          "x-access-token": token,
          "Ocp-Apim-Subscription-Key": key,
        };

        const url = getApiURL() + "chat/" + public_id;

        // await axios.delete(url, {
        //   headers: {
        //     axiosConfig,
        //   },
        // });
        axios.delete(url, {
          headers: {
            "x-access-token": token,
            "Ocp-Apim-Subscription-Key": key,
          },
        });
        alert(
          "Successfully deleted all chats of user with public ID: " + public_id
        );
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <div className="delete-user-wrapper">
        <div className="admin-user-table">
          <div className="admin-user-table-body">
            {users["normalUsers"].map((user, index) => {
              return (
                <div className="user-li" id={index}>
                  <span className="user-name">{user["name"]}</span>
                  <span className="user-id">{user["public_id"]}</span>
                  <button
                    className="user-del-btn"
                    onClick={() => deleteUserDataAPI(user["public_id"])}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-cont-man">
      <div className="admin-cont-man-body">
        <h1>Normal User Data Management</h1>
        <DropDown
          title={"Delete Normal User's Data"}
          item={
            normalUserListLoading ? (
              <LoadingCircle />
            ) : (
              <DeleteNormalUserComponent />
            )
          }
          action="Manage"
        />
      </div>
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
      <CircularProgress style={{ color: "black" }} />
    </div>
  );
};
export default DataManagement;
