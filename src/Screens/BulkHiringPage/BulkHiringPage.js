import React, { useEffect } from "react";
import classes from "./BulkHiringPage.module.css";
import { useNavigate } from "react-router";
import {FcAssistant,FcBusinessman,FcDebt,FcBarChart,FcAutomatic,FcCameraAddon,} from "react-icons/fc";
import { Helmet } from "react-helmet";
import { pageViewTracker } from "../../Components/GoogleTracking";

const BulkHiringPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
 
    pageViewTracker();
  }, []);

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>{`Enterprise Hiring Solution | Rozgaar`}</title>
        <meta
          name="description"
          content={`Remote, Onsite, Hybrid and flexible short-term contract workforce that fits your freelance hiring needs. `}
       
       />
           <link rel="canonical" href="https://www.rozgaarindia.com/enterprise-freelancer-hiring-solution" /> 
      </Helmet>
      <div className={classes.bannerTextAndImage}>
        <img
          src={process.env.PUBLIC_URL +  "/assets/bulkhiring/Bulk_hiring_web_main_banner.webp"}
          className={classes.BulkHiringbannerImage}
          alt="Rozgaar_Bulk_Remote_Hiring"
          loading="lazy"
          title="Rozgaar_Bulk_Remote_Hiring"
          width={"100%"}
          height={"300px"}
        />
          <img
          src={process.env.PUBLIC_URL + "/assets/bulkhiring/Bulk_hiring_web_main_banner.webp"}
          className={classes.BulkHiringbannerImageWeb}
          alt="Rozgaar_Bulk_Remote_Hiring"
          loading="lazy"
          title="Rozgaar_Bulk_Remote_Hiring"
          width={"100%"}
          height={"430px"}
        />
        <div className={classes.bannerText}>
          <h1 className={classes.textHeadingBold}>Bulk Remote Freelancer Hiring </h1>

          <h2 className={classes.textHeading}>
            Cut costs and time with our enterprise mass hiring solution{" "}
          </h2>
         
          <button
            className={classes.requirementButton}
            onClick={() => navigate(process.env.PUBLIC_URL +"/Step1PAR")}
          >
            Post a requirement
          </button>
        </div>
      </div>

      <h3 className={classes.BulkHiringDesc}>
        Rozgaar bulk hiring is a one stop solution that helps businessess find
        high-quality pool of skilled gig workers that fulfil the requirements
        and accelerate the business growth. We transform the way employees and
        businesses are collaborating with freelancers to generate extraordinary
        results working remotely. We give global enterprises an access to the
        best talents to drive their business priorities and scale effectively.
        <h3 className={classes.list}>
          Leverage our 1 Lac+ on-demand talent pool available across all major
          cities in India.
        </h3>
      </h3>

      <h2 className={classes.bulkhiringHeading}>
        Popular Solutions to expand your business
      </h2>
      <div className={classes.skillsFlex}>
        <div className={classes.skills} onClick={() => navigate(process.env.PUBLIC_URL +"/Step1PAR")}>
          <FcBarChart className={classes.solutionIcons} />
          <h3>
            Inside <br /> Sales
          </h3>
        </div>

        <div className={classes.skills} onClick={() => navigate(process.env.PUBLIC_URL +"/Step1PAR")}>
          <FcAssistant className={classes.solutionIcons} />
          <h3>
            Support
            <br /> Executives
          </h3>
        </div>

        <div className={classes.skills} onClick={() => navigate(process.env.PUBLIC_URL +"/Step1PAR")}>
          <FcAutomatic className={classes.solutionIcons} />
          <h3>
            Customer Support
            <br /> Associates
          </h3>
        </div>

        <div className={classes.skills} onClick={() => navigate(process.env.PUBLIC_URL +"/Step1PAR")}>
          <FcBusinessman className={classes.solutionIcons} />
          <h3>
            Agent and <br /> Surveyors
          </h3>
        </div>

        <div className={classes.skills} onClick={() => navigate(process.env.PUBLIC_URL +"/Step1PAR")}>
          <FcCameraAddon className={classes.solutionIcons} />
          <h3>
            Social Media
            <br /> Influencers{" "}
          </h3>
        </div>

        <div className={classes.skills} onClick={() => navigate(process.env.PUBLIC_URL +"/Step1PAR")}>
          <FcDebt className={classes.solutionIcons} />
          <h3>
            Point of Sales <br /> person
          </h3>
        </div>
      </div>

      <div className={classes.flex}>
        <div className={classes.bulkHiringlookingFor}>
          <h2 className={classes.bulkHiringBold}>Have a Bulk Hiring </h2>

          <h2 className={classes.bulkHiringBold}>Requirement?</h2>

          <button
            className={classes.BulkHiringbutton}
            onClick={() => navigate(process.env.PUBLIC_URL +"/Step1PAR")}
          >
            Post a requirement
          </button>
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/assets/bulkhiring/bulkHiringBanner.jpg"}
            className={classes.bannerImage}
            alt="Have_A_Bulk_Hiring_Requirement_Rozgaar"
            loading="lazy"
            title="Have_A_Bulk_Hiring_Requirement_Rozgaar"
            width={"100%"}
            height={"300px"}
          />
          <img
            src={process.env.PUBLIC_URL + "/assets/bulkhiring/bulkHiringBanner.jpg"}
            className={classes.bannerImageWeb}
            alt="Have_A_Bulk_Hiring_Requirement_Rozgaar"
            loading="lazy"
            title="Have_A_Bulk_Hiring_Requirement_Rozgaar"
            width={"100%"}
            height={"450px"}
          />
        </div>
      </div>
     
    </>
  );
};

export default BulkHiringPage;
