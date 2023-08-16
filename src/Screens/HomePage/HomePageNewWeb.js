import React, { useState, useEffect} from "react";
import classes from "./HomePage.module.css";
import Loader from "react-loader-spinner";

import RiTextTransition from "../../Components/HomeAndLandingPages/RiTextTransition";
import FutureOfWork from "../../Components/HomeAndLandingPages/FutureOfWork";
import HowRiCanHelp from "../../Components/HomeAndLandingPages/HowRiCanHelp";
import ArticleAreaWeb from "../../Components/HomeAndLandingPages/ArticleAreaWeb";
import HireForOptions from "../../Components/HomeAndLandingPages/HireForOptions";
import JoinAsFreelancer from "../../Components/HomeAndLandingPages/JoinAsFreelancer";
import RequestACallBack from "../../Components/HomeAndLandingPages/RequestACallBack";
import TrustedByWeb from "../../Components/HomeAndLandingPages/TrustedByWeb";
import SkillsBasedWork from "../../Components/HomeAndLandingPages/SkillsBasedWork";
import NewRequirementCard from "../../Components/NewRequirement/NewRequirementCard";
import MatchedFreelaners from "../../Components/HomeAndLandingPages/MatchedFreelancers";
import { Helmet } from "react-helmet";
import { IoIosArrowForward } from "react-icons/io";
import { pageViewTracker } from "../../Components/GoogleTracking";
import RISkeletonLoading from "../../Components/RISkeletonLoading";
import RIModal from "../../Components/RIModal";



const HomePageNewWeb = () => {
  const [index, setIndex] = useState(0);
  const [requirementData, setRequirementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [articleData, setArticledata] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [bannerList, setBannerList] = useState([]);
  const [skill, setSkills] = useState([]);
  const [modal, setModal] = useState(false);



  useEffect(() => {
    RequirementData();
    pageViewTracker();
    Bannerlist()
    skillList();
  }, []);


  useEffect(() => {
    ArticleApiDataFetch();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(intervalId);
  }, []);

  const ArticleApiDataFetch = () => {
    setLoading(true);
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
      body: raw,

      headers: myHeaders,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/IspublishedArticle", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200) {
          setArticledata(result.data);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  };


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



  const RequirementData = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
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
        setBannerList(result.data[1].ImageURL)
      })

      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  }


  return (
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

      <Helmet>
      <script> window.prerenderReady = false; </script>
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
    <script> window.prerenderReady = true; </script>
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
                href={process.env.PUBLIC_URL + "/Step1PAR"}
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
                href={process.env.PUBLIC_URL + "/freelance-job-posting"}

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
        {loading ? <RISkeletonLoading loadingType={"Main_Banner"} />

          : <img
            src={process.env.PUBLIC_URL + bannerList}
            alt="Rozgaar_Service_MarketPlace"
            className={classes.MobviewBanner_image}
            loading="lazy"
            title="Rozgaar_Service_MarketPlace"
            width="100%"
            height="475px"
          />
        }

      </div>

      {loaded ? <RISkeletonLoading loadingType={"logo_on_home"} /> : (
        <TrustedByWeb />
      )}
   
        {loaded ? <RISkeletonLoading loadingType={"Matched_Freelaners"} /> : (
          <MatchedFreelaners />
        )}
  
        <FutureOfWork />
     
        <HireForOptions />
     
        <HowRiCanHelp />
      
        <NewRequirementCard
          RequirementData={requirementData}
          isLoading={isLoading}
        />
   
        <SkillsBasedWork getSkill={skill} />
    
        <ArticleAreaWeb articleCard={articleData} loading={loading} />
      
        <JoinAsFreelancer onClick={()=>setModal(true)}/>
   
        <RequestACallBack />
      

    
   
    </React.Suspense>
  );
};
export default HomePageNewWeb;
