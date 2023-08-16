import {FcOk,FcLock,FcDocument,FcDeployment,FcDeleteDatabase,FcSms,} from "react-icons/fc";
import {  useNavigate } from "react-router-dom";
import classes from "./RozgaarIsProtected.module.css";

const RozgaarIsProtected = () => {

  const navigate=useNavigate()
  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainHeading}>
        {" "}
        Everything you do within Rozgaar is protected{" "}
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.rightContent}>
          <div className={classes.content}>
            <FcOk className={classes.RozgaarIsProtected_image} />{" "}
            <div className={classes.RozgaarIsProtected_text}>
              Verified Freelancers
            </div>
          </div>
          <div className={classes.content}>
            <FcDocument className={classes.RozgaarIsProtected_image} />
            <div className={classes.RozgaarIsProtected_text}>
              Non Disclosure Agreements
            </div>{" "}
          </div>
          <div className={classes.content}>
            <FcDeployment className={classes.RozgaarIsProtected_image} />{" "}
            <div className={classes.RozgaarIsProtected_text}>
              Payment Protection
            </div>
          </div>
          <div className={classes.content}>
            <FcDeleteDatabase className={classes.RozgaarIsProtected_image} />{" "}
            <div className={classes.RozgaarIsProtected_text}>
              Zero Commission
            </div>
          </div>
          <div className={classes.content}>
            <FcLock className={classes.RozgaarIsProtected_image} />{" "}
            <div className={classes.RozgaarIsProtected_text}>
              Data Security{" "}
            </div>
          </div>
          <div className={classes.content}>
            {" "}
            <FcSms className={classes.RozgaarIsProtected_image} />
            <div className={classes.RozgaarIsProtected_text}>
              Encrypted Chat
            </div>
          </div>
        </div>
      </div>
      <div className={classes.buttonText} onClick={()=>navigate(process.env.PUBLIC_URL + "/how-to-hire-freelancer")}> Learn More </div>
    </div>
  );
};

export default RozgaarIsProtected;
