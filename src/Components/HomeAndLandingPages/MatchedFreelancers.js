
import ActionButton from "../ActionButton";
import classes from "./MatchedFreelancer.module.css";

const MatchedFreelaners = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.mobileImage}>
        <img
          className={classes.mapWidthMobile}      
          src={process.env.PUBLIC_URL + "/assets/HomePage/Map-RozgaarCheck.gif"}
          alt="Easy_Freelancer_Hiring"
          title="Easy_Freelancer_Hiring"
          loading="lazy"
          height={"157px"}
          width={"350px"}
        />
      </div>

      <div className={classes.contentArea}>
        <h2 className={classes.headingForSEO}> Quick and Easy freelancer hiring </h2>
        Receive prioritised batches of profiles so that you can stop wasting
        your time sorting hundreds of applicants and connect, collaborate, pay
        and get work done in a secure environment
        <div className={classes.ActionButton}>
          <a
            href={process.env.PUBLIC_URL + "/Step1PAR"}
            onClick={() => {
              sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
            }}
            className={classes.PARBtn_Link}
          >
            {" "}
            <ActionButton buttonType="small" buttonText="Get Started" />
          </a>
        </div>
      </div>

      <img
        className={classes.mapWidthWeb}
        src={process.env.PUBLIC_URL + "/assets/HomePage/mapRozgaar.jpg"}
        alt="Easy_Freelancer_Hiring"
        title="Easy_Freelancer_Hiring"
        loading="lazy"
        height={"230px"}
        width={"500px"}
      />
    </div>
  );
};

export default MatchedFreelaners;
