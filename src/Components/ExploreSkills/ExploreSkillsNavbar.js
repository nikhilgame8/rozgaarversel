import React, { useState } from "react";
import classes from "./ExploreSkillsNavbar.module.css";
import SkillsData from "./SkillsData";

const ExploreSkillsNavbar = () => {
  const [activeBar, setActiveBar] = useState("TopSkills");
  const checkTab = (status) => {
    setActiveBar(status);
  };
  return (
    <>
      <div className={classes.header_container}>
        <div className={classes.scroll_container}>
          <div className={classes.navbar}>
            <h2
              className={
                activeBar === "TopSkills"
                  ? classes.menuOptionSelected
                  : classes.menuOptionContent
              }
              onClick={() => {
                checkTab("TopSkills");
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
            >
              Top Skills
            </h2>
           
            <h2
              className={
                activeBar === "AllSkills"
                  ? classes.menuOptionSelected
                  : classes.menuOptionContent
              }
              onClick={() => {
                checkTab("AllSkills");
                window.scrollTo({ top: 800, behavior: "smooth" });
              }}
            >
              All Skills
            </h2>
          </div>
        </div>
        {activeBar === "TopSkills" ? (
          <SkillsData
            userType={"TopSkills"}/>
          
        ) : activeBar === "AllSkills" ? (
          <SkillsData
            userType={"AllSkills"}
           
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ExploreSkillsNavbar;
