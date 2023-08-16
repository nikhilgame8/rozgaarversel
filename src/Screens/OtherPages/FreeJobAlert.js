import React, { useState } from "react";
import Loader from "react-loader-spinner";
import classes from "./FreeJobAlert.module.css";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../Components/ActionButton";
import RiTextInputs from "../../Components/PostRequirement/RiTextInputs";
import RIModal from "../../Components/RIModal";
import { Helmet } from "react-helmet";

const FreeJobAlert = () => {
  const [checkedType, setCheckedType] = useState("ALL JOBS");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  let navigate = useNavigate();

  const Subscriber = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Email: email,
      JobType: checkedType,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://api-preview.rozgaarindia.com/api/freelancerapp/rozgaarapi/FreelancerSubscriber",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setModalShow(true);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const Rightjob = [
    {
      photo: "/assets/JobAlerts/Check.svg",
      title: "One Time Task",
      detailHead: "Hire Freelancers for one-time gig work ",
      details:
        "E.g. Looking for a graphic designer to create a logo for my startup",
    },
    {
      photo: "/assets/JobAlerts/Date.svg",
      title: "Monthly Basis",
      detailHead: "Hire Freelancers on monthly term ",
      details:
        "E.g. Need a Graphic Designer to design Instagram posts everyday for 2",
    },
    {
      photo: "/assets/JobAlerts/Document.svg",
      title: "Contract Work",
      detailHead: "Hire for a short-term or a long term project",
      details:
        "E.g. I want a React website developer to work on an E-commerce Project",
    },
    {
      photo: "/assets/JobAlerts/Rupey.svg",
      title: "On Commission",
      detailHead: "Hire Freelancers on commission basis ",
      details: "E.g. We are looking for a POS agents for providing verified leads",
    },
  ];

  const workTypeColor = (workType) => {
    if (workType === "One Time Task") {
      return "One-Time";
    }
    if (workType === "Monthly Basis") {
      return "Monthly-Basis";
    }
    if (workType === "On Commission") {
      return "On-Commission";
    }

    if (workType === "Contract Work") {
      return "Contract-Work";
    }
  };

  const bgColor = (workTypeColor) => {
    if (workTypeColor === "One Time Task") {
      return "One";
    }
    if (workTypeColor === "Monthly Basis") {
      return "Monthly";
    }
    if (workTypeColor === "On Commission") {
      return "OnCommission";
    }

    if (workTypeColor === "Contract Work") {
      return "Contract";
    }
  };

  const kycFormValidation = () => {
    let errors = {};

    let isValid = true;

    if (!email || email === "" || !email.includes("@")) {
      errors.email = "Please enter your valid email";
      isValid = false;
    }
    setError(errors);
    return isValid;
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Free Job Alerts for freelancing, remote work, flexible work  | Rozgaar India`}</title>
        <meta
          name="description"
          content={`https://www.rozgaarindia.com Freelance job site is for Naukri, IT Jobs and 1000+ skills. Get latest job alerts in your email`}
        />
        <link
          rel="canonical"
          href={"https://www.rozgaarindia.com/free-job-alert"}
        />
      </Helmet>
      <div className={classes.BgdivTop}>
        {modalShow && (
          <RIModal
            Heading={"We have received your message"}
            Text={"Will get in touch as soon as possible"}
            onClick={() => navigate(process.env.PUBLIC_URL +"/")}
          />
        )}
        <div className={classes.InBgdivTop}>
          <h1 className={classes.TopTitle}>
            Get free job alerts in your inbox
          </h1>
         <div className={classes.checkBoxHead}>
         <div className={classes.checkB}>
            <RiTextInputs
              input="JobAlertCheckBox"
              value="All JOBS"
              checked={checkedType === "ALL JOBS"}
              onClick={() => setCheckedType("ALL JOBS")}
            />
            <RiTextInputs
              input="JobAlertCheckBox"
              value="ON-SITE JOBS"
              checked={checkedType === "ON-SITE JOBS"}
              onClick={() => setCheckedType("ON-SITE JOBS")}
            />
          </div>
          <div className={classes.checkB}>
            <RiTextInputs
              input="JobAlertCheckBox"
              value="HYBRID JOBS"
              checked={checkedType === "HYBRID JOBS"}
              onClick={() => setCheckedType("HYBRID JOBS")}
            />
            <RiTextInputs
              input="JobAlertCheckBox"
              value="REMOTE JOBS"
              checked={checkedType === "REMOTE JOBS"}
              onClick={() => setCheckedType("REMOTE JOBS")}
            />
          </div>

          <div className={classes.ActionBtnContainerTop}>
          <div className={classes.ActionBtnContainer}>
            <div className={classes.InputBox}>
              <RiTextInputs
                input="SingleLineInput"
                placeHolder={"Enter your email"}
                value={email}
                onInput={() => {
                  error.email = " ";
                }}
                onChange={(e) => {
                  let keyword = e.target.value.toLowerCase();
                  var re = /^[a-z@A-Z.0-9_]*$/;
                  if (keyword === "" || re.test(keyword)) {
                    setEmail(keyword);
                  }
                }}
              />
            </div>

            <div
              onClick={() => {
                kycFormValidation() ? Subscriber() : <></>;
              }}
              className={classes.SubmitBtn_JobAlert}
            >
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
                <ActionButton
                  buttonText={"Submit"}
                  buttonType={"alertsubmit"}
                />
              )}
            </div>
          </div>
          <div className={classes.ErrorMessage}>{email ? "" : error.email}</div>
          </div>
         </div>

          


          <div className={classes.Text}>
            Once you suscribe to our latest job alert you will start receiving
            jobs alert in your email
          </div>
        </div>
      </div>
      <div>
        <h2 className={classes.HeadingSecond}>Right job for you</h2>
      </div>
      <div className={classes.rjCont}>
        <div className={classes.Rightjob_flex}>
          {Rightjob.map((item) => {
            return (
              <div
                className={`${classes.workTypeColor} ${
                  classes[bgColor(item.title)]
                }`}
              >
                <div className={classes.ImgCont}>
                  <img src={process.env.PUBLIC_URL +item.photo} alt={item.title} title={item.title} loading="lazy" height={73} width={75}/>
                </div>
                <div>
                  <div
                    className={`${classes.workType} ${
                      classes[workTypeColor(item.title)]
                    }`}
                  >
                    {workTypeColor(item.title)}
                  </div>
                  <div className={classes.detailHead}>
                    {item.detailHead}{" "}
                    <div className={classes.detail}>{item.details}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={classes.rjBox}>
          <div className={classes.remoteContMain}>
            <div className={classes.remCircleFirst}>
              <div className={classes.remTitle}>REMOTE WORK</div>
              <div className={classes.HrlineRemFirst}></div>
              <div className={classes.HrTitle}>
                Freelancer can work from anywhere
              </div>
            </div>
          </div>

          <div className={classes.remoteContMain}>
            <div className={classes.remCircleSec}>
              <div className={classes.remTitle}>HYBRID WORK</div>
              <div className={classes.HrlineRemSec}></div>
              <div className={classes.HrTitle}>
                Freelancer will work on site and off site
              </div>
            </div>
          </div>

          <div className={classes.remoteContMain}>
            <div className={classes.remCircleThird}>
              <div className={classes.remTitle}>ONSITE WORK</div>
              <div className={classes.HrlineRemThird}></div>
              <div className={classes.HrTitle}>
                Freelancer can come to work in person
              </div>
            </div>
          </div>
        </div>

        <div className={classes.headThird}>
          <h2 className={classes.HeadingSecond}>
            Apply on the latest Freelance jobs
          </h2>

          <div className={classes.Hrline}></div>
          <div className={classes.chipsCont}>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
            }}><h3 className={classes.chips}>  WEB DEVELOPMENT</h3></a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
              }}><h3 className={classes.chips}>ANDROID DEVELOPMENT</h3></a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
              }}><h3 className={classes.chips}>IOS DEVELOPMENT</h3></a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
              }}><h3 className={classes.chips}>FLUTTER DEVELOPMENT</h3></a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
             }}><h3 className={classes.chips}> UI/UX DESIGN</h3></a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
              }}><h3 className={classes.chips}>GRAPHIC DESIGN</h3></a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
            }}> <h3 className={classes.chips}> VIDEO EDITING</h3></a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
             }}><h3 className={classes.chips}> 2D/3D ANIMATION</h3></a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
              }}><h3 className={classes.chips}>CUSTOMER SUPPORT</h3></a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
            }}> <h3 className={classes.chips}> DATA ANALYST</h3></a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
              }}><h3 className={classes.chips}>SOCIAL MEDIA HANDLING</h3></a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"}  className={classes.skillsLink} onClick={()=>{
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
              }}><h3 className={classes.chips}>USER TESTER</h3></a>
          </div>
         
         <a href={process.env.PUBLIC_URL +"/freelance-job-posting"} className={classes.skillsLink}>
          <ActionButton
                  buttonText={"Apply Now"}
                  buttonType={"small"}
                />
                </a>
        </div>
      </div>
    </>
  );
};
export default FreeJobAlert;
