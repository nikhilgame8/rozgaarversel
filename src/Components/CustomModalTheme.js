import React from "react";
import classes from "./CustomModalTheme.module.css";
import { AiOutlineClose } from "react-icons/ai";

const CustomModalTheme = (props) => {
  window.scrollTo({ top: 0, behavior: "auto" });
  return (
    <>
      <div className={classes.modalContainer}>
        <div
          className={
            props.width === "fullWidth"
              ? classes.modalContainerWidth
              : classes.modal
          }
        >
          <div className={classes.cancelModel}>
            {" "}
            <AiOutlineClose
              size="30"
              onClick={props.onClose}
              className={classes.backIcon}
            />
          </div>
          <div className={classes.mainContainer}>{props.children}</div>
        </div>{" "}
      </div>
    </>
  );
};

export default CustomModalTheme;
