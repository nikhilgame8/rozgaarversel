import { useRef } from "react";
import classes from "./RecRequirmentCard.module.css";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded, BiDownArrow, BiUpArrow } from "react-icons/bi";
import "react-dropdown/style.css";
import RIDropDownMenu from "../RIDropDownMenu";
import { useState } from "react";
import { FcRules } from "react-icons/fc";
import useOnClickOutside from "../../Components/useOnClickOutside";
import ProfileIcon from "../HomeAndLandingPages/ProfileIcon";
import RISkeletonLoading from "../RISkeletonLoading";

const RecRequirmentCard = (props) => {
  const dropdownRef = useRef(null);
  const dropdownRefStatus = useRef(null);
  const [dropdownAddOns, setDropdownAddOns] = useState();
  const [dropdownStatus, setDropDownStatus] = useState();
  const [dropdownStatusIndex, setDropDownStatusIndex] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);

  useOnClickOutside(dropdownRef, () => {
    setDropdownAddOns(false);
  });
  useOnClickOutside(dropdownRefStatus, () => {
    setDropDownStatus(false);
  });

  const statusDropDownMenuOptions = [
    {
      key: "1",
      option: "Manage Requirement",
      icon: "A",
      onClick: "/ClientRequirementDetail/",
    },

    {
      key: "2",
      option: "Close Posting",
      icon: "B",
      onClick: "Close Posting",
    },
    {
      key: "2",
      option: "Share on Social",
      icon: "B",
      onClick: "Share on Social",
    },
    {
      key: "4",
      option: "Copy link",
      icon: "B",
      onClick: "copy",
    },
  ];
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

  const dropdownHandler = (type) => {
    if (type === "Addons") {
      setDropdownAddOns(!dropdownAddOns);
      setDropDownStatus(false);
    } else {
      setDropDownStatus(!dropdownStatus);
      setDropdownAddOns(false);
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
            title="Urgent_Logo"
            loading="lazy"
            width={" 20px"}
            height={"20px"}
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
            title="Urgent_Logo"
            loading="lazy"
            width={" 20px"}
            height={"20px"}
          />

          <span className={classes.AddonName}> {"Urgent"}</span>
        </div>
      );
    }
    if (type === "Project Manager") {
      return (
        <div className={classes.addonContainer}>
          <FcRules className={classes.addonNameIcon} />
          <span className={classes.AddonName}> {"Project Manager"}</span>
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
            title="Urgent_Logo"
            loading="lazy"
            width={"20px"}
            height={"20px"}
          />
          <span className={classes.AddonName}> {"NDA"}</span>
        </div>
      );
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
    if (status === "Closed") {
      return "Closed";
    }
    if (status === "Submitted") {
      return "In Review";
    }
    if (status === "Disapproved") {
      return "Rejected";
    }
  };

  const mainSkillHandler = (skill) => {
    if (!skill.length) {
      return "Please select skill";
    } else {
      let firstSkill = skill[0];

      let mainSkill =
        firstSkill.Skill.charAt(0).toUpperCase() + firstSkill.Skill.slice(1);
      return mainSkill;
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

  const applied = (applied, RequirementID) => {
    if (applied >= 1) {
      return (
        <div>
          {" "}
          Top {applied}{" "}
          <a
            class="linkTag"
            href={process.env.PUBLIC_URL + "/clientRequirementDetail/" + RequirementID}
            target="_blank"
          >
            {" "}
            <span className={classes.colorBlue}>
              {" "}
              Applications received{" "}
            </span>{" "}
          </a>{" "}
        </div>
      );
    } else {
      return ` ${applied} Applications received`;
    }
  };

  const waitList = (waitListData, RequirementID) => {
    if (waitListData >= 1) {
      return (
        <div>
          {" "}
          {`${waitListData} on Waitlist.`}{" "}
          <a
            class="linkTag"
            href={process.env.PUBLIC_URL + "/clientRequirementDetail/" + RequirementID}
            target="_blank"
          >
            <span className={classes.colorBlue}> Unlock </span>{" "}
          </a>{" "}
        </div>
      );
    } else {
      return `${waitListData} on Waitlist`;
    }
  };

  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <>
             {props.isLoading ?
              <RISkeletonLoading loadingType={"RecRequirementCard"} />
              :
            <div className={classes.mainContainer}>
              <div className={classes.webLayout}>
                {props.requirementsCard &&
                  props.requirementsCard.map((item, index) => {
                    return (
                      <div className={classes.mainCardContainer}>
                        <div className={classes.workingType}>
                          <div className={classes.mobileMenuOption}>
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
                          <div className={classes.dropDownStatus}>
                            <div className={classes.menuWithStatus}>
                              <div className={classes.statusAndMenu}>
                                {statusHandler(item.Status)}{" "}
                              </div>
                              <div
                                onClick={() => {
                                  setDropDownStatusIndex(index);
                                  dropdownHandler();
                                }}
                              >
                                {" "}
                                <BiDotsVerticalRounded
                                  fontSize={"20px"}
                                  className={classes.icondots}
                                />
                              </div>
                            </div>

                            {dropdownStatus && index === dropdownStatusIndex && (
                              <div ref={dropdownRefStatus}>
                                <RIDropDownMenu
                                  status={item.Status}
                                  Title={item.Title}
                                  device={"Mobile"}
                                  RequirementType={item.RequirementType}
                                  dropdownType={"Profile status"}
                                  optionData={statusDropDownMenuOptions}
                                  RequirementID={item.RequirementID}
                                  onClick={() =>
                                    props.ClosePost(item.RequirementID)
                                  }
                                />{" "}
                              </div>
                            )}
                          </div>
                        </div>

                        {item.Status === "Draft" ? (
                          <a class="linkTag" href={process.env.PUBLIC_URL + "/Step1PAR"}>
                            <div className={classes.skillContainer}>
                              {mainSkillHandler(item.Skills)}
                            </div>
                          </a>
                        ) : (
                          <a
                            class="linkTag"
                            href={process.env.PUBLIC_URL + 
                              "/clientRequirementDetail/" + item.RequirementID
                            }
                            target="_blank"
                          >
                            <div className={classes.skillContainer}>
                              {mainSkillHandler(item.Skills)}
                            </div>
                          </a>
                        )}

                        <div></div>

                        {item.Status === "Draft" ? (
                          <a class="linkTag" href={process.env.PUBLIC_URL + "/Step1PAR"}>
                            <div className={classes.titleArea}>
                              {item.Title}
                            </div>
                          </a>
                        ) : (
                          <a
                            class="linkTag"
                            href={process.env.PUBLIC_URL + 
                              "/clientRequirementDetail/" + item.RequirementID
                            }
                            target="_blank"
                          >
                            <div className={classes.titleArea}>
                              {item.Title}
                            </div>
                          </a>
                        )}

                        <div className={classes.statusAnddate}>
                          <div className={classes.postedDate}>
                            {" "}
                            {timeSince(new Date(item.UpdatedDate))} ago
                          </div>
                      
                        </div>
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
                        <div>
                          {" "}
                          {item.RequirementApplication.length ? (
                            <div className={classes.iconContainer}>
                              <ProfileIcon
                                appliedUser={item.RequirementApplication}
                                FirstName={"Swapnil"}
                                LastName={"Cha"}
                                type={"freelancerProfiles"}
                                device={"Mobile"}
                              />
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className={classes.highlightText}>
                            {item.Proposal.length > 0 ?
                              <>{item.Proposal.length}&nbsp; <span className={classes.colorBlue}>Proposal received</span></> :
                              <>{item.Proposal.length} Proposal received</>}
                          </div>
                          <div className={classes.highlightText}>
                            {" "}
                            {applied(item.Applied, item.RequirementID)}
                          </div>
                          <div className={classes.highlightText}>
                            {waitList(item.WaitList, item.RequirementID)}{" "}
                          </div>
                          {item.AvailableAddons.length && (
                            <>
                              <div className={classes.buttonWithIconContainer}>
                                <div className={classes.requirementCardButton}>
                                  {item.AvailableAddons.length > 0 ? (
                                    item.AvailableAddons[0].AddonName +
                                    "-" +
                                    "₹" +
                                    item.AvailableAddons[0].AddonAmount
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div
                                  className={classes.requirementCardButton}
                                  onClick={() => {
                                    setDropdownIndex(index);
                                    dropdownHandler("Addons");
                                  }}
                                >
                                  {dropdownAddOns ? (
                                    <BiUpArrow fontSize={"12px"} />
                                  ) : (
                                    <BiDownArrow fontSize={"12px"} />
                                  )}{" "}
                                </div>
                              </div>

                              {dropdownAddOns && index === dropdownIndex && (
                                <div ref={dropdownRef}>
                                  {" "}
                                  <RIDropDownMenu
                                    optionData={item.AvailableAddons}
                                    dropdownType={"Addons"}
                                    RequirementID={item.RequirementID}
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
             
            </div>
    }
          </>
                
        );

      default:
        return (
          <>
             {props.isLoading ?
              <RISkeletonLoading loadingType={"RecRequirementCard"} />
              :
            <div className={classes.mainContainer}>
              <div className={classes.webLayout}>
                {props.requirementsCard.length &&
                  props.requirementsCard.map((item, index) => {
                    return (
                      <div className={classes.mainCardContainer}>
                        <div className={classes.cardHeightSetting}>
                          <div className={classes.twoSectionDivider}>
                            <div className={classes.leftSectionWidth}>
                              <div className={classes.workingType}>
                                <div className={classes.workPolicy}>
                                  {item.FreelancerPolicy}{" "}
                                </div>
                                <div
                                  className={`${classes.workType} ${classes[workTypeColor(item.RequirementType)]
                                    }`}
                                >
                                  {" "}
                                  {workTypeColor(item.RequirementType)}
                                </div>
                              </div>

                              {item.Status === "Draft" ? (
                                <a class="linkTag" href={process.env.PUBLIC_URL + "/Step1PAR"}>
                                  <div className={classes.skillContainer}>
                                    {mainSkillHandler(item.Skills)}
                                  </div>
                                </a>
                              ) : (
                                <a
                                  class="linkTag"
                                  href={process.env.PUBLIC_URL + 
                                    "/clientRequirementDetail/" +
                                    item.RequirementID
                                  }
                                  target="_blank"
                                >
                                  <div className={classes.skillContainer}>
                                    {mainSkillHandler(item.Skills)}
                                  </div>
                                </a>
                              )}

                              {item.Status == "Draft" ? (
                                <a class="linkTag" href={process.env.PUBLIC_URL + "/Step1PAR"}>
                                  <div className={classes.titleArea}>
                                    {item.Title}
                                  </div>
                                </a>
                              ) : (
                                <a
                                  class="linkTag"
                                  href={process.env.PUBLIC_URL + 
                                    "/clientRequirementDetail/" +
                                    item.RequirementID
                                  }
                                  target="_blank"
                                >
                                  <div className={classes.titleArea}>
                                    {item.Title}
                                  </div>
                                </a>
                              )}
                              <div className={classes.statusAnddate}>
                                <div className={classes.postedDate}>
                                  {" "}
                                  {timeSince(new Date(item.UpdatedDate))} ago
                                </div>
                              </div>
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
                            </div>
                            <div className={classes.rightSection}>
                              <div className={classes.dropDownStatus}>
                                <div className={classes.menuWithStatus}>
                                  <div className={classes.statusAndMenu}>
                                    {" "}
                                    {statusHandler(item.Status)}{" "}
                                  </div>
                                  <div
                                    onClick={() => {
                                      setDropDownStatusIndex(index);
                                      dropdownHandler();
                                    }}
                                  >
                                    {" "}
                                    <BiDotsVerticalRounded
                                      fontSize={"20px"}
                                      className={classes.icondots}
                                    />
                                  </div>
                                </div>

                                {dropdownStatus &&
                                  index === dropdownStatusIndex && (
                                    <div ref={dropdownRefStatus}>
                                      <RIDropDownMenu
                                        optionData={statusDropDownMenuOptions}
                                        status={item.Status}
                                        Title={item.Title}
                                        RequirementType={item.RequirementType}
                                        dropdownType={"Profile status"}
                                        RequirementID={item.RequirementID}
                                        onClick={() =>
                                          props.ClosePost(item.RequirementID)
                                        }
                                      />{" "}
                                    </div>
                                  )}
                              </div>
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
                              <div>
                                {" "}
                                {item.RequirementApplication.length ? (
                                  <div className={classes.iconContainer}>
                                    <ProfileIcon
                                      appliedUser={item.RequirementApplication}
                                      FirstName={"Swapnil"}
                                      LastName={"Cha"}
                                      type={"freelancerProfiles"}
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                                <div className={classes.highlightText}>
                                  {item.Proposal.length > 0 ?
                                    <>{item.Proposal.length}&nbsp; <span className={classes.colorBlue}>Proposal received</span></> :
                                    <>{item.Proposal.length} Proposal received</>}
                                </div>
                                <div className={classes.highlightText}>
                                  {" "}
                                  {applied(item.Applied, item.RequirementID)}
                                </div>
                                <div className={classes.highlightText}>
                                  {waitList(item.WaitList, item.RequirementID)}{" "}
                                </div>
                                {item.AvailableAddons.length > 0 && (
                                  <>
                                    <div
                                      className={
                                        classes.buttonWithIconContainer
                                      }
                                    >
                                      <div
                                        className={
                                          classes.requirementCardButton
                                        }
                                      >
                                        {item.AvailableAddons.length > 0 ? (
                                          item.AvailableAddons[0].AddonName +
                                          "-" +
                                          "₹" +
                                          item.AvailableAddons[0].AddonAmount
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div
                                        className={
                                          classes.requirementCardButton
                                        }
                                        onClick={() => {
                                          setDropdownIndex(index);
                                          dropdownHandler("Addons");
                                        }}
                                      >
                                        {dropdownAddOns ? (
                                          <BiUpArrow fontSize={"12px"} />
                                        ) : (
                                          <BiDownArrow fontSize={"12px"} />
                                        )}{" "}
                                      </div>
                                    </div>

                                    {dropdownAddOns && index === dropdownIndex && (
                                      <div ref={dropdownRef}>
                                        {" "}
                                        <RIDropDownMenu
                                          optionData={item.AvailableAddons}
                                          dropdownType={"Addons"}
                                          RequirementID={item.RequirementID}
                                        />
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
    }
          </>
        );
    }
  };

  return <>{MobileWebHandlerSwitch(props.device)}</>;
};

export default RecRequirmentCard;
