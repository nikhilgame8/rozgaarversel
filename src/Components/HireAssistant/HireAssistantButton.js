import React from "react";

import classes from "./HireAssistant.module.css";

const HireAssistantButton = (props) => {
  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <div>
            <div className={classes.MobileMainBannerHireButton}>
              
                Coming soon
            
            </div>
          </div>
        );

      default:
        return (
          <div>
            <div className={classes.MainBannerHireButton}>
             
                 Coming soon
             
            </div>
          </div>
        );
    }
  };

  return <>{MobileWebHandlerSwitch(props.device)}</>;
};

export default HireAssistantButton;
