import React, { useState } from "react";
import LeftMenu from "../../Components/NewClientDashboardComp/LeftMenu";

import classes from "./NewClientDashboardMobile.module.css";

const NewClientDashboardMobile = (props) => {
  const [ optionSelected,setOptionSelected] = useState();

  const menuOptions = (menu) => {
    setOptionSelected(menu);
    
  };
  return (
    <div className={classes.pageLayout}>
      <LeftMenu option={menuOptions} />
      <div className={classes.widgetsContainer}>{props.children}</div>
    </div>
  );
};

export default NewClientDashboardMobile;
