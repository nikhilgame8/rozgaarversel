import React, { useEffect, useState } from "react";
import classes from "./LoginWithOTP.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { MdOutlineArrowBack } from "react-icons/md";
import { pageViewTracker } from "../../Components/GoogleTracking";
const ActionButton = React.lazy(() => import("../../Components/ActionButton"));
const RiTextInputs = React.lazy(() =>
  import("../../Components/PostRequirement/RiTextInputs")
);

const LoginWithOTP = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialCode, setDialCode] = useState();
  const [emailInputField, setEmailInputField] = useState(true);
  const [mobileInputField, setMobileInputField] = useState(false);
  const [checkMObileVal, setCheckMObileVal] = useState(false);
  const [error, setError] = useState({});

  const [mobile, setMobile] = useState("");

  const [userNameErr, setUserNameErr] = useState();

  let navigate = useNavigate();

  const verifyEmailMobile = () => {
    if (email.includes("@")) {
      ResentOtp("true");
    } else {
      ResentOtp("false");
    }
  };

  useEffect(() => {
    pageViewTracker()

}, []);

  const ResentOtp = async (value) => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Email: email,
      Mobile: mobile,
      CountryCode: "+91",
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    await fetch(
      global.apiLink + "/api/rozgaarapi/ResendOtpSecond",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (
          result.status === "SUCCESS" &&
          result.status_code === 200 &&
          value === "false"
        ) {
          navigate("/verifyOTP", {
            state: { Mobile: mobile, DialCode: "+91" },
          });
        }
        if (
          result.status === "SUCCESS" &&
          result.status_code === 200 &&
          value === "true"
        ) {
          navigate("/verifyEmailOTP", { state: { Mobile: email } });
        } else {
          setUserNameErr(true);
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const formValidation = () => {
    let errors = {};
    let isValid = true;

    if (emailInputField) {
      if (!email || email === "" || !email.includes("@")) {
        errors.email = "Please enter a valid email address ";
        isValid = false;
      }
    }
    if (mobileInputField) {
      if (!mobile || mobile === "" || mobile.length < 10) {
        errors.mobile = "Please enter a valid mobile number ";
        isValid = false;
      }
    } else {
    }
    setError(errors);
    return isValid;
  };

  const handleMobileChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setMobile(e.target.value);
    }
   
  };

  const handleSubmit=(e)=>{
  
    if (e.key === 'Enter') {
      formValidation()
      ? verifyEmailMobile()
      : console.log("something went wrong");
    }
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Login with OTP | Rozgaar India`}</title>
        <meta
          name="description"
          content={`Login with OTP and hire freelancer`}
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
            <button
              className={classes.back_button}
              onClick={() => navigate(-1)}
            >
              {" "}
              <MdOutlineArrowBack size="30" className={classes.backIcon} />{" "}
            </button>
            <div className={classes.mainContainer}>
              <h1>Login with OTP</h1>

              {mobileInputField && (
                <>
                  {" "}
                  <RiTextInputs
                    input={"mobile"}
                    maxLength="10"
                    minLength="10"
                    dialCode={"+91"}
                    onDialCodechange={(e) => {
                      setDialCode(e.target.value);
                    }}
                    dialCodeValue={dialCode}
                    checkMObileVal={checkMObileVal}
                    onChange={handleMobileChange}
                    value={mobile}
                    onInput={() => {
                      error.mobile = " ";
                      setUserNameErr("");
                    }}
                    onKeyPress={handleSubmit}
                    placeHolder={"Please enter your Number"}
                  />
                  {userNameErr && mobileInputField && (
                    <div className={classes.error_message}>
                      <div>
                        The details you have entered could not be found{" "}
                      </div>
                    </div>
                  )}
                  <div className={classes.error_message}>{error.mobile}</div>
                  <div
                    className={classes.loginWith_Otp}
                    onClick={() => {
                      setEmailInputField(true);
                      setMobile("");
                      setMobileInputField(false);
                    }}
                  >
                    {" "}
                    Login With Email
                  </div>
                </>
              )}
              {emailInputField && (
                <>
                  <RiTextInputs
                    input={"SingleLineInput"}
                    type={"email"}
                    onInput={() => {
                      error.email = " ";
                      setUserNameErr("");
                    }}
                    onKeyPress={handleSubmit}
                    placeHolder={"Please enter your Email"}
                    onChange={(e) => {
                      let keyword = e.target.value.toLowerCase();
                      var re = /^[a-z@A-Z.0-9_]*$/;
                      if (keyword === "" || re.test(keyword)) {
                        setEmail(keyword);
                      }
                    }}
                    value={email}
                  />
                  {userNameErr && emailInputField && (
                    <div className={classes.error_message}>
                      <div>
                        The details you have entered could not be found{" "}
                      </div>
                    </div>
                  )}

                  <div className={classes.error_message}>{error.email}</div>
                  <div
                    className={classes.loginWith_Otp}
                    onClick={() => {
                      setEmailInputField(false);
                      setEmail("");
                      setMobileInputField(true);
                    }}
                  >
                    {" "}
                    Login With Mobile number
                  </div>
                </>
              )}

              <div>
                {(mobileInputField || emailInputField) &&
                  (isLoading ? (
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
                      buttonText={"Proceed"}
                      className={classes.Login_button}
                      onClick={(e) => {
                        e.preventDefault();
                        formValidation()
                          ? verifyEmailMobile()
                          : console.log("Something's wrong");
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </React.Suspense>
    </>
  );
};

export default LoginWithOTP;
