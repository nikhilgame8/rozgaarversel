import React, { useState, useEffect, useContext } from "react";
import classes from "./ForgotPassword.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { MdOutlineArrowBack } from "react-icons/md";
import { UserContext } from "../../Context/UserContext";
import { pageViewTracker } from "../../Components/GoogleTracking";
const Modal = React.lazy(() => import("../../Components/Modal"));
const ActionButton = React.lazy(() => import("../../Components/ActionButton"));
const RiTextInputs = React.lazy(() =>
  import("../../Components/PostRequirement/RiTextInputs")
);

const ForgotPassword = () => {
  const [password, setPassword] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState();
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [otpSent, setOtpSent] = useState(true);
  const [error, setError] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [NotMatch, setnotMatch] = useState(false);
  const [resentOtpLoading, setResentOtpLoading] = useState(false);
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);

  const location = useLocation();
  const userData = location.state;
  let navigate = useNavigate();

  const goBackRedirectUrl = sessionStorage.getItem("goBackRedirectUrl");

    useEffect(() => {
      pageViewTracker()
    if (isUserLoggedIn) {
      navigate(goBackRedirectUrl);
    }
  }, []);

  const ResetPassword = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Otp: otp,
      Mobile: userData.Mobile ? userData.Mobile : "",
      Email: userData.Email ? userData.Email : "",
      Password: password,
      ConfirmPassword: confirmPassword,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/UserResetPassword", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (
          result.status === "Success" &&
          result.status_code === 200 &&
          result.message !== "otp did not matched "
        ) {
          setIsUserLoggedIn(true);

          sessionStorage.setItem("Client_userID", result.data.UserId);
          sessionStorage.setItem("Client_USERMOBILENO", result.data.Mobile);
          sessionStorage.setItem("Client_USEREMAIL", result.data.Email);
          sessionStorage.setItem("Client_FirstName", result.data.FirstName);
          sessionStorage.setItem("Client_LastName", result.data.LastName);
          sessionStorage.setItem("Client_ProfilePicture", result.data.ProfilePicture);
          localStorage.setItem("Client_userLoggedIn", true);
          localStorage.setItem("Client_IsLoginType","Client")
          localStorage.setItem("Client_userID", result.data.UserId);
          localStorage.setItem("Client_USERMOBILENO", result.data.Mobile);
          localStorage.setItem("Client_USEREMAIL", result.data.Email);
          localStorage.setItem("Client_FirstName", result.data.FirstName);
          localStorage.setItem("Client_LastName", result.data.LastName);
          localStorage.setItem("Client_UserName", result.data.UserName);
          localStorage.setItem("Client_ProfilePicture", result.data.ProfilePicture);
          setModalShow(true);
        }

        if (result.status === "Failed" && result.status_code === 200) {
          alert(result.message);
        }

        if (
          result.status === "Success" &&
          result.status_code === 200 &&
          result.message === "otp did not matched "
        ) {
          setnotMatch(true);
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const ResentOtp = (value) => {
    setResentOtpLoading(true);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = userData.Email.includes("@")
      ? JSON.stringify({
          Email: userData.Email,
        })
      : JSON.stringify({
          Mobile: userData.Mobile,
          CountryCode: userData.DialCode,
        });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/ResendOtp", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        value === "resend" ? setOtpSent("resend") : setOtpSent("send");
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setResentOtpLoading(false);
      });
  };
  const nextCheck = () => {
    if (password !== confirmPassword) {
      setPasswordMatch(true);
    }
    if (password === confirmPassword) {
      setPasswordMatch(false);
      ResetPassword();
    }
    let errors = {};
    let isValid = true;

    if (!password || password === "" || password.length < 6) {
      errors.password = "Password must be of 6 characters atleast ";
      isValid = false;
    }

    if (!otp || otp === "") {
      errors.otp = "Please enter OTP sent on your Email / Mobile";
      isValid = false;
    }
    setError(errors);
    return isValid;
  };

  const handleSubmit=(e)=>{
  
    if (e.key === 'Enter') {
     
    nextCheck()
     
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Reset Password with OTP | Rozgaar India`}</title>
        <meta
          name="description"
          content={`OTP will be sent to your registered mobile number or email address`}
       
       />
           <link rel="canonical" href="https://www.rozgaarindia.com/ForgotPasswordPreScreen" />
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
              {otpSent === "resend" && (
                <Modal
                  heading={`Otp resend on ${
                    userData.Mobile ? userData.Mobile : userData.Email
                  }`}
                  onClick={() => setOtpSent(false)}
                />
              )}
              {modalShow && (
                <Modal
                  heading={"Password changed successfully"}
                  onClick={() => navigate("/employer-workplace")}
                />
              )}
              <h1>
                Forgot
                <br /> Password?
              </h1>
              <div className={classes.para_text}>
                An OTP has been sent to your Mobile / Email
              </div>
              <h2 className={classes.MobileNumber}>
                {userData.Mobile ? userData.Mobile : userData.Email}
              </h2>
              <RiTextInputs
                input={"SingleLineInput"}
                type={"text"}
                maxLength="4"
                label={""}
                onInput={() => {
                  error.otp = "";
                  setnotMatch("")
                }}
                placeHolder={"OTP"}
                onChange={(e) => {setOtp(e.target.value);
                error.otp=""}}
                value={otp}
                onKeyPress={handleSubmit}
              />
              {NotMatch && (
                <div className={classes.error_message}>
                  <div>Please enter correct otp</div>
                </div>
              )}
              <div className={classes.error_message}>
                <div>{error.otp}</div>
              </div>
              <RiTextInputs
                input={"password"}
                label={""}
                onInput={() => {
                  error.password = " ";
                }}
                placeHolder={"New Password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onKeyPress={handleSubmit}
              />
              <div className={classes.error_message}>
                <div>{error.password}</div>
              </div>
              <RiTextInputs
                input={"password"}
                type={"password"}
                label={""}
                onInput={() => {
                  setPasswordMatch(false);
                }}
                onKeyPress={handleSubmit}
                placeHolder={"Confirm Password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              {passwordMatch && (
                <div className={classes.error_message}>
                  <div>create and confirm passwords are not same</div>
                </div>
              )}
              <div className={classes.forgot_password}>
                Didn't receive the otp?
              </div>
              <div
                onClick={() => ResentOtp("resend")}
                className={classes.resend_code_hover}
              >
                {" "}
                {resentOtpLoading ? (
                  <Loader
                    type="TailSpin"
                    color="#1778f2"
                    width={20}
                    height={18}
                  />
                ) : (
                  <>Resend Code</>
                )}
              </div>

              <div>
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
                    buttonText={"Proceed"}
                    className={classes.Login_button}
                    onClick={nextCheck}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Suspense>
    </>
  );
};

export default ForgotPassword;
