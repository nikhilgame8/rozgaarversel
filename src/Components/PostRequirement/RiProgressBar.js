import classes from "./RiProgressBar.module.css";

const RiProgreesBar = (props) => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.progressbar}>
        <div
          className={
            props.step === "25"
              ? classes.progressbarStatus25
              : props.step === "50"
              ? classes.progressbarStatus50
              : props.step === "75"
              ? classes.progressbarStatus75
              : classes.progressbarStatus100
          }
        ></div>
      </div>
    </div>
  );
};

export default RiProgreesBar;
