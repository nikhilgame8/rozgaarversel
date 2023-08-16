import NewHeading from "../NewHeading";
import classes from "./SkillsBasedWork.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import React from "react";

const SkillsBasedWork = (props) => {
  
  return (
    <div className={classes.mainContainer}>
      <NewHeading firstLine={"Explore our"} secondLine={"skill marketplace"} />

      <div>
        <div className={classes.setoverFlow}>
          <div className={classes.tagDisplay}>
            {props.getSkill&&props.getSkill.slice(0,14).map((item, index) => {
              return (
               
                  <a href={process.env.PUBLIC_URL+"/freelance-job-posting"} className={classes.PARBtn_Link}>
                  {" "}
                  <h3 className={classes.skillOption}>{item.Skill}</h3>
                </a>
              );
            })}
           
          </div>
        </div>
        <a href={process.env.PUBLIC_URL+"/skills"} className={classes.PARBtn_Link}>
          <div className={classes.knowMore}>
            {" "}
            View More <AiOutlineArrowRight className={classes.iconArrow} />{" "}
          </div>
        </a>
      </div>
    </div>
  );
};

export default SkillsBasedWork;