import { GiFallingStar } from "react-icons/gi";
import classes from "./ProfileHealth.module.css";

const ProfileHealth = (props) => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.nameAndDetailArea}>
        <div className={classes.fullName}>
          @{props.profileHealthData.userName}
        </div>
        <div className={classes.memberShipContent}>BASIC MEMBERSHIP</div>
      </div>

      <div className={classes.infoArea}>
        <div>
          {" "}
          <GiFallingStar className={classes.infoAreaIcon} />{" "}
        </div>
        <div className={classes.hireAssistant}>
          <div> Put your hiring on auto-pilot </div>
          <a href={process.env.PUBLIC_URL + "/hire-assistant"}>
            <div>Hire Rozgaar Assistant </div>
          </a>
        </div>
      </div>

      <div>
        <div className={classes.headingContainer}>
          <div className={classes.accontStatusHeading}>
            Achieve all-star profile
          </div>
          <div>
            <div className={classes.accontStatussub}>
              {" "}
              Complete the recommended sections for relevant freelancers and
              receive more requirement views{" "}
            </div>
          </div>
        </div>
        <div className={classes.progressbar}>
          <div
            style={{
              width: props.profileHealthData.ProfileCompleted + "%",
              backgroundColor: "rgb(184, 184, 255)",
              height: 20,
              fontSize: 12,
              fontWeight: "bold",
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            {Math.round(props.profileHealthData.ProfileCompleted)}%
          </div>
        </div>
        {Math.round(props.profileHealthData.ProfileCompleted)!==100&&
          <a href={process.env.PUBLIC_URL + "/employer-workplace/my-profile"} class="linkTag">
            <div className={classes.profileTask}>
              {" "}
              Add your {props.profileHealthData.EmptyProfileFields[0]}{" "}
            </div>
          </a> 
}

      </div>
    </div>
  );
};
export default ProfileHealth;
