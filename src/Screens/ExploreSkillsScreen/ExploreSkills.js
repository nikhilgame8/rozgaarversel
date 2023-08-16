import React, { useEffect } from "react";
import classes from "./ExploreSkills.module.css";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import ExploreSkillsNavbar from "../../Components/ExploreSkills/ExploreSkillsNavbar";
import { pageViewTracker } from "../../Components/GoogleTracking";

const ExploreSkills = () => {
  useEffect(() => {
  
    pageViewTracker();
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Freelance Skills Examples | Rozgaar India`}</title>
        <meta
          name="description"
          content={`Top In-demand Freelance skills. Data Entry, Programmer, Website developer, App developer, Social media Expert. Customer Suport agents, Content Writers, Graphic Designers `}
       
       />
            <link rel="canonical" href="https://www.rozgaarindia.com/skills" /> 
      </Helmet>
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
        <div className={classes.ExploreSkills_maincontainer}>
          <img
            src={process.env.PUBLIC_URL + "/assets/ExploreSkill/exploreskillsbanner.jpg"}
            alt="Explore_the_most_In_demand_Freelancer_Skills"
            className={classes.ExploreSkills_img}
            width={"100%"}
            height={"146px"}
            loading="lazy"
            title="Explore_the_most_In_demand_Freelancer_Skills"
          />
          <img
            src={process.env.PUBLIC_URL + "/assets/ExploreSkill/Skill_Web_banner.webp"}
            alt="Explore_the_most_In_demand_Freelancer_Skills"
            className={classes.ExploreSkills_imgweb}
            width={"100%"}
            height={"280px"}
            loading="lazy"
            title="Explore_the_most_In_demand_Freelancer_Skills"
          />
          <div className={classes.ExploreSkills_maintext}>
            <h1 className={classes.ExploreSkills_heading}>
              Explore the most
              <br />
              In-demand Freelancer Skills
            </h1>
            <div className={classes.ExploreSkills_subheading}>
              Each skill includes a pool of talented
              <br />
              freelancers to hire on our
              <br />
              work marketplace
            </div>
          </div>
        </div>
        <div className={classes.partnerCompanies_border}></div>
        <div className={classes.partnerCompanies_about}>
          <ExploreSkillsNavbar />
        </div>
 
      </React.Suspense>
    </div>
  );
};

export default ExploreSkills;
