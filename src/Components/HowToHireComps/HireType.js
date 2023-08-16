import React from "react";
import classes from "./HireType.module.css";

const HireType = () => {
  const hireType = [
    {
      type: "One Time Task",
      border: "2px solid #375BA7",
      detailType:
        "Hire Freelancers for one-time gig work. E.g Looking for a graphic designer to create a logo for my startup",
    },
    {
      type: "Monthly Basis",
      border: "2px solid #1C5652",
      detailType:
        "Hire freelancers on monthly term. E.g Need a Graphic Designer to design Instagram posts everyday for 2 months",
    },
    {
      type: "Contract Work",
      border: "2px solid #4B6A35",
      detailType:
        "Hire for a short-term or a long-term project. E.g I want a React website developer to work on an E-commerce Project",
    },
    {
      type: "Commission Based",
      border: "2px solid #1C5652",
      detailType:
        "Hire freelancer on commission basis. E.g We are looking for a POS agents for providing verified leads",
    },
  ];
  return (
    <div className={classes.hireTypeMainDiv}>
      {hireType.map((item, index) => {
        return (
          <div className={classes.mapDiv}>
            <h3 className={classes.typeDiv}>{item.type}</h3>
            <div
              style={{ border: `${item.border}` }}
              className={classes.border}
            ></div>
            <div className={classes.detailDiv}>{item.detailType}</div>
          </div>
        );
      })}
    </div>
  );
};

export default HireType;
