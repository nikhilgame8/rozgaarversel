import React, { useState, useEffect } from "react";
import classes from "./Step2PAR.module.css";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import PostARequirementBackdropTheme from "../../Components/PostRequirement/PostARequirementBackdropTheme";
import { pageViewTracker } from "../../Components/GoogleTracking";
const ActionButton = React.lazy(() => import("../../Components/ActionButton"));
const RiTextInputs = React.lazy(() =>
  import("../../Components/PostRequirement/RiTextInputs")
);

const Step2PAR = () => {
  const [requirementType, setRequirementType] = useState(null);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [getPARLoading, setGetPARLoading] = useState(false);

  let navigate = useNavigate();
  const { reqId } = useParams();
  const RequirementID = reqId;
  let userID = localStorage.getItem("Client_userID");

  useEffect(() => {
    pageViewTracker()
    GetPARapi();
  }, []);
  
  const PARapi = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    var formdata = new FormData();
    formdata.append("UserId", userID);
    formdata.append("RequirementID", RequirementID);
    formdata.append("RequirementType", requirementType);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/rozgaarapi/PostARequirementSecond",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          navigate("/Step3PAR/" + RequirementID);
        } else {
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const GetPARapi = () => {
    setGetPARLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );

    var formdata = new FormData();
    formdata.append("UserId", userID);
    formdata.append("RequirementID", RequirementID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/rozgaarapi/PostARequirementSecond",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          setRequirementType(result.Data.RequirementType);
        } else {
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setGetPARLoading(false);
      });
  };

  const formValidation = () => {
    let errors = {};
    let isValid = true;
    if (!requirementType || requirementType === "") {
      errors.requirementType = "Please choose one of the following";
      isValid = false;
    } else {
    }
    setError(errors);
    return isValid;
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Best Remote work and freelance projects at RozgaarIndia.com via Times Ascent`}</title>
        <meta
          name="description"
          content={`Rozgaar India is one of India's Leading online service marketplace for remote work and freelance projects. You can find the best skilled online service providers at RozgaarIndia.com`}
        />
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
        <PostARequirementBackdropTheme
          headingsMain={"Post A Requirement"}
          subHeadingMain={"In 2/4 quick steps connect with top freelancers"}
          step={"50"}
        >
          {getPARLoading ? (
            <div className={classes.pageLoader}>
              <Loader
                type="TailSpin"
                color="#1678f2"
                height={80}
                width={80}
                className="text-center my-5"
              />
            </div>
          ) : (
            <>
              <label> Requirement Type</label>
              <RiTextInputs
                input={"checkbox"}
                placeHolder={""}
                text={"One Time Task"}
                subText={
                  "You want a Freelancer for a short, one time task eg. to create a logo"
                }
                onClick={() => setRequirementType("onetime")}
                checked={requirementType === "onetime"}
                onInput={() => {
                  error.requirementType = " ";
                }}
              />
              <RiTextInputs
                input={"checkbox"}
                placeHolder={""}
                text={"Contract"}
                subText={
                  "You want to hire the Freelancer on a contract basis for a particular period of time. Eg. Social Media Marketing for a particular time"
                }
                onClick={() => setRequirementType("contract")}
                checked={requirementType === "contract"}
                onInput={() => {
                  error.requirementType = " ";
                }}
              />
              <RiTextInputs
                input={"checkbox"}
                placeHolder={""}
                text={"Monthly Basis "}
                subText={
                  "You want a Freelancer to work on a monthly basis. Eg. Content Writer to write content on a regular basis"
                }
                onClick={() => setRequirementType("monthly-basis")}
                checked={requirementType === "monthly-basis"}
                onInput={() => {
                  error.requirementType = " ";
                }}
              />
              <RiTextInputs
                input={"checkbox"}
                placeHolder={""}
                text={"Commission Basis"}
                subText={
                  "You want a Freelancer to work on commission basis Eg. Sales Agent"
                }
                onClick={() => setRequirementType("commission")}
                checked={requirementType === "commission"}
                onInput={() => {
                  error.requirementType = " ";
                }}
              />
              {isLoading ? (
                <div className={classes.LoadingBtn}>
                  <Loader
                    type="TailSpin"
                    color="white"
                    width={20}
                    height={18}
                  />
                </div>
              ) : (
                <>
                  <div className={classes.error_message}>
                    {error.requirementType}
                  </div>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      formValidation()
                        ? PARapi()
                        : console.log("Something's wrong");
                    }}
                  >
                    <ActionButton
                      buttonText={"Save & Continue"}
                      className={classes.Login_button}
                    />
                  </div>{" "}
                </>
              )}
            </>
          )}
        </PostARequirementBackdropTheme>
      </React.Suspense>
    </>
  );
};

export default Step2PAR;
