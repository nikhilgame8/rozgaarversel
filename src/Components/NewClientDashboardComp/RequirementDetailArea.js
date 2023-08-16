import React, { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import classes from "./RequirementDetailArea.module.css";
import { FcRules, FcList } from "react-icons/fc";
import RISkeletonLoading from "../RISkeletonLoading";
import ActionButton from "../ActionButton";


const RequirementDetailArea = (props) => {
  const [currentLocation, setCurrentLocation] = useState(window.location.href)

  const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };
  const UserName = (firstName, lastName) => {

    return (
      firstName.charAt(0).toUpperCase() +
      firstName.slice(1) +
      " " +
      lastName.charAt(0).toUpperCase()
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
    if (type === "Project Manager") {
      return (
        <div className={classes.addonContainer}>
          <FcRules className={classes.addonNameIcon} />
          <span className={classes.AddonName}>  {"Project Manager"}</span>
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


  const changeData = (value) => {
    let chnagePTag = value.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "");
    let htmlDescription = chnagePTag.replace(/(\r\n|\r|\n)/g, '<br>');
    return htmlDescription
  }

  return (
    <>
      {props.isLoading ? <RISkeletonLoading loadingType={"RequirementDetailArea"} /> :
        <div className={classes.mainContainer}>
          <div className={classes.timeSection}>
          <div className={classes.dateAndPostType}> {timeSince(new Date(props.requirementDetail.UpdatedDate))} ago</div>
          <div className={classes.ActionButton}>

            {!currentLocation.includes("clientRequirementDetail") &&
              <ActionButton buttonText={"APPLY NOW"}
                buttonType={"small"} onClick={props.showModal} />
            }

          </div>
          </div>
          <div className={classes.featuredListing}>
            {props.requirementDetail.Addons &&
              props.requirementDetail.Addons.map((item, index) => {
                return (
                  <div className={classes.tagFeatured}>
                    {" "}
                    {addOnType(item.AddonName)}
                  </div>
                );
              })}
          </div>
          <div className={classes.displayTitleAndLogo}>
            <div className={classes.title}>{props.requirementDetail.Title}</div>
            <div>
              {props.requirementDetail.IsCompany === "1" && props.requirementDetail.CompanyLogo !== "" ? (
                <div>
                  <div className={classes.logoPlacement}>
                    <img
                      src={props.requirementDetail.CompanyLogo}
                      alt="Company_Logo"
                      className={classes.riLogo}
                      width={120}
                    />
                  </div>

                </div>
              ) : (
                <></>
              )}
              {props.requirementDetail.IsCompany === "1" && props.requirementDetail.CompanyName !== "" ? (

                <div className={classes.Comapany_Name}> {props.requirementDetail.CompanyName} </div>

              ) : (
                <></>
              )}
            </div>
          </div>
          <div>{UserName(props.requirementDetail.FirstName, props.requirementDetail.LastName)}</div>

          <div className={classes.dateAndPostTypeSection}>
            {(props.requirementDetail.FreelancerPolicy === "Onsite" || props.requirementDetail.FreelancerPolicy === "Hybrid") && props.requirementDetail.Country || props.requirementDetail.State || props.requirementDetail.City ?
              (
                <div className={classes.LocationSection}><FiMapPin size={15} /> &nbsp; <span className={classes.LocationText}>{props.requirementDetail.Country},{props.requirementDetail.State},{props.requirementDetail.City}</span></div>) : <></>
            }

          </div>
          {props.requirementDetail.DescriptionHTML ? <div className={classes.contentIndetail} ><span dangerouslySetInnerHTML={{ __html: changeData(props.requirementDetail.DescriptionHTML) }} /></div> :
            <><div className={classes.contentIndetail}  >{props.requirementDetail.Description}</div></>
          }
          <div className={classes.skilltagsContainer}>
            {" "}
            {props.requirementDetail.Skills &&
              props.requirementDetail.Skills.map((item, i) => {
                return <div className={classes.skillTags}> {item.Skill.charAt(0).toUpperCase() +
                  item.Skill.slice(1)}</div>;
              })}
          </div>
        </div>
      }
    </>
  );
};

export default RequirementDetailArea;
