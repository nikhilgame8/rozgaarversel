import React from "react";
import classes from "./HireTypeWeb.module.css";

const HireTypeWeb = () => {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.contentDiv}>
        <div className={classes.typeDiv}>
          One Time
          <br />
          Task
        </div>
        <div className={classes.borderDivFirst}></div>
        <div className={classes.paragraph}>
          Hire Freelancers for one-time gig work.
          <br />
          E.g Looking for a graphic designer to create a logo for my startup
        </div>
      </div>
      <div className={classes.contentDiv}>
        <div className={classes.secondParagraph}>
          Hire freelancers on monthly term
          <br />
          E.g Need a Graphic Designer to design Instagram posts everyday for 2
          months
        </div>
        <div className={classes.borderDivSecond}></div>
        <div className={classes.secondTypeDiv}>
          Monthly
          <br />
          Basis
        </div>
      </div>
      <div className={classes.contentDiv}>
        <div className={classes.typeDiv}>
          Contract
          <br />
          Work
        </div>
        <div className={classes.borderDivThird}></div>
        <div className={classes.paragraph}>
          Hire for a short-term or a long-term project
          <br />
          E.g I want a React website developer to work on an E-commerce Project
        </div>
      </div>
      <div className={classes.contentDiv}>
        <div className={classes.secondParagraph}>
          Hire freelancer on commission basis
          <br />
          E.g We are looking for a POS agents for providing verified leads
        </div>
        <div className={classes.borderDivFourth}></div>
        <div className={classes.secondTypeDiv}>
          Commission
          <br />
          Based
        </div>
      </div>
    </div>
  );
};

export default HireTypeWeb;
