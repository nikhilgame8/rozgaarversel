import React, { useState } from "react";
import LeftMenu from "../../Components/NewClientDashboardComp/LeftMenu";
import classes from "./NewClientDashboard.module.css";

const NewClientDashboard = (props) => {
  const [optionSelected, setOptionSelected] = useState();

  const menuOptions = (menu) => {
    setOptionSelected(menu);
  };
  return (
    <div>
      <div className={classes.pageLayout}>
        <LeftMenu option={menuOptions} />
        <div className={classes.widgetsContainer}>{props.children}</div>
      </div>
    </div>
  );
};

export default NewClientDashboard;
