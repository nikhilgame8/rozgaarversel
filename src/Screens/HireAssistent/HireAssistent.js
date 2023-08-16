import React, { useEffect } from "react";
import classes from "./HireAssistent.module.css";
import NewClientDashboardMobile from "../NewClientDashboard/NewClientDashboardMobile";
import NewClientDashboard from "../NewClientDashboard/NewClientDashboard";
import RozgaarAssistant from "../../Components/HireAssistant/RozgaarAssistant";
import HireAssistantButton from "../../Components/HireAssistant/HireAssistantButton";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { pageViewTracker } from "../../Components/GoogleTracking";

const HireAssistent = (props) => {

  useEffect(() => {
   
    pageViewTracker();
  }, []);

  const BannerCard = [
    {
      TextFirst: "Your Rozgaar",
      TextFirstSecondLine: "Assistant will",
      TextSecond: "Understand your ",
      TextSecondSecondLine: "hiring requirement",
      Img: "./assets/HireAssistent/IconFirst.svg",
      alt:"Understand_Your_Hiring_Requirement",
      title:"Understand_Your_Hiring_Requirement"
    },
    {
      TextFirst: "Your Rozgaar",
      TextFirstSecondLine: "Assistant will",
      TextSecond: "Post your ",
      TextSecondSecondLine: "requirement",
      Img: "./assets/HireAssistent/IconSecond.svg",
      alt:"Post_Your_Requirement",
      title:"Post_Your_Requirement"
    },
    {
      TextFirst: "Your Rozgaar",
      TextFirstSecondLine: "Assistant will",
      TextSecond: "Select the ",
      TextSecondSecondLine: "freelancer",
      Img: "./assets/HireAssistent/IconThird.svg",
      alt:"Select_The_Freelancer",
      title:"Select_The_Freelancer"
    },
    {
      TextFirst: "Your Rozgaar",
      TextFirstSecondLine: "Assistant will",
      TextSecond: "Track progress",
      TextSecondSecondLine: " of the work",
      Img: "./assets/HireAssistent/IconFour.svg",
      alt:"Track_Progress_Of_The_Work",
      title:"Track_Progress_Of_The_Work"
    },
  ];

  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
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
            <NewClientDashboardMobile>
              <div className={classes.pageLayout}>
                <h1 className={classes.MobileMainBannerImgTextFirst}>
                  Rozgaar Assistant
                </h1>
                <h2 className={classes.MobileMainBannerImgTextSecond}>
                  Next-level support for you and your business
                </h2>
                <div className={classes.MobileMainBannerHireButton}>
                  <HireAssistantButton
                    device={"Mobile"}
                    Link={"/RazorPayGateway/"}
                  />
                </div>
                <img
                  src={process.env.PUBLIC_URL + "/assets/HireAssistent/MobileMainBannerImg.jpg"}
                  className={classes.banner_image}
                  alt="Rozgaar_Assistant"
                  title="Rozgaar_Assistant"
                  loading="lazy"
                  width={"100%"}
                  height={"500px"}
                />
                <div className={classes.BannercardContanier}>
                  {BannerCard.map((item) => {
                    return (
                      <div className={classes.Bannercard}>
                        <img
                          src={process.env.PUBLIC_URL + item.Img}
                          className={classes.BannercardIcon}
                          alt={item.alt}
                          title={item.title}
                          loading="lazy"
                          width={"30px"}
                          height={"30px"}
                        />
                        <h3 className={classes.BannercardTextFirst}>
                          {item.TextFirst}
                          <br />
                          {item.TextFirstSecondLine}
                        </h3>
                        <h3 className={classes.BannercardTextSecond}>
                          {item.TextSecond}
                          <br />
                          {item.TextSecondSecondLine}
                        </h3>
                      </div>
                    );
                  })}
                </div>
                <div className={classes.Text_Container}>
                  <RozgaarAssistant />
                </div>
                <div className={classes.SecondBannerImgContainer}>
                  <div className={classes.SecondBannerTextContainer}>
                    <h3 className={classes.SecondBannerTextFirst}>
                      Hire Skilled
                    </h3>
                    <h2 className={classes.SecondBannerTextSecond}>
                      Personal Assistant
                    </h2>
                    <h3 className={classes.SecondBannerTextThird}>
                      and make hiring easy on Rozgaar.
                    </h3>
                    <div className={classes.SecondBannerHireButton}>
                      <HireAssistantButton />
                    </div>
                  </div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/HireAssistent/MobileBannerImg.jpg"}
                    className={classes.SecondBackground_image}
                    alt="Hire_Skilled_Personal_Assistant_Rozgaar"
                    title="Hire_Skilled_Personal_Assistant_Rozgaar"
                    loading="lazy"
                    width={"100%"}
                    height={"250px"}
                  />
                </div>
              </div>
            </NewClientDashboardMobile>
          </React.Suspense>
        );

      default:
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
              <NewClientDashboard>
                <div className={classes.pageLayout}>
                  <div className={classes.HireAssistantMainContainer}>
                    <h1 className={classes.WebMainBannerImgTextFirst}>
                      Rozgaar Assistant
                    </h1>
                    <h2 className={classes.WebMainBannerImgTextSecond}>
                      Next-level support for you and <br /> your business
                    </h2>
                    <div className={classes.WebMainBannerHireButton}>
                      <HireAssistantButton device={"Mobile"} />
                    </div>
                  </div>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/HireAssistent/WebMainBanner.png"}
                    className={classes.Webbanner_image}
                    alt="Rozgaar_Assistant"
                    title="Rozgaar_Assistant"
                    loading="lazy"
                    width={"100%"}
                    height={"450px"}
                  />
                  <div className={classes.WebBannercardContanier}>
                    {BannerCard.map((item) => {
                      return (
                        <div className={classes.WebBannercard}>
                          <img
                            src={item.Img}
                            className={classes.WebBannercardIcon}
                            alt={item.alt}
                            title={item.title}
                            loading="lazy"
                            width={"50px"}
                            height={"50px"}
                          />
                          <h3 className={classes.WebBannercardTextFirst}>
                            {item.TextFirst}
                            <br />
                            {item.TextFirstSecondLine}
                          </h3>
                          <h3 className={classes.WebBannercardTextSecond}>
                            {item.TextSecond}
                            <br />
                            {item.TextSecondSecondLine}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                  <div className={classes.Text_Container}>
                    <RozgaarAssistant />
                  </div>
                  <div className={classes.WebSecondBannerImgContainer}>
                    <div className={classes.WebSecondBannerTextContainer}>
                      <h3 className={classes.WebSecondBannerTextFirst}>
                        Hire Skilled
                      </h3>
                      <h2 className={classes.WebSecondBannerTextSecond}>
                        Personal Assistant
                      </h2>
                      <h3 className={classes.WebSecondBannerTextThird}>
                        and make hiring easy on <br />
                        Rozgaar.
                      </h3>
                      <div className={classes.WebMainBannerHireButton}>
                        <HireAssistantButton device={"Mobile"} />
                      </div>
                    </div>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/HireAssistent/WebSecondBanner.jpg"}
                      className={classes.WebSecondBackground_image}
                      alt="Hire_Skilled_Personal_Assistant_Rozgaar"
                      title="Hire_Skilled_Personal_Assistant_Rozgaar"
                      loading="lazy"
                      width={"100%"}
                      height={"400px"}
                    />
                  </div>
                </div>
              </NewClientDashboard>
            </React.Suspense>
          </>
        );
    }
  };

  return (
    <>
      {" "}
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Best Remote work and freelance projects at RozgaarIndia.com via Times Ascent`}</title>
        <meta
          name="description"
          content={`Rozgaar India is one of India's Leading online service marketplace for remote work and freelance projects. You can find the best skilled online service providers at RozgaarIndia.com`}
        />
      </Helmet>
      {MobileWebHandlerSwitch(props.device)}
    </>
  );
};
export default HireAssistent;
