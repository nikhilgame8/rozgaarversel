import React, { useState, useEffect } from "react";
import classes from "./ContactUs.module.css";
import Loader from "react-loader-spinner";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Faqdropdown from "./FrequentlyAskedQuestions/Faqdropdown";

import RIModal from "../Components/RIModal";
import { pageViewTracker } from "../Components/GoogleTracking";
const ActionButton = React.lazy(() => import("../Components/ActionButton"));
const RiTextInputs = React.lazy(() =>
  import("../Components/PostRequirement/RiTextInputs")
);
let mob = localStorage.getItem("Client_USERMOBILENO");
let locemail = localStorage.getItem("Client_USEREMAIL");
let locname = localStorage.getItem("Client_FirstName") + ' ' + localStorage.getItem("Client_LastName");
let userLoggedIn= localStorage.getItem("Client_userLoggedIn");

const ContactUs = () => {
  const [show, setShow] = useState();
  const [Data, setData] = useState([]);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [checkMObileVal, setCheckMObileVal] = useState(false);
  const [dialCode, setDialCode] = useState("+91");
  const [name, setName] = useState(userLoggedIn?locname:"");
  const [email, setEmail] = useState(userLoggedIn?locemail:"");
  const [mobile, setMobile] = useState(userLoggedIn?mob:"");
  const [message, setMessage] = useState();
  const [subject, setSubject] = useState();
  const [fileUpload, setFileUpload] = useState();
  const [error, setError] = useState({});
  const [modalShow, setModalShow] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    pageViewTracker()
    FrequentlyAskedQuestions();
  }, []);
useEffect(()=>{
  if (mobile&&mobile.length >= 10) {
    setCheckMObileVal(true);
  }
  if (mobile&&mobile.length < 10) {
    setCheckMObileVal(false);
  }
},[mobile])
  const handleMobileChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setMobile(e.target.value);
    }
   
  };

  const ContactDetails = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    var formdata = new FormData();
    formdata.append("Name", name);
    formdata.append("Email", email);
    formdata.append("Mobile", mobile);
    formdata.append("Subject", subject);
    formdata.append("Message", message);
    formdata.append("FileUpload", fileUpload?fileUpload:"");
    formdata.append("ContactType","Client");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch(
      global.apiLink + "/api/rozgaarapi/rzContactUshhh"
      , requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          setModalShow(true);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const idProofFront = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUpload(e.target.files[0]);
    }
  };
  const formValidation = () => {
    let errors = {};
    let isValid = true;
    if (!name || name === "") {
      errors.name = "Please Enter your Full name";
      isValid = false;
    }
    if (!email || email === "") {
      errors.email = "Please enter your E-mail Id";
      isValid = false;
    } else if (reg.test(email) === false) {
      errors.email = "Please enter your Correct E-mail Id";
      isValid = false;
    }
    if (!mobile || mobile === "") {
      errors.mobile = "Please enter your mobile no.";
      isValid = false;
    }
    if (!subject || subject === "" || subject === "Select Subject") {
      errors.subject = "Please select your subject!";
      isValid = false;
    }
    if (!message || message === "") {
      errors.message = "Please enter your message!";
      isValid = false;
    }
    
    setError(errors);
    return isValid;
  };

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
 

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Rozgaar Customer Service and Support | Rozgaar Help`}</title>
        <meta
          name="description"
          content={`Visit Rozgaar help center and get support on Freelancer or Employer account creation, withdraw , payments, proposals, partnerships, complaints and feedback`}
       
       />
            <link rel="canonical" href="https://www.rozgaarindia.com/customer-support" /> 
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
        <div className={classes.ContactUs_mainheader}>
          {modalShow && (
            <RIModal
              Heading={"We have received your message" }
              Text={"Will get in touch as soon as possible"}
              onClick={() => navigate(process.env.PUBLIC_URL +"/")}
              
            />
          )}
          <div className={classes.para_text}>
            <h1>Get in Touch with Rozgaar support team</h1>
            <h2>
              We’re always happy to help. Drop us a line, we will be in touch
              asap
            </h2>
            <div className={classes.contactForm_container}>
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
                input={"SingleLineInput"}
                type={"email"}
                label={"Email"}
                placeHolder={"Enter your email"}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <p className={classes.ErrorMessage}>{error.email}</p>
              <RiTextInputs
                input={"mobileWithDropdown"}
                label={"Mobile"}
                maxLength="10"
                minLength="10"
                onInput={() => {
                  error.mobile = " ";
                }}
                dialCode={dialCode}
                checkMObileVal={checkMObileVal}
                onChange={(e) => {
                  handleMobileChange(e);
                }}
                value={mobile}
                placeHolder={"Enter your mobile number"}
              />
              <div className={classes.ErrorMessage}>{error.mobile}</div>
              <RiTextInputs
                input={"Dropdown"}
                type={"text"}
                label={"Subject"}
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              />
              <div className={classes.ErrorMessage}>{error.subject}</div>
              <RiTextInputs
                input={"MultiLineInput"}
                type={"text"}
                label={"Write Message"}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeHolder={"Type your message here"}
              />
              <p className={classes.ErrorMessage}>{error.message}</p>
              <RiTextInputs
                input={"file"}
                type={"file"}
                label={"Upload (Optional)"}
                onChange={idProofFront}
                value={fileUpload}
                icon={
                  typeof fileUpload === "object" ? (
                    <AiFillCheckCircle size="25" color="green" />
                  ) : (
                    <BsLink45Deg size="25" />
                  )
                }
              />
            </div>
            {isLoading ? (
              <div className={classes.LoadingBtn}>
                <Loader type="TailSpin" color="white" width={20} height={18} />
              </div>
            ) : (
              <div className={classes.ActionButton}>
                <ActionButton
                  buttonText={"Submit"}
                  buttonType={"small"}
                  onClick={() => {
                    formValidation()
                      ? ContactDetails()
                      : console.log("Something's wrong");
                  }}
                />
              </div>
            )}
            <div className={classes.faq_padding}>
              <h2 className={classes.faq_firstheading}>
                Frequently asked questions
              </h2>
              <div className={classes.faq_secondheading}>
                Everything you need to know on posting requirement and hiring,
                signup, selecting the right freelancer, and releasing your
                payments.
              </div>
              {Data.slice(0, show ? show.length : 5).map((item, value) => {
                return (
                  <Faqdropdown question={item.Question} answer={item.Answer} />
                );
              })}
            </div>
            <div className={classes.ActionButton}>
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
      </React.Suspense>
    </div>
  );
};
export default ContactUs;
