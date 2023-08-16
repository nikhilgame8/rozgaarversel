import React, { useEffect, useState} from "react";

import { countryCode } from "../../JsonFiles/ContryCodes";

import classes from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import RIModal from "../../Components/RIModal";

import Loader from "react-loader-spinner";
import { pageViewTracker } from "../../Components/GoogleTracking";


const ActionButton = React.lazy(() => import("../../Components/ActionButton"));
const RiTextInputs = React.lazy(() =>
  import("../../Components/PostRequirement/RiTextInputs")
);
// const LoginOptions = React.lazy(() =>
//   import("../../Components/RegistrationComponents/LoginOptions")
// );

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("India");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState([]);
  const [dialCode, setDialCode] = useState("+91");
  const [checkMObileVal, setCheckMObileVal] = useState(false);
  const [countryObject, setCountryObject] = useState();
  const [error, setError] = useState({});
  const [isExist, setAlreadyExist] = useState();
  const [modal, setModal] = useState(false);

  const afterAuthRedirectUrl = sessionStorage.getItem("afterAuthRedirectUrl");
  const [term] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    pageViewTracker()
    if (countryObject) {
      setDialCode(countryObject.dial_code);
    }
  }, [countryObject]);
  useEffect(()=>{
    if (mobile.length >= 10) {
      setCheckMObileVal(true);
    }
    if (mobile.length < 10) {
      setCheckMObileVal(false);
    }
  },[mobile])

  const handleMobileChange = (e) => {
    const re = /^[0-9\b]+$/;
   
    if (e.target.value === "" || re.test(e.target.value)) {
      setMobile(e.target.value);
    }
   
  };
  const OtpVerification = (userID) => {
    if (country === "India") {
      navigate("/mobileverification", {
        state: { userId: userID, Mobile: mobile },
      });
    } else {
      navigate("/emailverification", {
        state: { userId: userID, Mobile: email },
      });
    }
  };
  const UserRegistration = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Country: country,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: mobile ? mobile : null,
      CountryCode: dialCode,
      Password: password,
      ConfirmPassword: password,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(global.apiLink + "/api/rozgaarapi/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("checkThisError",result)
        if (result.status === "SUCCESS" && result.status_code === 200) {
          OtpVerification(result.data.UserId);
          sessionStorage.setItem("Client_userID", result.data.UserId);
          sessionStorage.setItem("Client_USERMOBILENO", result.data.Mobile);
          sessionStorage.setItem("Client_USEREMAIL", result.data.Email);
          sessionStorage.setItem("Client_FirstName", result.data.FirstName);
          sessionStorage.setItem("Client_LastName", result.data.LastName);
          sessionStorage.setItem("Client_ProfilePicture", result.data.ProfilePicture);
          localStorage.setItem("Client_userLoggedIn", true);
          localStorage.setItem("Client_IsLoginType", "Client")
          localStorage.setItem("Client_userID", result.data.UserId);
          localStorage.setItem("Client_USERMOBILENO", result.data.Mobile);
          localStorage.setItem("Client_USEREMAIL", result.data.Email);
          localStorage.setItem("Client_FirstName", result.data.FirstName);
          localStorage.setItem("Client_LastName", result.data.LastName);
          localStorage.setItem("Client_UserName", result.data.UserName);
        } else if (result.data === "Mobile OR Email exist") {
          setAlreadyExist(true);
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // const SocialLogin = (res) => {
   
  //   var myHeaders = new Headers();
  //   myHeaders.append(
  //     "Authorization",
  //     "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
  //   );
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     Email: "profileObj" in res ? res.profileObj.email : res.email,
  //     RequestUrl: "url",
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(global.apiLink + "/api/rozgaarapi/SocialLogin", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (
  //         result.status === "SUCCESS" &&
  //         result.status_code === 200 &&
  //         result.message === "data successfully created"
  //       ) {
  //         sessionStorage.setItem(
  //           "googleBiEmail",
  //           "profileObj" in res ? res.profileObj.email : res.email
  //         );
  //         sessionStorage.setItem("userId", result.data.UserId);
  //         navigate("/SocialLogin");
  //       }
  //       if (
  //         result.status === "SUCCESS" &&
  //         result.status_code === 200 &&
  //         result.message === "data successfully updated" &&
  //         result.data.Country === ""
  //       ) {
  //         sessionStorage.setItem(
  //           "googleBiEmail",
  //           "profileObj" in res ? res.profileObj.email : res.email
  //         );
  //         sessionStorage.setItem("userId", result.data.UserId);
  //         navigate("/SocialLogin");
  //       }
  //       if (
  //         result.status === "SUCCESS" &&
  //         result.status_code === 200 &&
  //         result.message === "data successfully updated" &&
  //         result.data.Country !== ""
  //       ) {
  //         sessionStorage.setItem(
  //           "googleBiEmail",
  //           "profileObj" in res ? res.profileObj.email : res.email
  //         );
  //         sessionStorage.setItem("userId", result.data.UserId);
  //         sessionStorage.setItem("USERMOBILENO", result.data.Mobile);
  //         sessionStorage.setItem("USEREMAIL", result.data.Email);
  //         sessionStorage.setItem("FirstName", result.data.FirstName);
  //         sessionStorage.setItem("LastName", result.data.LastName);
  //         sessionStorage.setItem("ProfilePicture", result.data.ProfilePicture);
         
  //         localStorage.setItem(
  //           "googleBiEmail",
  //           "profileObj" in res ? res.profileObj.email : res.email
  //         );
  //         localStorage.setItem("USERMOBILENO", result.data.Mobile);
  //         localStorage.setItem("USEREMAIL", result.data.Email);
  //         localStorage.setItem("FirstName", result.data.FirstName);
  //         localStorage.setItem("LastName", result.data.LastName);
  //         localStorage.setItem("UserName", result.data.UserName);
  //         localStorage.setItem("userID", result.data.UserId);
  //         localStorage.setItem("ProfilePicture", result.data.ProfilePicture);
  //         localStorage.setItem("userLoggedIn", true);
  //         localStorage.setItem("IsLoginType","Client")
  //         navigate(
  //           afterAuthRedirectUrl ? afterAuthRedirectUrl : "/employer-workplace"
  //         );
  //         sessionStorage.removeItem("afterAuthRedirectUrl");
       
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  const formValidation = () => {
    let errors = {};
    let isValid = true;

    if (!country || country === "") {
      errors.country = "Please select your country";
      isValid = false;
    }
    if (!firstName || firstName === ""||!firstName.match(/^[a-z ,.'-]+$/i)) {
      errors.firstName = "Please enter a valid first name";
      isValid = false;
    }
    if (!lastName || lastName === ""||!lastName.match(/^[a-z ,.'-]+$/i)) {
      errors.lastName = "Please enter a valid last name";
      isValid = false;
    }
    if (!email || email === "" || !email.includes("@")) {
      errors.email = "Please enter a valid email address ";
      isValid = false;
    }

    if (
      (!mobile || mobile === "" || mobile.length < 10) &&
      country === "India"
    ) {
      errors.mobile = "Please enter a valid mobile number ";
      isValid = false;
    }
    if (!password || password === "" || password.length < 6) {
      errors.password = "Password must be of 6 characters atleast ";
      isValid = false;
    }

    if (!term) {
      errors.term =
        "By creating an account, you agree to receive communication and accept the Terms of Service and Privacy Policy";
      isValid = false;
    } else {
    }
    setError(errors);
    return isValid;
  };

  const handleSubmit=(e)=>{
  
    if (e.key === 'Enter') {
      formValidation()
      ? UserRegistration()
      : console.log("something went wrong");
    }
  }
  

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Create an Employer account | Rozgaar India`}</title>
        <meta
          name="description"
          content={`Freelance Job Posting Website, hire professional freelancers to work remotely,onsite or hybrid`}
        />
           <link rel="canonical" href="https://www.rozgaarindia.com/signup" />
      
           <meta property="og:title" content="Signup Freelance Jobs & Projects | Rozgaar India" />
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
         {modal && (
            <RIModal RIModalType={"RedirectFreelancer"} onClick={() => setModal(false)} href={process.env.PUBLIC_URL +"https://freelancer.rozgaarindia.com/signup"} onHrefClick={()=>setModal(false)}/>
          )}
        <div className={classes.Pagewrapper}>
          <div className={classes.Maincontainer_border}>
            <div className={classes.mainContainer}>
              <h1 className={classes.MainHeading}>Create a free account</h1>
              
              <h2 className={classes.loginLink}>
                Already have an account?
                <a href={process.env.PUBLIC_URL +"/login"} className={classes.terms_link}>
                  {" "}
                  Login
                </a>
              </h2>
              
              <div className={classes.login_with}>OR</div>
              <div className={classes.input_container}>
                <RiTextInputs
                  input={"CountryDropdown"}
                  placeHolder={"Country"}
                  displayData={countryCode}
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                  setCountry={setCountry}
                  setCountryObject={setCountryObject}
                />
                <div className={classes.ErrorMessage}>{error.country}</div>
                <div className={classes.inputFieldsWrapper}>
                  <div className={classes.inputFields}>
                    <RiTextInputs
                      input={"SingleLineInput"}
                      type={"text"}
                      onInput={() => {
                        error.firstName = " ";
                      }}
                      placeHolder={"First Name"}
                      onChange={(e) => setFirstName(e.target.value)}
                      onKeyPress={handleSubmit}
                      value={firstName}
                      maxLength={30}
                    />
                    <div className={classes.ErrorMessage}>
                      {error.firstName}
                    </div>
                  </div>

                  <div className={classes.inputFields}>
                    <RiTextInputs
                      input={"SingleLineInput"}
                      type={"text"}
                      onInput={() => {
                        error.lastName = " ";
                      }}
                      placeHolder={"Last Name"}
                      onKeyPress={handleSubmit}
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      maxLength={30}
                    />

                    <div className={classes.ErrorMessage}>{error.lastName}</div>
                  </div>
                </div>
                <RiTextInputs
                  input={"mobile"}
                  maxLength="10"
                  minLength="10"
                  onInput={() => {
                    error.mobile = " ";
                  }}
                  dialCode={dialCode}
                  onKeyPress={handleSubmit}
                  checkMObileVal={checkMObileVal}
                  onChange={handleMobileChange}
                  value={mobile}
                  placeHolder={
                    country === "India"
                      ? "Phone Number"
                      : "Phone Number(optional)"
                  }
                  required={country === "India" ? true : false}
                />
                <div className={classes.ErrorMessage}>{error.mobile}</div>

                <RiTextInputs
                  input={"SingleLineInput"}
                  type={"email"}
                  onInput={() => {
                    error.email = " ";
                  }}
                  placeHolder={"Email"}
                  onKeyPress={handleSubmit}
                  onChange={(e) => {
                    let keyword = e.target.value.toLowerCase();
                    var re = /^[a-z@A-Z.0-9_]*$/;
                    if (keyword === "" || re.test(keyword)) {
                      setEmail(keyword);
                    }
                  }}
                  value={email}
                />
                <div className={classes.ErrorMessage}>{error.email}</div>
                <RiTextInputs
                  input={"password"}
                  placeHolder={"Create Password"}
                  onInput={() => {
                    error.password = " ";
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onKeyPress={handleSubmit}
                />
                <div className={classes.ErrorMessage}>{error.password}</div>
                {isExist && (
                  <div className={classes.error_message}>
                    <div>{"Email or Mobile number already exist"}</div>
                  </div>
                )}
              </div>
              <div className={classes.ActionBtn}>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    formValidation()
                      ? UserRegistration()
                      : console.log("Something's wrong");
                  }}
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
                    <ActionButton buttonText={"Signup"} />
                  )}
                </div>
              </div>
              <h3 className={classes.checkbox_text}>
                By creating an account, you agree to receive communication and accept the &nbsp;
                <a href={process.env.PUBLIC_URL +"/terms"} target="_blank" className={classes.LinkText}>Terms of Service</a> and <a href={process.env.PUBLIC_URL +"/privacy-policy"} target="_blank" className={classes.LinkText}>Privacy Policy.</a>
              </h3>

              {/* <h3 className={classes.login_with}>or Signup With</h3>
              <LoginOptions
                OnSuccess={SocialLogin}
                responseFacebook={SocialLogin}
              /> */}
              <div className={classes.freelancerlink}  onClick={()=>setModal(true)}>
                {" "}
                Signup as Freelancer
              </div>
            </div>
          </div>
        </div>
      </React.Suspense>
    </>
  );
};

export default SignUp;
