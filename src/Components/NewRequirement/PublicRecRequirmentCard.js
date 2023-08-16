import classes from "./PublicRecRequirementCard.module.css";
import React, { useEffect, useState } from "react";
import ActionButton from "../ActionButton";
import Skeleton from "react-loading-skeleton";
import { FcRules, FcList } from "react-icons/fc";
import RISkeletonLoading from "../RISkeletonLoading";
import { logDOM } from "@testing-library/react";

const PublicRecRequirementCard = (props) => {
  const [skeletonDefaultArr, setSkeletonDefaultArr] = useState([]);
  useEffect(() => {
    let arr = [];
    for (var i = 1; i <= 3; i++) {
      arr.push(i);
    }
    setSkeletonDefaultArr(arr);
  }, []);

  const workTypeColor = (workType) => {
    if (workType === "commission") {
      return "Commission";
    }
    if (workType === "monthly-basis") {
      return "Monthly";
    }
    if (workType === "onetime") {
      return "One-Time";
    }

    if (workType === "contract") {
      return "Contract";
    }
  };


  const statusHandler = (status) => {
    if (status === "Pending") {
      return "Under Review";
    }
    if (status === "Draft") {
      return "Draft";
    }
    if (status === "Approved") {
      return "Active";
    }
  };

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


  const budget = (currency, budget, unit, workType) => {
    return (
      <>
        {currency}
        {budget}
        {workType === "onetime" ? (
          <></>
        ) : (
          <span className={classes.budgetUnit}>{unit}</span>
        )}
      </>
    );
  };

  const mainSkillHandler = (skill) => {

    if (!skill.length) {
      return "NO Skill";
    } else {
      let firstSkill = skill[0];

      let mainSkill =
        firstSkill.Skill.charAt(0).toUpperCase() + firstSkill.Skill.slice(1);
      return mainSkill;
    }

  };
  const addOnType = (type) => {
    if (type === "Feature") {
      return (
        <div className={classes.addonContainer}>
          <img
            src={process.env.PUBLIC_URL + "/assets/application_detail/featured.svg"}
            alt="Featured_Logo"
            className={classes.addonNameIcon}
          />

          <span className={classes.AddonName}> {"Featured"}</span>
        </div>
      );
    }
    if (type === "Urgent") {
      return (
        <div className={classes.addonContainer}>
          <img
            src={process.env.PUBLIC_URL + "/assets/application_detail/Urgent.svg"}
            alt="Urgent_Logo"
            className={classes.addonNameIcon}
          />

          <span className={classes.AddonName}> {"Urgent"}</span>
        </div>
      );
    }

    if (type === "Non Disclosure Agreement") {
      return (
        <div className={classes.addonContainer}>
          <img
            src={process.env.PUBLIC_URL + "/assets/application_detail/NDA.svg"}
            alt="NDA_Logo"
            className={classes.addonNameIcon}
          />
          <span className={classes.AddonName}> {"NDA"}</span>
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
  };
  const UrlType = (workType) => {
    if (workType === "commission") {
      return "commission";
    }
    if (workType === "monthly-basis") {
      return "monthly";
    }
    if (workType === "onetime") {
      return "one-time";
    }

    if (workType === "contract") {
      return "contract";
    }
  };
  const skilltags = (Skills) => {
    return (
      <div className={classes.skilltagsContainer}>
        {Skills &&
          Skills.slice(0, 4).map((item, i) => {
            return (
              <div className={classes.skillTags}>
                {" "}
                {item.Skill.charAt(0).toUpperCase() +
                  item.Skill.slice(1)}
              </div>
            );
          })}

      </div>
    )
  }

 const date=(value)=>{
  var days=8; 
  var date = new Date();
  var currentDate=new Date(value)
  var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
 
  if(currentDate>=last){
  return true
  }
  else{
    return false
  }
 }
 const changeData=(value)=>{
  let chnagePTag = value.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "");
  let htmlDescription = chnagePTag.replace(/(\r\n|\r|\n)/g, '<br>');
  return  htmlDescription
}
  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <>
            <div className={classes.mainContainer}>
            {!props.requirementsCard.length ? (
                <div className={classes.noRequirementFoundText}> No Requirement found </div>
              ) : (
                <></>
              )}
              {props.loading ? (
                <div >
                  <RISkeletonLoading loadingType={"PublicRecRequirementCard"} />
                </div>

              ) : (
                <div className={classes.webLayout}>
                  {props.requirementsCard !== "noRequirement" ?props.requirementsCard.map((item) => {
                    return (
                      <div className={classes.reqSection}>

                        <a
                          href={process.env.PUBLIC_URL +
                            "/freelancer-" + UrlType(item.RequirementType) + "-job" + "/" + item.Title.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-") + "/" + item.RequirementID
                          }
                          target="_blank"
                          className="linkTag"
                        >
                     
                          <div className={classes.titleSkill}>  {item.Title} </div>
                          <div className={classes.dateAndStatusContainer}>
                           {date(item.CreatedDate)&&<div className={classes.newTag}> New </div>}
                            <div className={classes.dateArea}> {mainSkillHandler(item.Skills)} - <span>     {timeSince(new Date(item.UpdatedDate))} ago</span></div>

                          </div>
                          <div className={classes.mainReqPoints}>
                            <div className={classes.reqPointsContainer}>
                              <div className={classes.priceFont}>{item.BudgetCurrency} {item.Budget} </div>
                              <div className={classes.priceType}> {budget(item.BudgetUnit)} </div>
                            </div>
                            <div className={classes.reqPointsContainer}>
                              <div className={classes.priceFont}>  {item.FreelancerPolicy} </div>
                              <div className={classes.priceType}> Work Type</div>
                            </div>
                            <div className={classes.reqPointsContainer}>
                              <div className={classes.priceFont}> {workTypeColor(item.RequirementType)} </div>
                              <div className={classes.priceType}> Work Policy</div>
                            </div>
                          </div>
                        </a>

                      { item.DescriptionHTML? <div className={classes.shortDesc} ><span  dangerouslySetInnerHTML={{__html:  changeData(item.DescriptionHTML).slice(0, 140)}}/>...</div>:
                      <><div className={classes.shortDesc}  >{item.Description.slice(0, 140)}...</div></>
                      }
                       

                      
                        {skilltags(item.Skills)}

                        <div className={classes.buttonContainer}> </div>
                        <a
                          href={process.env.PUBLIC_URL +
                            "/freelancer-" + UrlType(item.RequirementType) + "-job" + "/" + item.Title.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-") + "/" + item.RequirementID
                          }
                          target="_blank"
                          className="linkTag"
                        >
                          <div className={classes.greenButton}> See More </div>
                        </a>

                        <div className={classes.borderGreen}></div>
                      </div>
                    );
                  }): <div className={classes.noRequirement}>No rquirement found</div>}
                </div>
              )}
            </div>
          </>
        );

      default:
        return (
          <>
            <div className={classes.mainContainer}>
              {!props.requirementsCard.length ? (
                <div className={classes.noRequirementFoundText}> No Requirement found </div>
              ) : (
                <></>
              )}
              {props.loading ? (
                <div >
                  <RISkeletonLoading loadingType={"PublicRecRequirementCard"} />
                </div>
              ) : (
                <div className={classes.webLayout}>
                  {props.requirementsCard !== "noRequirement" ? props.requirementsCard.map((item, index) => {
                    return (
                      <div className={classes.mainCardContainer}>
                        <div className={classes.cardHeightSetting}>
                          <div className={classes.workingType}>
                            <div className={classes.workPolicy}>
                              {item.FreelancerPolicy}
                            </div>

                            <div
                              className={`${classes.workType} ${classes[workTypeColor(item.RequirementType)]
                                }`}
                            >
                              {" "}
                              {workTypeColor(item.RequirementType)}
                            </div>
                          </div>

                          <div className={classes.twoSectionDivider}>
                            <div className={classes.leftSectionWidth}>
                              <a
                                href={process.env.PUBLIC_URL +
                                  "/freelancer-" + workTypeColor(item.RequirementType).toLowerCase() + "-job" + "/" + (item.Title.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-")) + "/" + item.RequirementID
                                }
                                target="_blank"
                                class="linkTag"
                              >
                                <div className={classes.skillContainer}>
                                  {mainSkillHandler(item.Skills)}
                                </div>
                              </a>
                              <a
                                href={process.env.PUBLIC_URL +
                                  "/freelancer-" + workTypeColor(item.RequirementType).toLowerCase() + "-job" + "/" + (item.Title.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-")) + "/" + item.RequirementID
                                }
                                target="_blank"
                                class="linkTag"
                              >
                                <div className={classes.titleArea}>
                                  {item.Title}
                                </div>
                              </a>
                              <div className={classes.skilltagsContainer}>
                                {item.Skills &&
                                  item.Skills.slice(0, 4).map((item, i) => {
                                    return (
                                      <div className={classes.skillTags}>
                                        {" "}
                                        {item.Skill.charAt(0).toUpperCase() +
                                          item.Skill.slice(1)}
                                      </div>
                                    );
                                  })}
                              </div>
                              <div className={classes.statusAnddate}>
                                <div className={classes.workStatus}>
                                  {" "}
                                  {statusHandler(item.Status)}{" "}
                                </div>
                                <div className={classes.postedDate}>
                                  {timeSince(new Date(item.UpdatedDate))} ago
                                </div>
                              </div>
                            </div>

                            <div className={classes.menuWithStatus}>
                              <div className={classes.featuredListing}>
                                {item.Addons &&
                                  item.Addons.map((item) => {
                                    return (
                                      <div className={classes.tagFeatured}>
                                        {" "}
                                        {addOnType(item.AddonName)}
                                      </div>
                                    );
                                  })}
                              </div>
                              <div className={classes.statusAndMenu}>
                                {budget(
                                  item.BudgetCurrency,
                                  item.Budget,
                                  item.BudgetUnit
                                )}{" "}
                              </div>

                              <a
                                href={process.env.PUBLIC_URL +
                                  "/freelancer-" + workTypeColor(item.RequirementType).toLowerCase() + "-job" + "/" + (item.Title.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-")) + "/" + item.RequirementID
                                }
                                target="_blank"
                                class="linkTag"
                              >
                                <ActionButton
                                  buttonText="View"
                                  buttonType="small"
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }) : <div className={classes.noRequirement}>No rquirement found</div>}
                </div>
              )}
            </div>
          </>
        );
    }
  };

  return <>{MobileWebHandlerSwitch(props.device)}</>;
};

export default PublicRecRequirementCard;
