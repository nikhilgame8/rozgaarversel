import React, { useState, useEffect} from "react";
import classes from "./SignUp.module.css";
import { countryCode } from "../../JsonFiles/ContryCodes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "react-loader-spinner";
import { AiFillCheckCircle } from "react-icons/ai";
import { pageViewTracker } from "../../Components/GoogleTracking";

const ActionButton = React.lazy(() => import("../../Components/ActionButton"));
const RiTextInputs = React.lazy(() =>
  import("../../Components/PostRequirement/RiTextInputs")
);

const SocialLogin = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("India");
  const [dialCode, setDialCode] = useState("+91");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobile, setMobile] = useState();
  const [countryObject, setCountryObject] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState([]);
  const [isExist] = useState();
  const [errorMessage] = useState();
  const [term] = useState(true);
  const [error, setError] = useState({});
  const [checkMObileVal, setCheckMObileVal] = useState(false);

  let getEmail = sessionStorage.getItem("googleBiEmail");
  let navigate = useNavigate();

  useEffect(() => {
    GetSocialLogin();
    pageViewTracker()
  }, []);
  
  useEffect(() => {
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

  const formValidation = () => {
    let errors = {};
    let isValid = true;

    if (!country || country === "") {
      errors.country = "Please select your country";
      isValid = false;
    }
    if (!firstName || firstName === "") {
      errors.firstName = "Please enter your first name";
      isValid = false;
    }
    if (!lastName || lastName === "") {
      errors.lastName = "Please enter your last name";
      isValid = false;
    }
    if (!email || email === "" || !email.includes("@")) {
      errors.email = "Please enter a valid email address ";
      isValid = false;
    } else if (country === "India") {
      if (!mobile || mobile === "" || mobile.length < 10) {
        errors.mobile = "Please enter a valid mobile number ";
        isValid = false;
      }
    }
    if (!password || password === "" || password < 6) {
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
  const OtpVerification = (userID) => {
    if (country === "India") {
      navigate("/mobileverification", {
        state: { userId: userID, Mobile: mobile },
      });
    }

    else {
      navigate("/employer-workplace", { state: { userId: userID, Mobile: mobile } });
       window.location.reload()
    }
  };
  const handleMobileChange = (e) => {
    const re = /^[0-9\b]+$/;
    
    if (e.target.value === "" || re.test(e.target.value)) {
      setMobile(e.target.value);
    }
   
  };

  const UserSocialLogin = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Mobile: mobile,
      Email: email,
      FirstName: firstName,
      Country: country,
      LastName: lastName,
      CountryCode: dialCode,
      Password: password,
      RPassword: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/SocialOTP", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          sessionStorage.setItem("Client_userID", result.data.UserId);
          sessionStorage.setItem("Client_USERMOBILENO", result.data.Mobile);
          sessionStorage.setItem("Client_USEREMAIL", result.data.Email);
          sessionStorage.setItem("Client_FirstName", result.data.FirstName);
          sessionStorage.setItem("Client_LastName", result.data.LastName);
          sessionStorage.setItem("Client_ProfilePicture", result.data.ProfilePicture);
          sessionStorage.setItem("Client_UserName", result.data.UserName);
          localStorage.setItem("Client_userID", result.data.UserId);
          localStorage.setItem("Client_USERMOBILENO", result.data.Mobile);
          localStorage.setItem("Client_USEREMAIL", result.data.Email);
          localStorage.setItem("Client_FirstName", result.data.FirstName);
          localStorage.setItem("Client_LastName", result.data.LastName);
          localStorage.setItem("Client_UserName", result.data.UserName);
          localStorage.setItem("Client_ProfilePicture", result.data.ProfilePicture);
          sessionStorage.setItem("Client_userLoggedIn",true)
          localStorage.setItem("Client_userLoggedIn", true);
          localStorage.setItem("Client_IsLoginType","Client")
          sessionStorage.removeItem("afterAuthRedirectUrl");
          OtpVerification(result.data.UserId);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const GetSocialLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Email: getEmail,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/SocialLogin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEmail(result.data.Email);
      })
      .catch((error) => console.log("error", error));
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
        <div className={classes.Pagewrapper}>
          <div className={classes.Maincontainer_border}>
            <div className={classes.mainContainer}>
              <h1>Create a free account</h1>
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
                      value={firstName}
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
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
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

                <div className={classes.EmailIcon}>
                  <div className={classes.EmailIconText}>{email}</div>
                  <AiFillCheckCircle className={classes.CheckIcon} />
                </div>
                <div className={classes.ErrorMessage}>{error.email}</div>
                <RiTextInputs
                  input={"password"}
                  label={""}
                  onInput={() => {
                    error.password = " ";
                  }}
                  placeHolder={"Password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div className={classes.ErrorMessage}>{error.password}</div>

                {isExist && (
                  <div className={classes.error_message}>
                    <div>{errorMessage}</div>
                  </div>
                )}

                <div className={classes.checkbox_text}>
                  By creating an account, you agree to receive communication and
                  accept the Terms of Service and Privacy Policy.
                </div>
              </div>
              <div className={classes.ActionBtn}>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    formValidation()
                      ? UserSocialLogin()
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
            </div>
          </div>
        </div>
      </React.Suspense>
    </>
  );
};

export default SocialLogin;
