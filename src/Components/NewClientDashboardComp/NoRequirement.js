
import ActionButton from "../ActionButton";
import classes from "./NoRequirment.module.css";

const NoRequirment = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.contentContainer}>
        <div className={classes.mainHeaing}>You have no open Requirement</div>
        <div className={classes.mainContent}>
          Post a requirement for FREE and start receiving proposals from
          freelancers within minutes
        </div>

        <a href={process.env.PUBLIC_URL + "/Step1PAR"}>
          {" "}
          <ActionButton buttonText="Post A Requirement" buttonType={"small"} />
        </a>
        <div className={classes.bottomText}>
          {" "}
          if you are looking for inspiration check{" "}
          <div className={classes.blueText}>
            {" "}
            <a href={process.env.PUBLIC_URL + "/employer-workplace/How-to-hire-freelancer"} className={classes.blueText}>
              {" "}
              How to Hire{" "}
            </a>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default NoRequirment;
