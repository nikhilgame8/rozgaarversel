import { useNavigate } from "react-router-dom";
import RISkeletonLoading from "../RISkeletonLoading";
import classes from "./RequirementPageHeader.module.css";

const RequirementPageHeader = (props) => {
  const navigate = useNavigate();

  const bgColor = () => {
    if (props.headerDetail.RequirementType === "commission") {
      return "commission";
    } else if (props.headerDetail.RequirementType === "contract") {
      return "contract";
    } else if (props.headerDetail.RequirementType === "monthly-basis") {
      return "monthly";
    } else if (props.headerDetail.RequirementType === "oneTime") {
      return "oneTime";
    }
  };
  const contentCase = (skill) => {
    const newSkill = skill.charAt(0).toUpperCase() + skill.slice(1);
    return newSkill;
  };
  const statusHandler = () => {
    if (props.headerDetail.Status === "Approved") {
      return "Active";
    }
  };
  const ClosePostHandler = () => {
    if (props.headerDetail.Status === "Draft") {
      navigate("/Step1PAR");
    }
  };


  const requirementTypeHandler = (reqType) => {
    if (reqType === "contract") {
      return "Contract job!";
    }
    if (reqType === "onetime") {
      return "One Time gig!";
    }
    if (reqType === "monthly-basis") {
      return "Monthly job!";
    }
    if (reqType === "commission") {
      return "Commision based work!";
    }
  };
  const reqTypeColor = (reqType) => {
    if (reqType === "contract") {
      return "contractGreen";
    }
    if (reqType === "onetime") {
      return "OneTimeBlue";
    }
    if (reqType === "monthly-basis") {
      return "monthlyGrey";
    }
    if (reqType === "commission") {
      return "comYellow";
    }
  };
  const UserName = (firstName, lastName) => {
    return (
      firstName.charAt(0).toUpperCase() +
      firstName.slice(1) +
      " " +
      lastName.charAt(0).toUpperCase()
    );
  };
  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <>
          {props.isLoading ? 
          <RISkeletonLoading  loadingType={"RequirementPageHeader"}/>
          :
          <div className={`${classes.mainContainer} ${classes[bgColor()]}`}>
            <div className={classes.arrowAndMenuOption}>
              <div className={classes.backArrow}>
                {" "}
              </div>
              <div className={classes.menuOption}>

                {props.headerDetail.Status === "Approved" ? (
                  <div className={classes.menuButton} onClick={props.OnSharePOst}>Share post</div>
                ) : (
                  ""
                )}


                {(props.headerDetail.Status === "Approved" ||
                  props.headerDetail.Status === "Draft") &&
                  props.headerDetail.ClosePostButton ? (
                  <div
                    className={classes.menuButton}
                    onClick={
                      (props.headerDetail.Status === "Approved" &&
                        props.OnClosePOst) ||
                      ClosePostHandler
                    }
                  >
                    {props.headerDetail.Status === "Approved" ? (
                      <> Close Post</>
                    ) : (
                      <>Edit Post</>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>

            </div>
            <div className={classes.mainSkillContainer}>
              <div className={classes.workingPolicy}>
                {" "}

                Its a
                <span
                  className={classes[reqTypeColor(props.headerDetail.RequirementType)]}
                >
                  {" "}
                  {requirementTypeHandler(props.headerDetail.RequirementType)}
                </span>
              </div>
              <div className={classes.mainSkillStatus}> {statusHandler()}</div>
            </div>

            <div className={classes.skillAndStatus}>
              {props.headerDetail.Skills &&
                props.headerDetail.Skills.slice(0, 1).map((item, i) => {
                  return (
                    <h1 className={classes.mainSkill}>
                      {" "}
                      {UserName(props.headerDetail.FirstName, props.headerDetail.LastName)}{" "}
                      is hiring a{" "}
                      <span
                        className={`${classes.skillColor} ${classes[reqTypeColor(props.headerDetail.RequirementType)]
                          }`}
                      >
                        {props.headerDetail.FreelancerPolicy} {" "}
                      </span>{" "}
                      freelancer for{" "}
                      <span
                        className={`${classes.skillColor} ${classes[reqTypeColor(props.headerDetail.RequirementType)]
                          }`}
                      >
                        {contentCase(item.Skill)}{" "}
                      </span>
                    </h1>
                  );
                })}


            </div>
          </div>
    }
          </>
        );
        
      default: return (
        <>
         {props.isLoading ? 
          <RISkeletonLoading  loadingType={"RequirementPageHeader"}/>
          :
        <div className={`${classes.mainContainer} ${classes[bgColor()]}`}>
          <div className={classes.arrowAndMenuOption}>
            <div className={classes.backArrow}>
              {" "}
            </div>
            <div className={classes.menuOption}>

              {props.headerDetail.Status === "Approved" ? (
                <div className={classes.menuButton} onClick={props.OnSharePOst}>Share post</div>
              ) : (
                ""
              )}


              {(props.headerDetail.Status === "Approved" ||
                props.headerDetail.Status === "Draft") &&
                props.headerDetail.ClosePostButton ? (
                <div
                  className={classes.menuButton}
                  onClick={
                    (props.headerDetail.Status === "Approved" &&
                      props.OnClosePOst) ||
                    ClosePostHandler
                  }
                >
                  {props.headerDetail.Status === "Approved" ? (
                    <> Close Post</>
                  ) : (
                    <>Edit Post</>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={classes.workingPolicy}>
            {" "}

            Its a
            <span
              className={classes[reqTypeColor(props.headerDetail.RequirementType)]}
            >
              {" "}
              {requirementTypeHandler(props.headerDetail.RequirementType)}
            </span>
          </div>



          <div className={classes.skillAndStatus}>
            {props.headerDetail.Skills &&
              props.headerDetail.Skills.slice(0, 1).map((item, i) => {
                return (
                  <h1 className={classes.mainSkill}>
                    {" "}
                    {UserName(props.headerDetail.FirstName, props.headerDetail.LastName)}{" "}
                    is hiring a{" "}
                    <span
                      className={`${classes.skillColor} ${classes[reqTypeColor(props.headerDetail.RequirementType)]
                        }`}
                    >
                      {props.headerDetail.FreelancerPolicy} {" "}
                    </span>{" "}
                    freelancer for{" "}
                    <span
                      className={`${classes.skillColor} ${classes[reqTypeColor(props.headerDetail.RequirementType)]
                        }`}
                    >
                      {contentCase(item.Skill)}{" "}
                    </span>
                  </h1>
                );
              })}

            <div className={classes.mainSkill}> {statusHandler()}</div>
          </div>
        </div>
    }
        </>
      );
    }
  }
  return (
    <>
      {MobileWebHandlerSwitch(props.device)}
    </>
  )
};

export default RequirementPageHeader;
