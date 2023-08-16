import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import HireType from "../../Components/HowToHireComps/HireType";
import NewHeadingRI from "../../Components/NewHeadingRI";
import HireTypeWeb from "../../Components/HowToHireComps/HireTypeWeb";
import HowToHireSec from "../../Components/HowToHireComps/HowToHireSec";
import classes from "./HowToHire.module.css";
import { Link } from "react-router-dom";
import Faqdropdown from "../FrequentlyAskedQuestions/Faqdropdown";
import { Helmet } from "react-helmet";

const ActionButton = React.lazy(() => import("../../Components/ActionButton"));

const HowToHire = (props) => {
  const [show, setShow] = useState();
  const [Data, setData] = useState([]);
  const [question] = useState([]);
  const [answer] = useState([]);

  useEffect(() => {
    FrequentlyAskedQuestions();
  }, []);

  const FrequentlyAskedQuestions = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Question: question,
      Answer: answer,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/GetFaq", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <div className={classes.contentDiv}>
            <h1 className={classes.heading}>
              Hire Expert Freelancers
            </h1>
            <h2 className={classes.subHeading}>
              India’s leading secure and flexible platform to hire
              <br /> remote freelancers
            </h2>
            <a href={process.env.PUBLIC_URL + "/Step1PAR"} className={classes.PARBtn_Link}>
              {" "}
              <ActionButton
                buttonText={"Post a Requirement"}
                buttonType={"left"}
              />
            </a>
            <img
              src={process.env.PUBLIC_URL + "/assets/banners/how_to_hire_mobile_banner.jpg"}
              className={classes.bannerMob}
              alt="Hire_Expert_Freelancers_Rozgaar"
              width={"100%"}
              height={"300px"}
              loading="lazy"
              title="Hire_Expert_Freelancers_Rozgaar"
            />
            <h2 className={classes.workTypeHeading}>Find your Freelancer</h2>

            <HireType />
            <h2 className={classes.workTypeHeading}>How to hire?</h2>

            <HowToHireSec />
            <h2 className={classes.faqHeading}>FAQ</h2>

            <div className={classes.faqMainDiv}>
              {Data.slice(0, show ? show.length : 5).map((item, value) => {
                return (
                  <>
                    <Faqdropdown question={item.Question} answer={item.Answer} />
                  </>
                );
              })}
            </div>
            <div className={classes.faq_ActionButton}>
              {!show ? (
                <ActionButton
                  buttonText={"View More"}
                  buttonType={"small"}
                  onClick={() => setShow(true)}
                />
              ) : (
                <ActionButton
                  buttonText={"View less"}
                  buttonType={"small"}
                  onClick={() => setShow(false)}
                />
              )}
            </div>
          </div>

        );

      default:
        return (
          <div className={classes.mainDiv}>
            <div className={classes.imageDiv}>
              <div className={classes.headingDiv}>
                <h1 className={classes.mainHeading}>Hire Expert Freelancers</h1>
                <h2 className={classes.subHeading}>
                  India’s leading secure and flexible platform to hire
                  <br /> remote freelancers
                </h2>
                <a href={process.env.PUBLIC_URL + "/Step1PAR"} className={classes.PARBtn_Link}>
                  <ActionButton
                    buttonText={"Post Requirement"}
                    buttonType={"left"}
                  />
                </a>
              </div>
              <img
                src={process.env.PUBLIC_URL + "/assets/banners/how_to_hire_web_banner.webp"}
                className={classes.hireImage}
                alt="Hire_Expert_Freelancers_Rozgaar"
                width={"600px"}
                height={"420px"}
                loading="lazy"
                title="Hire_Expert_Freelancers_Rozgaar"
              />
            </div>
            <div className={classes.helpYouHireDiv}>
              <NewHeadingRI firstLine={"Find your Freelancer"} />
              <HireTypeWeb />
              <h2 className={classes.workTypeHeading}>How to hire?</h2>
              <div className={classes.hoetohireSec}>
                <HowToHireSec />
              </div>
              <h2 className={classes.faqHeading}>FAQ</h2>

              <div className={classes.mapDiv}>
                {Data.slice(0, show ? show.length : 5).map((item, value) => {
                  return (
                    <>
                      <Faqdropdown question={item.Question} answer={item.Answer} />
                    </>
                  );
                })}

                <div className={classes.faq_ActionButton}>
                  {!show ? (
                    <ActionButton
                      buttonText={"View More"}
                      buttonType={"small"}
                      onClick={() => setShow(true)}
                    />
                  ) : (
                    <ActionButton
                      buttonText={"View less"}
                      buttonType={"small"}
                      onClick={() => setShow(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Learn how to hire freelancer quickly | Rozgaar India`}</title>
        <meta
          name="description"
          content={`Hire Freelancers from india, indonesia, bangladesh and other countries.Fast freelancer jobs at rozgaar `}

        />
        <link rel="canonical" href="https://www.rozgaarindia.com/how-to-hire-freelancer" />
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
        {MobileWebHandlerSwitch(props.device)}
      </React.Suspense>
    </>
  );
};

export default HowToHire;