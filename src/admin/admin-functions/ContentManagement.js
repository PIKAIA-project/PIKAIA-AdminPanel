import Reactj, { useState } from "react";
import "./ContentManagement.css";

import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import DropDown from "../dropdown/Dropdown";
import { getToken, getApiURL } from "../../utils";

const ContentManagement = () => {
  const [music, setMusic] = useState({
    binauralSongs: [],
    normalSongs: [],
  });
  const [normalUserListLoading, setNormalUserListLoading] = useState(true);
  const [adminUserListLoading, setAdminUserListLoading] = useState(true);

  const getAllUsersAPI = async () => {
    // let allUsers = [];
    // var key = "1a55d8e0ffa94fc7988a1fc24deb69b0";
    // let token = getToken();
    // try {
    //   let axiosConfig = {
    //     headers: {
    //       "x-access-token": token,
    //       "Ocp-Apim-Subscription-Key": key, //the token is a variable which holds the token
    //     },
    //   };
    //   const data = await axios.get(getApiURL() + "/user?=", axiosConfig);
    //   if (data.data["users"]) {
    //     // setUsers((prevState) => ({
    //     //   ...prevState,
    //     //   ["allUsers"]: data.data["users"],
    //     // }));
    //     allUsers = data.data["users"];
    //     let normalUsers = [];
    //     let adminUsers = [];
    //     allUsers.map((user) => {
    //       if (user["admin"] === true) {
    //         adminUsers.push(user);
    //       }
    //       if (user["admin"] === false) {
    //         normalUsers.push(user);
    //       }
    //     });
    //     console.log(allUsers);
    //     setUsers((prevState) => ({
    //       ...prevState,
    //       ["allUsers"]: allUsers,
    //       ["normalUsers"]: normalUsers,
    //       ["adminUsers"]: adminUsers,
    //     }));
    //     // set loadings to false
    //     setTimeout(() => {
    //       setNormalUserListLoading(false);
    //       setAdminUserListLoading(false);
    //     }, 2000);
    //   } else {
    //     alert("failed to fetch");
    //     // failed to fetch
    //   }
    // } catch (err) {
    //   // failed to fetch
    //   alert(err);
    // }
  };

  const DeleteNormalMusic = () => {
    const handleNormalMusicDelete = (public_id) => {
      alert(public_id);
    };

    return (
      <div className="delete-user-wrapper">
        <div className="delete-user-confirm-box">
          <label
            className="delete-user-confirm-box-label"
            htmlFor="confirm-normal-deletion"
          >
            Type 'Confirm Deletion':
          </label>
          <input
            className="delete-user-confirm-box-input"
            type="text"
            name="confirm-normal-deletion"
            id="confirm-normal-deletion"
            placeholder="Confirm Deletion"
          />
        </div>
        <div className="admin-user-table">
          <div className="admin-user-table-body">
            {music["normalSongs"].map((song, index) => {
              return (
                <div className="user-li" id={index}>
                  <span className="user-name">{song["name"]}</span>
                  <span className="user-id">{song["id"]}</span>
                  <button className="user-del-btn">Delete Song</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const CreateAdminUserComponent = () => {
    const handleAdminUserCreate = (username, password) => {
      alert("new user" + username + " " + password);
    };

    return (
      <div className="delete-user-wrapper">
        <div className="admin-user-creation-body">
          <div className="admin-input-couple">
            <label
              className="create-admin-label"
              htmlFor="confirm-admin-creation-username"
            >
              New Admin Username:
            </label>
            <input
              className="create-admin-input"
              type="text"
              name="confirm-admin-creation-username"
              id="confirm-admin-creation-username"
              placeholder="ex: JonDoe"
            />
          </div>
          <div className="admin-input-couple">
            <label
              className="create-admin-label"
              htmlFor="confirm-admin-creation-password"
            >
              New Admin Password:
            </label>
            <input
              className="create-admin-input"
              type="text"
              name="confirm-admin-creation-password"
              id="confirm-admin-creation-password"
              placeholder="ex: 12345"
            />
          </div>
          <button className="user-create-btn">Create New Admin</button>
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

  return (
    <div className="admin-cont-man">
      <div className="admin-cont-man-body">
        <h1>Music Management</h1>
        <DropDown
          title={"Delete Normal Users"}
          item={
            normalUserListLoading ? <LoadingCircle /> : <DeleteNormalMusic />
          }
          action="Manage"
        />
        <DropDown
          title={"Delete Normal Users"}
          item={<CreateAdminUserComponent />}
          action="Manage"
        />
        <br />
        <br />
        <h1>Binarual Management</h1>
      </div>
    </div>
  );
};

export default ContentManagement;
