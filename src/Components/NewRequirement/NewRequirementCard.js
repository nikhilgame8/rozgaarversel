import React, { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "react-loader-spinner";
import classes from "./NewRequirementCard.module.css";
import RISkeletonLoading from "../RISkeletonLoading";
const ActionButton = React.lazy(() => import("../ActionButton"));
const NewHeadingRI = React.lazy(() => import("../NewHeadingRI"));

const NewRequirementCard = (props) => {
  const [skeletonDefaultArr, setSkeletonDefaultArr] = useState([]);
  useEffect(() => {
    let arr = [];
    for (var i = 1; i <= 3; i++) {
      arr.push(i);
    }
    setSkeletonDefaultArr(arr);
  }, []);
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

  const companyName = (firstName, lastName) => {
    return (
      firstName.charAt(0).toUpperCase() +
      firstName.slice(1) +
      " " +
      lastName.charAt(0).toUpperCase()
    );
  };
  const mainSkillHandler = (skill) => {
    if (!skill.length) {
      return "NO Skill";
    } else{
      let firstSkill = skill[0];

      let mainSkill =
        firstSkill.Skill.charAt(0).toUpperCase() + firstSkill.Skill.slice(1);
      return mainSkill;
    }
   
  };
  const budget = (currency, budget, unit, workType) => {
    return (
      <>
        {currency}
        {budget}
        {workType === "onetime" ? (
          <></>
        ) : (
          <span className={classes.budgetUnit}>/{unit}</span>
        )}
      </>
    );
  };
  return (
    <>
      <React.Suspense
        fallback={
          <div className="pageLoader">
            <Loader
              type="TailSpin"
              color="red"
              height={80}
              width={80}
              className="text-center my-5"
            />
          </div>
        }
      >
        <div className={classes.mainContainer}>
          {props.heading ? (
            <h2 className={classes.headingFromProps}> {props.heading}</h2>
          ) : (
            <NewHeadingRI firstLine={"Get inspired from the recent posts"} />
          )}

          {props.isLoading&&props.isLoading.length>0? (
            <div >
               <RISkeletonLoading loadingType={"NewRequirementCard"} />
            </div>
          ) : (
            <div className={classes.webLayout}>
              {props.RequirementData &&
                props.RequirementData.slice(0, 4).map((item, index) => {
                  return (
                    <div className={classes.mainCardContainer}>
                      {props.isLoading ? (
                        <div className={classes.pageLoader}>
                          <Loader
                            type="TailSpin"
                            color="#1678f2"
                            height={80}
                            width={80}
                          />
                        </div>
                      ) : (
                        <>
                          {" "}
                          <div
                            className={classes.cardHeightSetting}
                           >
                                <a href={process.env.PUBLIC_URL + "/freelancer-"+UrlType(item.RequirementType)+"-job"+"/"+item.Title.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-")+"/" +item.RequirementID} target="_blank" className={classes.PARBtn_Link}>
                            <div className={classes.skillImageContainer}>
                              <div className={classes.skillTitleContainer}>
                                <div className={classes.workPolicyAndWorkType}>
                                  <div className={classes.workPolicy}>
                                    {" "}
                                    {item.FreelancerPolicy}{" "}
                                  </div>
                                  <div
                                    className={`${classes.workType} ${
                                      classes[
                                        workTypeColor(item.RequirementType)
                                      ]
                                    }`}
                                  >
                                    {" "}
                                    {workTypeColor(item.RequirementType)}
                                  </div>
                                </div>
                                <div className={classes.skillContainer}>
                                  {mainSkillHandler(item.Skills)}
                                </div>
                                <div className={classes.compnayLocationDate}>
                                  {item.IsCompany === "0"
                                    ? companyName(item.FirstName, item.LastName)
                                    : item.CompanyName}
                                </div>
                              </div>
                            </div>
                            <div className={classes.titleArea}>
                              {item.Title}
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
                            <div className={classes.budget}>
                              {budget(
                                item.BudgetCurrency,
                                item.Budget,
                                item.BudgetUnit,
                                item.RequirementType
                              )}{" "}
                            </div>
                            </a>
                          </div>

                          <div className={classes.ActionButton}>
                            <a
                              href={process.env.PUBLIC_URL + 
                                "/freelancer-"+UrlType(item.RequirementType)+"-job"+"/"+item.Title.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-")+"/" +item.RequirementID
                              }
                              target="_blank"
                              className={classes.PARBtn_Link}
                            >
                              {" "}
                              <ActionButton
                                buttonType="smallForReqCard"
                                buttonText="View"
                              />
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
          <a
            href={process.env.PUBLIC_URL + "/freelance-job-posting"}
            className={classes.PARBtn_Link}
          >
            <div className={classes.knowMore}>
              {" "}
              View More <AiOutlineArrowRight
                className={classes.iconArrow}
              />{" "}
            </div>
          </a>
        </div>
      </React.Suspense>
    </>
  );
};

export default NewRequirementCard;
