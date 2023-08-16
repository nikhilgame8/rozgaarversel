import React, { useState, useEffect } from "react";
import classes from "./HomePage.module.css";
import Loader from "react-loader-spinner";
import RiTextTransition from "../../Components/HomeAndLandingPages/RiTextTransition";
import FutureOfWork from "../../Components/HomeAndLandingPages/FutureOfWork";
import HowRiCanHelp from "../../Components/HomeAndLandingPages/HowRiCanHelp";
import HireForOptions from "../../Components/HomeAndLandingPages/HireForOptions";
import JoinAsFreelancer from "../../Components/HomeAndLandingPages/JoinAsFreelancer";
import RequestACallBack from "../../Components/HomeAndLandingPages/RequestACallBack";
import SkillsBasedWork from "../../Components/HomeAndLandingPages/SkillsBasedWork";
import NewRequirementCard from "../../Components/NewRequirement/NewRequirementCard";
import MatchedFreelaners from "../../Components/HomeAndLandingPages/MatchedFreelancers";
import { Helmet } from "react-helmet";
import ArticleAreaWeb from "../../Components/HomeAndLandingPages/ArticleAreaWeb";
import { pageViewTracker } from "../../Components/GoogleTracking";
import RISkeletonLoading from "../../Components/RISkeletonLoading";
import RIModal from "../../Components/RIModal";
import CreqDetail from "../../Components/ClientReqNew/CreqDetail";
import CfutureOfWork from "../../Components/NewHomePage/CfurtureOfWork";
import { IoIosArrowForward } from "react-icons/io";
import ChowCanWeHelp from "../../Components/NewHomePage/ChowCanWeHelp";


const ActionButton = React.lazy(() => import("../../Components/ActionButton"));
const TrustedBy = React.lazy(() =>
  import("../../Components/HomeAndLandingPages/TrustedBy")
);

const HomePageNew = () => {
  const [requirementData, setRequirementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [creqloading, setCreqLoading] = useState(true);

  const [articleData, setArticledata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerList, setBannerList] = useState([])
  const [skill, setSkills] = useState([]);
  const [modal, setModal] = useState(false);


  useEffect(() => {
    pageViewTracker()
    skillList();

    RequirementData();
    Bannerlist()
  }, []);

  useEffect(() => {
    ArticleApiDataFetch();
  }, []);

  const skillList = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/freelancerapp/rozgaarapi/AllRequirementSkill",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === 'Success') {
          setSkills(result.data);
        }
        else {

        }
      })
      .catch((error) => console.log("error", error));
  };

  const ArticleApiDataFetch = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "ArticleType": "Client"
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/IspublishedArticle", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200) {
          setArticledata(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const Bannerlist = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "BannerType": "home"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api-preview.rozgaarindia.com/api/freelancerapp/rozgaarapi/BannerImageList", requestOptions)
      .then(response => response.json())
      .then((result) => {
        setBannerList(result.data[0].ImageURL)
      })

      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  }

  const RequirementData = () => {
    setIsLoading(true);
    setCreqLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = "";
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      global.apiLink + "/api/client/RequirementListPublicView",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setRequirementData(result.data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
        setCreqLoading(false);
      });
  };
 
  return (
    <React.Suspense
      fallback={
        <div className={classes.pageLoader}>
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Freelance Jobs & Projects | Rozgaar India`}</title>
        <meta
          name="description"
          content={`Post a job requirement,hire professional freelancers from India to work remotely,onsite or hybrid.Get quotes from independent short term contractors `}

        />
        <link rel="canonical" href="https://www.rozgaarindia.com/" />

        <meta property="og:title" content="Freelance Jobs & Projects | Rozgaar India" />
    <meta property="og:description" content="Post a job requirement,hire professional freelancers from India to work remotely,onsite or hybrid.Get quotes from independent short term contractors" />
    <meta property="og:image" content="https://www.rozgaarindia.com/rozgaarFreelancer.png" />
    <meta property="og:type" content="Jobs" />
    <meta property="og:url" content="https://www.rozgaarindia.com" />

    <meta property="twitter:image" content="$OG_IMAGE" />
    <meta property="twitter:title" content="$OG_TITLE" />
    <meta property="twitter:description" content="$OG_DESCRIPTION" />
    <meta property="twitter:card" content="summary" />
    <meta property="twitter:site" content="@rozgaarindia" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta property="og:image:width" content="200" />
    <meta property="og:image:height" content="200" />
      </Helmet>
      <script type="application/ld+json"

        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://www.rozgaarindia.com/",
            "logo": "https://www.rozgaarindia.com/assets/IPassets/Rozgaar_Black_Logo.svg"
          }
          )
        }}

      />
      {modal && (
               <RIModal RIModalType={"RedirectFreelancer"} onClick={() => setModal(false)} href={process.env.PUBLIC_URL +"https://freelancer.rozgaarindia.com/signup"} onHrefClick={()=>setModal(false)}/>
            )}

<div className={classes.top_image_container}>
        <div className={classes.headingPositionMain}>
         
          <h1 className={classes.headingMain}> HIRE REMOTE     <div className={classes.headingMainSecondPart}>FREELANCERS</div> </h1>
          <div className={classes.animationText}>
            {" "}
            <RiTextTransition />
            <div className={classes.ActionButton}>
              <a
                href={"/Step1PAR"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className={classes.PARBtn_Link}
              >
                {" "}
                <div className={classes.arrowAndButtonTextMain}>
                  <h2>Post a Job for free  </h2>
                  <IoIosArrowForward size={22} />
                </div>

              </a>
              <a
                href={"/freelance-job-posting"}

                className={classes.PARBtn_Link}
              >
                {" "}
                <div className={classes.arrowAndButtonText}>
                  <h2>Freelance Jobs & Projects  </h2>
                  <IoIosArrowForward size={22} />
                </div>

              </a>
            </div>
          </div>
        </div>
        {  loading ? <RISkeletonLoading loadingType={"Main_Banner"}/>:
        <img
          className={classes.MobviewBanner_image}
          src={process.env.PUBLIC_URL + "/assets/banners/CMobileBannerFourth.webp"}
          alt="Rozgaar_Service_MarketPlace" 
          loading="lazy"
          title="Rozgaar_Service_MarketPlace"
          width= "100%"
/*           
          height= "375px" */
        />}
      </div>

     {/*  <div className={classes.top_image_container}>
        <div className={classes.headingPositionMain}>

          <h1 className={classes.headingMain}> HIRE REMOTE     <div className={classes.headingMainSecondPart}>FREELANCERS</div> </h1>
          <div className={classes.animationText}>
            {" "}
            <RiTextTransition />
            <div className={classes.ActionButton}>
              <a
                href={process.env.PUBLIC_URL + "/Step1PAR"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className={classes.PARBtn_Link}
              >
                {" "}
                <ActionButton
                  buttonType="left"
                  buttonText="Post a Job for free"
                />
              </a>
            </div>
          </div>
        </div>
        {loading ? <RISkeletonLoading loadingType={"Main_Banner"} /> :
          <img
            className={classes.MobviewBanner_image}
            src={process.env.PUBLIC_URL + bannerList}
            alt="Rozgaar_Service_MarketPlace"
            loading="lazy"
            title="Rozgaar_Service_MarketPlace"
            width="100%"
            height="375px"
          />}
      </div> */}
       <TrustedBy />
      <div className={classes.headingAndBorder}> 
      <a
            href="/freelance-job-posting"
            className="linkTag"
          >
      <h2 className={classes.reqHeading}> Recent Freelance job post on Rozgaar  </h2>
      </a>
      <div className={classes.borderGreen}></div>
      </div>
    
      <CreqDetail   RequirementData={requirementData}
        isLoading={isLoading} 
        creqloading={creqloading}/>
         <CfutureOfWork />
         
      <MatchedFreelaners />
   
     {/*  <FutureOfWork /> */}
     
   {/*    <ChowCanWeHelp /> */}
      <HireForOptions />
{/*       <HowRiCanHelp screen={"mobile"} /> */}

{/*       <NewRequirementCard
        RequirementData={requirementData}
        isLoading={isLoading}
      /> */}
      <SkillsBasedWork getSkill={skill} />
      <ArticleAreaWeb articleCard={articleData} isLoading={isLoading} device="Mobile" />
      <JoinAsFreelancer onClick={()=>setModal(true)}/>
      <RequestACallBack />
    </React.Suspense>
  );
};
export default HomePageNew;
