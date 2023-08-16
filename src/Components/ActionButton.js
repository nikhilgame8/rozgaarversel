import classes from "./RITheme.module.css";
import Loader from "react-loader-spinner";

const ActionButton = (props) => {
  return (
    <>
      {props.buttonType === "left" ? (
        <button
          className={
            props.color ? classes.buttonBoxWhite : classes.buttonBoxLeft
          }
          onClick={props.onClick}
        >
          <div className={classes.buttonText}>{props.buttonText}</div>
        </button>
      ) : props.buttonType === "small" ? (
        <button
          className={
            props.color ? classes.buttonBoxWhite : classes.buttonBoxsmall
          }
          onClick={props.onClick}
        >
          <div className={classes.buttonText}>
            {props.isLoading ? (
              <Loader type="TailSpin" color="white" width={20} height={18} />
            ) : (
              <> {props.buttonText}</>
            )}
          </div>
        </button>
      ) : props.buttonType === "smallForReqCard" ? (
        <button
          className={
            props.color
              ? classes.buttonBoxWhite
              : classes.buttonBoxsmallForReqCard
          }
          onClick={props.onClick}
        >
          <div className={classes.buttonText}>{props.buttonText}</div>
        </button>
      ) : props.buttonType === "green" ? (
        <button
          className={
            props.color ? classes.buttonBoxWhite : classes.buttonBoxgreen
          }
          onClick={props.onClick}
        >
          <div className={classes.buttonText}>{props.buttonText}</div>
        </button>
      ) : props.buttonType === "medium" ? (
        <button
          className={
            props.color ? classes.buttonBoxWhite : classes.buttonBoxmedium
          }
          onClick={props.onClick}
        >
          <div className={classes.buttonText}>{props.buttonText}</div>
        </button>
      ) : props.buttonType === "signUp" ? (
        <button
          className={
            props.color ? classes.buttonBoxWhite : classes.buttonBoxSignup
          }
          onClick={props.onClick}
        >
          <div className={classes.buttonTextSignUp}>{props.buttonText}</div>
        </button>
      ) 
      : props.buttonType === "reject" ? (
        <button
          className={
            props.color ? classes.buttonBoxWhite : classes.buttonBoxreject
          }
          onClick={props.onClick}
        >
          <div className={classes.buttonText}>{props.buttonText}</div>
        </button>
      ) 
      :
      props.buttonType === "alertsubmit" ? (
        <button
          className={
            props.color ? classes.buttonBoxWhite : classes.buttonBoxAlert
          }
          onClick={props.onClick}
        >
          <div className={classes.buttonText}>
            {props.isLoading ? (
              <Loader type="TailSpin" color="white" width={20} height={18} />
            ) : (
              <> {props.buttonText}</>
            )}
          </div>
        </button>
      ) 
      : props.buttonType === "dual" ? (
        <div className={classes.dualButton}>
          <button
            className={classes.buttonBoxdualSecond}
            onClick={props.onCancelClick}
          >
            <div className={classes.buttonText}>{props.secondButtonText}</div>
          </button>
          <button className={classes.buttonBoxdual} onClick={props.onClicK}>
            <div className={classes.buttonText}>
              {props.isLoading ? (
                <Loader type="TailSpin" color="white" width={20} height={18} />
              ) : (
                <> {props.buttonText}</>
              )}
            </div>
          </button>
        </div>
      ) : (
        <button
          className={props.color ? classes.buttonBoxWhite : classes.buttonBox}
          onClick={props.onClick}
        >
          <div className={classes.buttonText}>{props.buttonText}</div>
        </button>
      )}
    </>
  );
};

export default ActionButton;
