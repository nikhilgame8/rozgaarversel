import React from "react";
import classes from "./HireAssistant.module.css";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiProfit } from "react-icons/gi";

const RozgaarAssistant = () => {
  return (
    <div>
      <div className={classes.NumericTextContainer}>
        <RiCustomerService2Fill className={classes.Icon} />
        <div className={classes.NumericTextParaContainer}>
          <h2 className={classes.NumericTextFirst}>
            What does Rozgaar Assistant do?
          </h2>
          <h3 className={classes.Paragraph}>
            Rozgaar personal assistants can be hired for performing certain task
            for you including understanding your hiring requirement, posting a
            requirement, selecting top freelancer for the task and stay in touch
            with you with regular work update.
          </h3>
        </div>
      </div>
      <div className={classes.NumericTextContainer}>
        <GiProfit className={classes.Icon} />
        <div className={classes.NumericTextParaContainer}>
          <h2 className={classes.NumericTextFirst}>
            Benefits of hiring a Rozgaar Assistant?
          </h2>
          <h3 className={classes.Paragraph}>
            Hiring a virtual assistant on rozgaarindia.com is both easy and
            affordable. You can choose to hire for a certain period of time, or
            you can hire for specific project, which makes hiring easy & cost
            efficient and help you focus on your core business.{" "}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default RozgaarAssistant;
