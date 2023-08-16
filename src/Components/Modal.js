import { Fragment } from "react";
import classes from "./Modal.module.css";
const Backdrop = () => {
  return <div className={classes.backdrop} />;
};

const Modal = (props) => {
  window.scrollTo({ top: 0, behavior: "auto" });
  return (
    <Fragment>
      <Backdrop />
      <div className={classes.modalContainer}>
        {" "}
        <div className={classes.modal}>
          <div>{props.heading}</div>
          <button className={classes.button} onClick={props.onClick}>
            OK
          </button>
        </div>{" "}
      </div>
    </Fragment>
  );
};

export default Modal;
