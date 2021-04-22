import React, { useState, useEffect } from "react";
import "./Settings.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getToken, getApiURL, logOutUser } from "../../utils";

const Settings = () => {
  // state for UI
  const [canDelete, setCanDelete] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(true);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [confirmDelete, setConfirmDelete] = useState("");
  // API request UI
  const [selfDataRequestUsername, setSelfDataRequestUsername] = useState(
    "Thoshitha"
  );
  const [users, setUsers] = useState([]);

  const getSelfAPI = async () => {
    let user = [];
    const key = "1a55d8e0ffa94fc7988a1fc24deb69b0";
    const token = getToken();

    try {
      // alert("get self try");
      let axiosConfig = {
        headers: {
          "x-access-token": token,
          "Ocp-Apim-Subscription-Key": key, //the token is a variable which holds the token
        },
      };

      const data = await axios.get(
        getApiURL() + "/get-current-user-info",
        axiosConfig
      );

      if (data.data["user"]) {
        user = data.data["user"];
        setSelfDataRequestUsername(user["name"]);
      }
    } catch (err) {}
  };

  const getAllUsersApi = async () => {
    let allUsers = [];
    let adminUsers = [];
    const key = "1a55d8e0ffa94fc7988a1fc24deb69b0";
    const token = getToken();

    try {
      let axiosConfig = {
        headers: {
          "x-access-token": token,
          "Ocp-Apim-Subscription-Key": key, //the token is a variable which holds the token
        },
      };

      const data = await axios.get(getApiURL() + "/user?=", axiosConfig);
      if (data.data["users"]) {
        allUsers = data.data["users"];
        allUsers.map((user) => {
          if (user["admin"] === true) {
            adminUsers.push(user);
          }
        });
        // check if only 1 admin user is there
        if (adminUsers.length === 1) {
          setDeleteIsLoading(false);
          setCanDelete(false);
        } else {
          setDeleteIsLoading(false);
          setCanDelete(true);
        }
      } else {
        setTimeout(() => {
          setDeleteIsLoading(false);
        }, 2000);
      }
    } catch (err) {
      alert("fail");
    }
  };

  useEffect(() => {
    getSelfAPI();
    getAllUsersApi();
  }, []);

  function changeLogInData(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function changeConfirmDelete(e) {
    setConfirmDelete(e.target.value);
  }

  const deleteSelfAPI = async () => {
    alert("inside delete self api");
    let response = [];
    const key = "1a55d8e0ffa94fc7988a1fc24deb69b0";
    const token = getToken();

    try {
      let axiosConfig = {
        headers: {
          "x-access-token": token,
          "Ocp-Apim-Subscription-Key": key, //the token is a variable which holds the token
        },
      };
      alert("inside post request");
      const data = axios.delete(getApiURL() + "/delete-self", {
        headers: {
          "x-access-token": token,
          "Ocp-Apim-Subscription-Key": key,
        },
        data: {
          username: "Admin7",
          password: "12345",
        },
      });

      // const data = await axios.delete(
      //   getApiURL() + "/delete-self",
      //   axiosConfig
      // );

      // const data = axios.delete(
      //   getApiURL() + "/delete-self",
      //   {
      //     username: "Admin4",
      //     password: "12345",
      //   },
      //   axiosConfig
      // );
    } catch (err) {
      console.log(err);
      alert("err");
    }
  };

  function onDeleteRequest() {
    // user is allowed to delete
    if (confirmDelete === "Confirm Admin Account Deletion") {
      if (loginData.username === "" || loginData.password === "") {
        alert("username and password must be filled out");
      } else {
        // process delete
        alert("called delete self api");
        deleteSelfAPI();
        // TODO: test this
        logOutUser();
        window.location.href = "/login";
      }
    } else {
      alert("You must type the correct confirmation text in the confirm box");
    }
  }

  return (
    <div className="delete-user-wrapper admin-settings">
      <h1>Delete Account</h1>
      <br />
      {deleteIsLoading ? (
        <LoadingCircle />
      ) : (
        <div>
          {canDelete ? (
            <div>
              <div className="delete-user-confirm-box account-delete-confirm">
                <label className="delete-account-lbl create-user-confirm-box-label">
                  Type 'Confirm Admin Account Deletion':
                </label>
                <input
                  className="delete-account-lbl delete-user-confirm-box-input"
                  type="text"
                  placeholder="Confirm Admin Account Deletion"
                  value={confirmDelete}
                  onChange={changeConfirmDelete}
                />
              </div>
              <div className="admin-user-creation-body">
                <div className="admin-input-couple">
                  <label className="create-admin-label">Username:</label>
                  <input
                    className="create-admin-input"
                    type="text"
                    name="username"
                    placeholder="ex: JonDoe"
                    value={loginData.username}
                    onChange={changeLogInData}
                  />
                </div>
                <div className="admin-input-couple">
                  <label className="create-admin-label">Password:</label>
                  <input
                    className="create-admin-input"
                    type="text"
                    name="password"
                    placeholder="ex: 12345"
                    value={loginData.password}
                    onChange={changeLogInData}
                  />
                </div>
                <button onClick={onDeleteRequest} className="user-create-btn">
                  Delete Account
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Account Deletion Currently Unavailable.</h2>
              <br />
              <h3>
                This might occur if you are the final admin of the application
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const LoadingCircle = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress style={{ color: "black" }} />
    </div>
  );
};

export default Settings;

/*

 

*/
