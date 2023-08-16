import React from "react";
import ActionButton from "../ActionButton";
import CustomModalTheme from "../CustomModalTheme";
import classes from "./CancelProfile.module.css";

const CancelProfile = (props) => {
  return (
    <CustomModalTheme onClose={props.onClose}>
      <div className={classes.btnContainer}>
        <div className={classes.closePostHeading}>
          Are you sure want to cancel ?
        </div>
        <div className={classes.closePostButtonsConatiner}>
          <div className={classes.closePostButtons}>
            <ActionButton
              buttonText={"Yes"}
              buttonType={"small"}
              onClick={props.onClick}
            />
            <ActionButton
              buttonText={"No"}
              buttonType={"small"}
              onClick={props.clickOnNo}
            />
          </div>
        </div>
      </div>
    </CustomModalTheme>
  );
};

export default CancelProfile;
