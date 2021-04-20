import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as TiWorld from "react-icons/ti";
import { AiFillDatabase } from "react-icons/ai";

import { Redirect } from "react-router";

export const SideBarMainData = [
  {
    title: "Admin Dashboard",
    path: "/admin",
    icon: <TiWorld.TiWorld />,
    cName: "nav-text",
  },
  {
    title: "Account Management",
    path: "/admin/account-management",
    icon: <IoIcons.IoIosPeople />,
    cName: "nav-text",
  },
  {
    title: "Data Management",
    path: "/admin/data-management",
    icon: <AiFillDatabase />,
    cName: "nav-text",
  },
  {
    title: "Content Management",
    path: "/admin/content-management",
    icon: <IoIcons.IoIosMusicalNotes />,
    cName: "nav-text",
  },
];

export const SideBarSecondaryData = [
  {
    title: "My Settings",
    path: "/admin/settings",
    icon: <IoIcons.IoIosSettings />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/login",
    icon: <IoIcons.IoIosLogOut />,
    cName: "nav-text",
  },
];
