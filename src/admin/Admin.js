import React, { useState } from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountManagement from "./admin-functions/AccountManagement";
import AdminDashboard from "./admin-functions/AdminDashboard";
import ContentManagement from "./admin-functions/ContentManagement";
import DataManagement from "./admin-functions/DataManagement";
import Settings from "./admin-functions/Settings";
import { getIsLoggedIn, logOutUser } from "../utils";

const Admin = () => {
  return (
    <div>
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/admin/settings" exact component={Settings}></Route>
            <Route
              path="/admin/content-management"
              exact
              component={ContentManagement}
            ></Route>
            <Route
              path="/admin/data-management"
              exact
              component={DataManagement}
            ></Route>
            <Route
              path="/admin/account-management"
              exact
              component={AccountManagement}
            ></Route>
            <Route
              path={["/admin", "/admin/*"]}
              exact
              component={AdminDashboard}
            ></Route>
          </Switch>
        </Router>
      </>
    </div>
  );
};

export default Admin;
