import React, { useState, useContext, useEffect } from "react";
import classes from "./MobileVerification.module.css";
import Loader from "react-loader-spinner";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/UserContext";
import { pageViewTracker } from "../../Components/GoogleTracking";

const Modal = React.lazy(() => import("../../Components/Modal"));
const ActionButton = React.lazy(() => import("../../Components/ActionButton"));

const MobileVerification = (props) => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);

  const [otpSent, setOtpSent] = useState();
  const [otp, setOtp] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resentOtpLoading, setResentOtpLoading] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [correctOtp, setCorrectOtp] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();

  const userData = location.state;
  const afterAuthRedirectUrl = sessionStorage.getItem("afterAuthRedirectUrl");
  const goBackRedirectUrl = sessionStorage.getItem("goBackRedirectUrl");

  useEffect(() => {
    pageViewTracker()
    if (isUserLoggedIn) {
      navigate(goBackRedirectUrl);
    }
  }, []);

  const VerifyOtp = (UserId) => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      UserId: userData.userId,
      Otp: otp,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/VerifyOtp", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
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
          localStorage.setItem("Client_ProfilePicture", result.data.ProfilePicture);
          navigate(
            afterAuthRedirectUrl ? afterAuthRedirectUrl : "/employer-workplace"
          );
          sessionStorage.removeItem("afterAuthRedirectUrl");
          setIsUserLoggedIn(true);
          setModalShow(true);
        }
        if (result.status === "fail" && result.status_code === 300) {
          setIsOtp(true);
          setCorrectOtp(false);
        }
        if (result.status === "FAILED" && result.status_code === 200) {
          setCorrectOtp(true);
          setIsOtp(false);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const ResentOtp = () => {
    setResentOtpLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = userData.Mobile.includes("@")
      ? JSON.stringify({
          Email: userData.Mobile,
        })
      : JSON.stringify({
          Mobile: userData.Mobile,
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
        setOtpSent(true);
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setResentOtpLoading(false);
      });
  };

  const handleSubmit=(e)=>{
  
    if (e.key === 'Enter') {
      VerifyOtp()
     
    }
  }
  
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
            {otpSent && (
              <Modal
                heading={`Otp resend on ${userData.Mobile}`}
                onClick={() => setOtpSent(false)}
              />
            )}
            {modalShow && (
              <Modal
                heading={"Account created successfully"}
                onClick={() => navigate("/")}
              />
            )}
            <button
              className={classes.back_button}
              onClick={() => navigate(-1)}
            >
              {" "}
              <MdOutlineArrowBack size="30" className={classes.backIcon} />{" "}
            </button>
            <div className={classes.mainContainer}>
              <h1>
                Verify
                <br /> Mobile Number
              </h1>
              <div className={classes.para_text}>
                An OTP has been sent to your mobile number
              </div>
              <h2>{userData.Mobile}</h2>
              <div className={classes.outer_otp_div}>
                <div className={classes.otp_div}>
                  <input
                    type="text"
                    className={classes.otp_input}
                    required
                    maxLength="4"
                    value={otp}
                    onInput={() => {
                      setIsOtp(false);
                      setCorrectOtp(false);
                    }}
                    onKeyPress={handleSubmit}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>
              {correctOtp && (
                <div className={classes.error_message}>
                  <div>Please enter correct otp</div>
                </div>
              )}
              {isOtp && (
                <div className={classes.error_message}>
                  <div>Please enter OTP</div>
                </div>
              )}
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
                    buttonText={"Verify"}
                    onClick={() => VerifyOtp()}
                  />
                )}
              </div>
              <div className={classes.forgot_password}>
                Didn't recieve the otp?
              </div>
              <div onClick={ResentOtp} className={classes.resend_code}>
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
            </div>
          </div>
        </div>
      </React.Suspense>
    </>
  );
};
export default MobileVerification;
