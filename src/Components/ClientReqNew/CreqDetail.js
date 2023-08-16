
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import RISkeletonLoading from '../RISkeletonLoading';
import classes from './CreqDetail.module.css'

const CreqDetail = (props) => {
const navigate=useNavigate()
  const [skillList, setSkillList] = useState();
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
    } else {
      let firstSkill = skill[0];

      let mainSkill =
        firstSkill.Skill.charAt(0).toUpperCase() + firstSkill.Skill.slice(1);
      return mainSkill;
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

  const budget = (unit, workType) => {
    return (
      <>
        {/*   {currency}
            {budget} */}
        {workType === "onetime" ? (
          <span className={classes.budgetUnit}>Fixed Price </span>
        ) : (
          <span className={classes.budgetUnit}>{unit}</span>
        )}
      </>
    );
  };
  const changeData=(value)=>{
    let chnagePTag = value.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "");
    let htmlDescription = chnagePTag.replace(/(\r\n|\r|\n)/g, '<br>');
    return  htmlDescription
  }
  return (
    <div className={classes.mainContainer}>

{props.creqloading ? (
                <div >
                  <RISkeletonLoading loadingType={"PublicRecRequirementCard"} />
                </div>

              ) : (
                <>
      {props.RequirementData &&
        props.RequirementData.slice(0, 4).map((item, index) => {
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
                  <div className={classes.newTag}> New </div>
                  <div className={classes.dateArea}> {mainSkillHandler(item.Skills)} - <span>     {timeSince(new Date(item.UpdatedDate))} ago</span></div>

                </div>
                <div className={classes.mainReqPoints}>
                  <div className={classes.reqPointsContainer}>
                    <div className={classes.priceFont}>{item.BudgetCurrency} {item.Budget} </div>
                    <div className={classes.priceType}> {budget(item.BudgetUnit, item.RequirementType)} </div>
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

              { item.DescriptionHTML? <div className={classes.shortDesc} ><span  dangerouslySetInnerHTML={{__html: changeData(item.DescriptionHTML).slice(0, 140)}}/><span onClick={()=>navigate("/freelancer-" + UrlType(item.RequirementType) + "-job" + "/" + item.Title.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-") + "/" + item.RequirementID)} >...</span></div>:
                      <><div className={classes.shortDesc}  >{item.Description.slice(0, 140)}<span onClick={()=>navigate("/freelancer-" + UrlType(item.RequirementType) + "-job" + "/" + item.Title.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-") + "/" + item.RequirementID)} className={classes.threeDots}>...</span></div></>
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
          )
        }
        )}
        </>
              )}
      <a
        href={process.env.PUBLIC_URL +"/freelance-job-posting"}
        className="linkTag"
      >
        <div className={classes.moreJobsButton}> View More Jobs</div>
      </a>
    </div>

  )

}


export default CreqDetail;