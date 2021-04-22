import React, { useEffect, useState } from "react";
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
  const [textValue, setTextValue] = useState({
    song_name: "",
    song_link: "",
    song_author: "",
    song_cover: "",
  });
  const getAllSongAPI = async () => {
    let allSongs = [];
    let allBeats = [];
    var key = "1a55d8e0ffa94fc7988a1fc24deb69b0";
    let token = getToken();
    try {
      let axiosConfig = {
        headers: {
          "x-access-token": token,
          "Ocp-Apim-Subscription-Key": key, //the token is a variable which holds the token
        },
      };

      let songURL = getApiURL() + "all-songs";
      let binauralURL = getApiURL() + "all-beats";
      const songData = await axios.get(songURL, axiosConfig);
      const beatsData = await axios.get(binauralURL, axiosConfig);
      // const data = await axios.all([songURL, binauralURL]);

      if (songData && beatsData) {
        allSongs = songData.data["songs"];
        allBeats = beatsData.data["beats"];
        console.log(allSongs);
        setMusic((prevState) => ({
          ...prevState,
          ["normalSongs"]: allSongs,
          ["binauralSongs"]: allBeats,
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
    getAllSongAPI();
  }, []);

  function changeLogInData(e) {
    setTextValue({ ...textValue, [e.target.name]: e.target.value });
  }

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
                  <button
                    className="user-del-btn"
                    onClick={() => handleNormalMusicDelete(song["id"])}
                  >
                    Delete Song
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const CreateAdminSongComponent = () => {
    const handleAdminSongCreate = (song_name) => {
      alert("new song: " + song_name);
    };

    return (
      <div className="delete-user-wrapper">
        <div className="admin-user-creation-body">
          <div className="admin-input-couple">
            <label className="create-admin-label" htmlFor="song_name">
              New song name:
            </label>
            <input
              className="create-admin-input"
              type="text"
              name="song_name"
              id="confirm-admin-song-name"
              placeholder="ex: Song"
              value={textValue.song_name}
              onChange={changeLogInData}
            />
          </div>
          <div className="admin-input-couple">
            <label className="create-admin-label" htmlFor="song_link">
              New song link:
            </label>
            <input
              className="create-admin-input"
              type="text"
              name="song_link"
              id="confirm-admin-song-link"
              placeholder="ex: https://mp3.chillhop.com/serve.php/?mp3=9222"
              value={textValue.song_link}
              onChange={changeLogInData}
            />
          </div>
          <div className="admin-input-couple">
            <label className="create-admin-label" htmlFor="song_author">
              New song author:
            </label>
            <input
              className="create-admin-input"
              type="text"
              name="confirm-admin-creation-password"
              id="song_author"
              placeholder="ex: Swørn"
              value={textValue.song_author}
              onChange={changeLogInData}
            />
          </div>
          <div className="admin-input-couple">
            <label className="create-admin-label" htmlFor="song_cover">
              New song cover:
            </label>
            <input
              className="create-admin-input"
              type="text"
              name="confirm-admin-creation-password"
              id="song_cover"
              placeholder="ex: https://chillhop.com/wp-content/uploads/24.jpg"
              value={textValue.song_cover}
              onChange={changeLogInData}
            />
          </div>
          <button className="user-create-btn">Create New Song</button>
        </div>
      </div>
    );
  };

  const CreateAdminBeatsComponent = () => {
    const handleAdminSongCreate = (song_name) => {
      alert("new song: " + song_name);
    };

    return (
      <div className="delete-user-wrapper">
        <div className="admin-user-creation-body">
          <div className="admin-input-couple">
            <label className="create-admin-label" htmlFor="song_name">
              New binaural beat name:
            </label>
            <input
              className="create-admin-input"
              type="text"
              name="binaural_name"
              id="confirm-admin-song-name"
              placeholder="ex: Song"
              value={textValue.binaural_name}
              onChange={changeLogInData}
            />
          </div>
          <div className="admin-input-couple">
            <label className="create-admin-label" htmlFor="binaural_link">
              New binaural beat link:
            </label>
            <input
              className="create-admin-input"
              type="text"
              name="binaural_link"
              id="confirm-admin-song-link"
              placeholder="ex: https://mp3.chillhop.com/serve.php/?mp3=9222"
              value={textValue.binaural_link}
              onChange={changeLogInData}
            />
          </div>
          <div className="admin-input-couple">
            <label className="create-admin-label" htmlFor="binaural_author">
              New binaural beat author:
            </label>
            <input
              className="create-admin-input"
              type="text"
              name="confirm-admin-creation-password"
              id="binaural_author"
              placeholder="ex: Swørn"
              value={textValue.binaural_author}
              onChange={changeLogInData}
            />
          </div>
          <div className="admin-input-couple">
            <label className="create-admin-label" htmlFor="binaural_type">
              New binaural beat Type:
            </label>
            <input
              className="create-admin-input"
              type="text"
              name="confirm-admin-creation-password"
              id="binaural_type"
              placeholder="ex: calm "
              value={textValue.binaural_type}
              onChange={changeLogInData}
            />
          </div>
          <div className="admin-input-couple">
            <label className="create-admin-label" htmlFor="binaural_cover">
              New binaural beat cover:
            </label>
            <input
              className="create-admin-input"
              type="text"
              name="confirm-admin-creation-password"
              id="binaural_cover"
              placeholder="ex: https://chillhop.com/wp-content/uploads/24.jpg"
              value={textValue.binaural_cover}
              onChange={changeLogInData}
            />
          </div>
          <button className="user-create-btn">Create New Song</button>
        </div>
      </div>
    );
  };

  const DeleteNormalBeats = () => {
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
            {music["binauralSongs"].map((song, index) => {
              return (
                <div className="user-li" id={index}>
                  <span className="user-name">{song["name"]}</span>
                  <span className="user-id">{song["id"]}</span>
                  <button
                    className="user-del-btn"
                    onClick={() => handleNormalMusicDelete(song["id"])}
                  >
                    Delete Song
                  </button>
                </div>
              );
            })}
          </div>
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
          title={"Delete Song"}
          item={
            normalUserListLoading ? <LoadingCircle /> : <DeleteNormalMusic />
          }
          action="Manage"
        />
        <DropDown
          title={"Add New Song"}
          item={<CreateAdminSongComponent />}
          action="Manage"
        />
        <br />
        <br />
        <h1>Binarual Management</h1>
        <DropDown
          title={"Delete Binaural Beat"}
          item={
            normalUserListLoading ? <LoadingCircle /> : <DeleteNormalBeats />
          }
          action="Manage"
        />
        <DropDown
          title={"Add New Binaural Beat"}
          item={<CreateAdminBeatsComponent />}
          action="Manage"
        />
      </div>
    </div>
  );
};

export default ContentManagement;
