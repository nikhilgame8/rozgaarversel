
import classes from "./HowRiCanHelp.module.css";
import NewHeadingRI from "../NewHeadingRI";
const HowRiCanHelp = (props) => {
  return (
    <>
      <div className={classes.HowRiCanHelpContainer}>
        <NewHeadingRI firstLine={"See how we can help you"} />
        <div className={classes.container}>
          <div className={classes.sectionContainer}>
            <div className={classes.iconContainer}>
              <img
                className={classes.icon}
                src= {process.env.PUBLIC_URL +"/assets/HomePage/yourRequirement.png"}
              
                alt="Tell_Us_Your_Requirement"
                title="Tell_Us_Your_Requirement"
                loading="lazy"
                width={"80px"}
                height={"80px"}
              />
            </div>
            <a href={process.env.PUBLIC_URL + "/Step1PAR"} className={classes.PARBtn_Link}>
              <h3 className={classes.headingofEachSection}>
                Tell us your requirement
              </h3>
            </a>

            <div className={classes.subHeadingWeb}>
              Answer a few questions and we’ll connect you with verified
              freelancers ready to work on your terms.
            </div>
            <img
              className={classes.tipIcon}
              src= {process.env.PUBLIC_URL +"/assets/HomePage/Tip.png"}
             
              alt="Tell_Us_Your_Requirement"
              title="Tell_Us_Your_Requirement"
              loading="lazy"
              width={"38px"}
              height={"45px"}
            />
            <div className={classes.proTip}>
              Tip: Upgrade to "Urgent" to receive freelancers within an hour{" "}
            </div>
            {props.screen && <div className="helpborder"> </div>}
          </div>

          <div className={classes.sectionContainer}>
            <div className={classes.iconContainer}>
              <img
                className={classes.icon}
                src= {process.env.PUBLIC_URL + "/assets/HomePage/freelancerMatching.png"}
              
                alt="Smart_Freelancer_Matching"
                title="Smart_Freelancer_Matching"
                loading="lazy"
                width={"80px"}
                height={"80px"}
              />
            </div>
            <a href={process.env.PUBLIC_URL + "/Step1PAR"} className={classes.PARBtn_Link}>
               <h3 className={classes.headingofEachSection}>
                Smart Freelancer Matching
              </h3>
            </a>

            <div className={classes.subHeadingWeb}>
              {" "}
              Receive top 5 trusted freelancers profiles.You can initiate a free chat
              to discuss your work.{" "}
            </div>
            <img
              className={classes.tipIcon}
              src={process.env.PUBLIC_URL + "/assets/HomePage/Tip.png"}
              alt="Smart_Freelancer_Matching"
              title="Smart_Freelancer_Matching"
              loading="lazy"
              width={"38px"}
              height={"45px"}
            />
            <div className={classes.proTip}>
              Tip: Unlock “waitlist” to review, compare and select the best
              Freelancers for your job{" "}
            </div>
            {props.screen && <div className="helpborder"> </div>}
          </div>

          <div className={classes.sectionContainer}>
            <div className={classes.iconContainer}>
              <img
                className={classes.icon}
                src={process.env.PUBLIC_URL + "/assets/HomePage/connectFreelancerr.png"}
                alt="Connect_With_The_Freelancer"
                title="Connect_With_The_Freelancer"
              loading="lazy"
              width={"80px"}
                height={"80px"}
              />
            </div>
            <a href={process.env.PUBLIC_URL + "/Step1PAR"} className={classes.PARBtn_Link}>
              <h3 className={classes.headingofEachSection}>
                Connect with the Freelancer
              </h3>
            </a>

            <div className={classes.subHeadingWeb}>
              {" "}
              Select the Freelancer(s) you want to hire, e-sign the NDA, discuss
              payment terms and timeline.
            </div>
            <img
              className={classes.tipIcon}
              
              src={process.env.PUBLIC_URL + "/assets/HomePage/Tip.png"}
              alt="NDA_with_Freelancer"
              title="NDA_with_Freelancer"
              loading="lazy"
              width={"38px"}
              height={"45px"}
            />
            <div className={classes.proTip}>
              Tip: Share non-disclosure agreement with the freelancer(s) to keep
              things confidential{" "}
            </div>
            {props.screen && <div className="helpborder"> </div>}
          </div>

          <div className={classes.sectionContainer}>
            <div className={classes.iconContainer}>
              <img
                className={classes.icon}
                src= {process.env.PUBLIC_URL + "/assets/HomePage/releasePayment.png"}
                alt="Secure_Payment_System"
                title="Secure_Payment_System"
                loading="lazy"
                width={"80px"}
                height={"80px"}
              />
            </div>
            <a href={process.env.PUBLIC_URL + "/Step1PAR"} className={classes.PARBtn_Link}>
              <h3 className={classes.headingofEachSection}>
                Secure Payment system
              </h3>
            </a>

            <div className={classes.subHeadingWeb}>
            When you pay, the funds will remain secured for a certain time and released to freelancer automatically. 

            </div>
            <img
              className={classes.tipIcon}
              
              src={process.env.PUBLIC_URL + "/assets/HomePage/Tip.png"}
              alt="Secure_Payment_System"
              title="Secure_Payment_System"
              loading="lazy"
              width={"38px"}
              height={"45px"}
            />
            <div className={classes.proTip}>
            Tip: Always pay your freelancers on our platform in order to assure maximum safety {" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowRiCanHelp;
