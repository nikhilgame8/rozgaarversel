import classes from "../HomeAndLandingPages/FutureOfWork.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import NewHeading from "../NewHeading";

const FutureOfWork = () => {
  return (
    <>
      <div className={classes.mainContainer}>
        <NewHeading firstLine={"The Future"} secondLine={"of Work."} />
        <div className={classes.webLayout}>
          <h2 className={classes.missionStatement}>
            Our mission is to simplify remote hiring providing most aligned
            freelancers for a day, month or a year fulfilling your professional
            needs.
          </h2>
          <h2 className={classes.missionStatement}>
            {" "}
            Our easy-to-use platform enables you to manage{" "}
            <b> off-balance sheet </b>talented workers in a single click with
            confidence and trust so you can save time and focus on your success.{" "}
          </h2>
          <a href={process.env.PUBLIC_URL + "/future-of-work"} className={classes.PARBtn_Link}>
            <div className={classes.knowMore}>
              {" "}
              Know More <AiOutlineArrowRight
                className={classes.iconArrow}
              />{" "}
            </div>
          </a>
        </div>


      </div>

    </>
  );
};

export default FutureOfWork;
