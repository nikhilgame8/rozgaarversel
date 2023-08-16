import classes from "./NewHeadingRI.module.css";

const NewHeadingRI = (props) => {
  return (
    <div className={classes.mainHeadingContainer}>
      <h2 className={classes.newHeadingFirst}>
        {props.firstLine} {props.secondLine}{" "}
      </h2>
      {props.thirdLineColor ? (
        <h2 className={classes.thirdLineWhite}> {props.thirdLine} </h2>
      ) : (
        <h2 className={classes.thirdLine}> {props.thirdLine} </h2>
      )}
    </div>
  );
};

export default NewHeadingRI;
