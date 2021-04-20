import React from "react";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="admin-settings">
      <div className="admin-settings-body">
        <span className="admin-setting admin-setting-danger">Danger Zone</span>
        <span className="admin-setting">Delete This Admin Account</span>
        <span className="admin-setting">
          Note: You can't delete if this is the only Admin account
        </span>
        <div className="admin-setting-couple">
          <label
            className="confirm-admin-own-account-label"
            htmlFor="confirm-admin-own-account-deletion"
          >
            New Admin Password:
          </label>
          <input
            type="text"
            name="confirm-admin-own-account-deletion"
            id="confirm-admin-own-account-deletion"
            placeholder="ex: 12345"
          />
        </div>

        <button className="admin-setting">Delete</button>
      </div>
    </div>
  );
};

export default Settings;
