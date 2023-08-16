import React, { useState } from "react";
import classes from "./ApplicationDetail.module.css";
import { FcRules, FcList } from "react-icons/fc";
import ActionButton from "../ActionButton";
import RISkeletonLoading from "../RISkeletonLoading";

const ApplicationDetail = (props) => {
  const [currentLocation, setCurrentLocation] = useState(window.location.href)
  const budget = () => {
    return (
      <>
        {props.applicationDetails.Currency}
        {props.applicationDetails.PraposalAmount}/
        {props.applicationDetails.Unit}
      </>
    );
  };

  const addOnType = (type) => {
    if (type === "Feature") {
      return (
        <div className={classes.addonContainer}>
          <img src={process.env.PUBLIC_URL + "/assets/application_detail/featured.svg"} alt="Featured_Image" className={classes.addonNameIcon} />

          <span className={classes.AddonName}>  {"Featured"}</span>
        </div>
      );
    }
    if (type === "Urgent") {
      return (
        <div className={classes.addonContainer}>
          <img src={process.env.PUBLIC_URL + "/assets/application_detail/Urgent.svg"} alt="Urgent_Image" className={classes.addonNameIcon} />

          <span className={classes.AddonName}>  {"Urgent"}</span>
        </div>
      );
    }
    
    if (type === "Non Disclosure Agreement") {
      return (
        <div className={classes.addonContainer}>
          <img src={process.env.PUBLIC_URL + "/assets/application_detail/NDA.svg"} alt="NDA_Image" className={classes.addonNameIcon} />
          <span className={classes.AddonName}>  {"NDA"}</span>
        </div>
      );
    }
    if (type === "Access Waitlist") {
      return (
        <div className={classes.addonContainer}>
          <FcList className={classes.addonNameIcon} />
          <span className={classes.AddonName}> {"Pro"}</span>
        </div>
      );
    }
  }
  const applied = () => {
    if (props.applicationDetails.Applied >= 1) {
      return `Top ${props.applicationDetails.Applied} Applications received`;
    } else {
      return ` ${props.applicationDetails.Applied} Applications received`;
    }
  };
  const waitList = () => {
    if (props.applicationDetails.WaitList >= 1) {
      return `${props.applicationDetails.WaitList} on Waitlist. Unlock`;
    } else {
      return `${props.applicationDetails.WaitList} on Waitlist. `;
    }
  };

  const workTypeColor = (workType) => {
    if (props.applicationDetails.RequirementType === "commission") {
      return "Commission";
    }
    if (props.applicationDetails.RequirementType === "monthly-basis") {
      return "Monthly";
    }
    if (props.applicationDetails.RequirementType === "onetime") {
      return "One-Time";
    }

    if (props.applicationDetails.RequirementType === "contract") {
      return "Contract";
    }
  };
  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <div className={classes.mainContainer}>
            {props.isLoading ? <RISkeletonLoading loadingType={"ApplicationDetail"}/>:
            <div>
            <div className={classes.sponsoredPost}>
              <div className={classes.featuredListing}>
                {props.applicationDetails.Addons &&
                  props.applicationDetails.Addons.map((item) => {
                    return (
                      <div className={classes.tagFeatured}>
                        {" "}
                        {addOnType(item.AddonName)}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className={classes.budgetContainer}>

              <div className={classes.budgetAndWork}>
                <img src={process.env.PUBLIC_URL + "/assets/application_detail/Budget.svg"} alt="Budget_Image" className={classes.ApplicationDetail_image} />
                <div className={classes.budgetAmount}>{budget()} </div>
                <div className={classes.budgetHeading}> Budget </div>
              </div>
              <div className={classes.budgetAndWork}>
                <img src={process.env.PUBLIC_URL + "/assets/application_detail/Wrok_type.svg"}alt="Work_Type_Image" className={classes.ApplicationDetail_image} />
                <div className={classes.workType} >
                  {" "}
                  {workTypeColor()}{" "}
                </div>
                <div className={classes.budgetHeading}> Work Type </div>
              </div>
              <div className={classes.budgetAndWork}>
                <img src={process.env.PUBLIC_URL + "/assets/application_detail/Clinet_type.svg"} alt="Client_Type_Image" className={classes.ApplicationDetail_image} />
                <div className={classes.budgetAmount}>{props.applicationDetails.IsCompany && props.applicationDetails.IsCompany === "0" ? "Individual" : props.applicationDetails.CompanyName} </div>
                <div className={classes.budgetHeading}> Client Type </div>
              </div>
            </div>
            <div className={classes.ActionButton}>

              {!currentLocation.includes("clientRequirementDetail") &&
                <ActionButton buttonText={"APPLY NOW"}
                  buttonType={"small"} onClick={props.showModal} />
              }

            </div>
            </div>
    }
          </div>
        );
      default:
        return (
          <div className={classes.mainContainer}>
             {props.isLoading ? <RISkeletonLoading loadingType={"ApplicationDetail"}/>:
            <div>
            <div className={classes.sponsoredPost}>
              <div className={classes.featuredListing}>
                {props.applicationDetails.Addons &&
                  props.applicationDetails.Addons.map((item) => {
                    return (
                      <div className={classes.tagFeatured}>
                        {" "}
                        {addOnType(item.AddonName)}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className={classes.budgetContainer}>
              <div className={classes.budgetHeading}> Budget </div>
              <div className={classes.budgetAndWork}>
                <div className={classes.budgetAmount}>{budget()} </div>
                <div className={`${classes.workType} ${classes[workTypeColor()]}`}>
                  {" "}
                  {workTypeColor()}{" "}
                </div>
              </div>
            </div>
            <div className={classes.contentAlign}>
              <div>{applied()} </div>
              <div>{waitList()} </div>
            </div>
            <div className={classes.ActionButton}>
              {!currentLocation.includes("clientRequirementDetail") &&
                <ActionButton buttonText={"APPLY NOW"}
                  buttonType={"small"} onClick={props.showModal} />
              }
            </div>
            </div>
    }
          </div>
        );
    }
  }
  return <>{MobileWebHandlerSwitch(props.device)}</>;
};

export default ApplicationDetail;
