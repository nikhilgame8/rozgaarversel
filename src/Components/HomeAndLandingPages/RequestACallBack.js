import NewHeadingRI from "../NewHeadingRI";
import classes from "./RequestACallBack.module.css";
import ActionButton from "../ActionButton";

const RequestACallBack = () => {
  return (
    <div className={classes.webContainer}>
      <div className={classes.mainContainer}>
        <NewHeadingRI firstLine={"Need Assistance"} />
        <div className={classes.callHeading}>
          Our Friendly Folks will help you{" "}
        </div>
        <div className={classes.ActionButton}>
          <a
            href={process.env.PUBLIC_URL + "/customer-support"}
            // onClick={() => {
            //   sessionStorage.setItem("afterAuthRedirectUrl", "contactus");
            // }}
            className={classes.PARBtn_Link}
          >
            {" "}
            <ActionButton
              buttonText="Request a Call back"
              buttonType="medium"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RequestACallBack;
