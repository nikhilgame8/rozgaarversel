import React from "react";
import classes from "./LeftIconHide.module.css";
import {
  FcCustomerSupport,
  FcNext,
  FcPortraitMode,
  FcInspection,
  FcBriefcase,
  FcPieChart,
  FcFlashOn,
  FcAdvertising,
  FcShop,
  FcSalesPerformance,
  FcBullish,
  FcSms,
  FcAlarmClock,
} from "react-icons/fc";

const LeftIconHide = (props) => {
  return (
    <div className={classes.rightMenuMain}>
      <div className={classes.leftMenuHeading}>
        <FcNext size="20px" />
      </div>

      <div className={classes.leftMenu}>
        {" "}
        <FcBriefcase size="20px" />
        <div>
          <span className={classes.tooltipContent}>Tooltip text</span>
        </div>
      </div>

      <div className={classes.leftMenu}>
        {" "}
        <FcFlashOn size="20px" />
        <span className={classes.tooltipContent}>Tooltip text</span>
      </div>

      <div className={classes.leftMenu}>
        {" "}
        <FcAdvertising size="20px" />
      </div>
      <div className={classes.leftMenu}>
        {" "}
        <FcBullish size="20px" />
      </div>
      <div className={classes.leftMenu}>
        {" "}
        <FcSms size="20px" />
      </div>
      <div className={classes.leftMenu}>
        {" "}
        <FcSalesPerformance size="20px" />
      </div>
      <div className={classes.leftMenu}>
        {" "}
        <FcAlarmClock size="20px" />
      </div>
      <div className={classes.leftMenu}>
        {" "}
        <FcPortraitMode size="20px" />
      </div>

      <hr className={classes.horiTag} />

      <div className={classes.leftMenu}>
        {" "}
        <FcInspection size="20px" />
      </div>
      <div className={classes.leftMenu}>
        {" "}
        <FcPieChart size="20px" />
      </div>
      <div className={classes.leftMenu}>
        {" "}
        <FcShop size="20px" />
      </div>

      <div className={classes.leftMenu}>
        {" "}
        <FcCustomerSupport size="20px" />
      </div>
    </div>
  );
};

export default LeftIconHide;
