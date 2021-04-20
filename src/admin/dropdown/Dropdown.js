import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ title, item, action = "Open" }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpenDropDown(!openDropDown);

  return (
    <div className="dd-wrapper">
      <div
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!openDropDown)}
        onClick={() => toggle(!openDropDown)}
      >
        <div className="dd-header__title">
          <p>{title}</p>
        </div>
        <div className="dd-header__action">
          <p>{openDropDown ? "Close" : action}</p>
        </div>
      </div>
      {openDropDown && <div className="dd-body">{item}</div>}
    </div>
  );
};

export default Dropdown;
