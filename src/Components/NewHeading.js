import classes from "./RITheme.module.css";

const NewHeading = (props) => {
  return (
    <div className={classes.mainHeadingContainer}>
      <h2 className={classes.newHeadingFirst}>{props.firstLine} <div> {props.secondLine}</div> </h2>
      
      {props.thirdLineColor ? (
        <div className={classes.thirdLineWhite}> {props.thirdLine} </div>
      ) : (
        <div className={classes.thirdLine}> {props.thirdLine} </div>
      )}
    </div>
  );
};

export default NewHeading;
