
import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import classes from './ReportaBug.module.css';
import { useNavigate } from "react-router-dom";
import RIModal from "../Components/RIModal";
import {BsLink45Deg}  from 'react-icons/bs';
import {AiFillCheckCircle}  from 'react-icons/ai';
import { Helmet } from 'react-helmet';
import { pageViewTracker } from '../Components/GoogleTracking';
const RiTextInputs = React.lazy(() => import('../Components/PostRequirement/RiTextInputs'));
const ActionButton = React.lazy(() => import("../Components/ActionButton"));

const ReportaBug = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [bugType, setBugType] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [screenshort, setScreenshort] = useState("");
  const [error, setError] = useState({});
  const [checkMObileVal, setCheckMObileVal] = useState(false);
  const [dialCode] = useState("+91");
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    pageViewTracker()

}, []);
  const handleMobileChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setMobile(e.target.value);
    }
    if (e.target.value.length >= 10) {
      setCheckMObileVal(true)
    }
    if (e.target.value.length < 10) {
      setCheckMObileVal(false)
    }
  }
  const reportabugApi = () => {
    setIsLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3");

    var formdata = new FormData();
    formdata.append("Name", name);
    formdata.append("Mobile", mobile);
    formdata.append("Email", email);
    formdata.append("BugType", bugType);
    formdata.append("Subject", subject);
    formdata.append("Message", message);
    formdata.append("Screenshort", screenshort);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(global.apiLink + "/api/rozgaarapi/ReportaBug", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          setModalShow(true);

        }
      }
      )
      .catch(error => console.log('error', error))
      .finally(() => {
        setIsLoading(false);
      });
  }
  const Screenshot = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setScreenshort(e.target.files[0]);
    }
  };
  const formValidation = () => {
    let isValid = true;
    let errors = {};
    if (!name || name === "") {
      isValid = false;
      errors.name = "Please enter your full name";
    }
    if (!mobile || mobile === "") {
      isValid = false;
      errors.mobile = "Please enter your mobile number";
    }
    if (!email || email === "") {
      isValid = false;
      errors.email = "Please enter your valid email";
    }
    if (!bugType || bugType === "") {
      isValid = false;
      errors.bugType = "Please select your field";
    }

    if (!subject || subject === "") {
      isValid = false;
      errors.subject = "Please enter your subject";
    }
    if (!message || message === "") {
      isValid = false;
      errors.message = "Please enter your message";
    }

    setError(errors);
    return isValid;
  }

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>{`Help us improve | Rozgaar`}</title>
        <meta
          name="description"
          content={`Describe the issue you are facing in detail with screenshot, so our expert team can resolve in no time`}
       
       />
           <link rel="canonical" href="https://www.rozgaarindia.com/feedback-complaint" /> 
      </Helmet>
      <React.Suspense fallback={<div className="pageLoader"><Loader type="TailSpin" color="red" height={80} width={80} className="text-center my-5" /></div>}>
        <div className={classes.reportabug_bgcolor}>

          <div className={classes.top_link}>
            <a href="/" className={classes.home_link} >Home</a> / <a href="" className={classes.home_link} >Report a bug</a>
          </div>
          {modalShow && (
            <RIModal
              Heading={"We received your message" }
              Text={"Will get in touch as soon as possible"}
              onClick={() => navigate("/")}
            />
          )}
          <form className={classes.reportabug_header} onSubmit={(e) => { e.preventDefault(); formValidation() ? reportabugApi(true) : console.log("Something's wrong"); }} >

            <div className={classes.reportabug_heading}>
              <h1>Report a Bug</h1>
            </div>
            <div>
              <RiTextInputs
                input={"SingleLineInput"}
                type={"text"}
                label={"Name"}
                placeHolder={"Enter your name"}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <p className={classes.ErrorMessage}>{error.name}</p>
              <RiTextInputs
                input={"mobileWithDropdown"}
                label={"Mobile"}
                maxLength="10"
                minLength="10"
                onInput={() => { error.mobile = " " }}
                dialCode={dialCode}
                checkMObileVal={checkMObileVal}
                onChange={(e) => { handleMobileChange(e) }}
                value={mobile}
                placeHolder={"Enter your mobile number"}
              />
              <p className={classes.ErrorMessage}>{error.mobile}</p>
              <RiTextInputs
                input={"SingleLineInput"}
                type={"email"}
                label={"Email"}
                placeHolder={"Enter your Email"}
                onChange={(e) => {
                  let keyword = e.target.value.toLowerCase();
                  var re = /^[a-z@A-Z.0-9_]*$/;
                  if (keyword === '' || re.test(keyword)) {
                    setEmail(keyword)
                  }
                }}
                value={email}
              />
              <p className={classes.ErrorMessage}>{error.email}</p>
             



              <RiTextInputs
                input={"Dropdown"}
                type={"text"}
                label={"Select Bugtype"}
                onChange={(e) => setBugType(e.target.value)}
                value={bugType}
              />





              <p className={classes.ErrorMessage}>{error.bugType}</p>
              <RiTextInputs
                input={"SingleLineInput"}
                type={"Subject"}
                label={"Subject"}
                placeHolder={"Enter your Subject"}
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              />
              <p className={classes.ErrorMessage}>{error.subject}</p>
              <RiTextInputs
                input={"MultiLineInput"}
                type={"Message"}
                label={"Message"}
                placeHolder={"Enter your Subject"}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <p className={classes.ErrorMessage}>{error.message}</p>
             
               <RiTextInputs
                input={"file"}
                type={"file"}
                label={"Screenshot(Optional)"}
                onChange={Screenshot}
                value={screenshort}
                icon={
                  typeof screenshort === "object" ? (
                    <AiFillCheckCircle size="25" color="green" />
                  ) : (
                    <BsLink45Deg size="25" />
                  )
                }
              />
             
              {isLoading ? (
              <div className={classes.LoadingBtn}>
                <Loader type="TailSpin" color="white" width={20} height={18} />
              </div>
            ) : (
              <div>
                <ActionButton
                  buttonText={"Submit"}
                  onClick={() => {
                    formValidation()
                      ? reportabugApi()
                      : console.log("Something's wrong");
                  }}
                />
              </div>
            )}
            </div>
          </form>
        </div>
      </React.Suspense >
    </>
  )
}
export default ReportaBug;

