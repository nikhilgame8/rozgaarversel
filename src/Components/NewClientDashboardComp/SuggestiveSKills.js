import classes from "./SuggestiveSkills.module.css";
import {  useNavigate } from "react-router-dom";

const SuggestiveSKills = (props) => {
  let navigate = useNavigate();

  
  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainHeading}>
        Skill suggestion based on your Requirments
      </div>
      <div className={classes.tabContainer}>
        {props.suggestedSkills.length > 0 ?
          props.suggestedSkills.map((item, i) => (
            <div
              className={classes.SkillTab}
              onClick={() => navigate(process.env.PUBLIC_URL + "/Step1PAR")}
            >
              {" "}
              {item}
            </div>
          )):
          <div className={classes.tabContainerText}>Reach professionals with just the right skills. <a className={classes.PARLink} href={process.env.PUBLIC_URL + "/Step1PAR"}> Post your requirement </a> in minutes</div>}
      </div>
    </div>
  );
};

export default SuggestiveSKills;
