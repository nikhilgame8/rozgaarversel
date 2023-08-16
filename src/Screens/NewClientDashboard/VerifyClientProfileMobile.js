import React, { useEffect, useState } from "react";
import classes from "./VerifyClientProfileEmail.module.css";
import Loader from "react-loader-spinner";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import ActionButton from "../../Components/ActionButton";
import { pageViewTracker } from "../../Components/GoogleTracking";

const Backdrop = () => {
  return <div className={classes.backdrop} />;
};

const VerifyClientProfileMobile = () => {
  const [otp, setOtp] = useState();
  const [otpSent, setOtpSent] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [correctOtp, setCorrectOtp] = useState(false);
  const [ setPriMobile] = useState(false);

  let navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;

  useEffect(() => {
  
    pageViewTracker();
  }, []);

  const VerifyOtp = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      UserId: "f9de734f-623c-11ec-856e-02c01e8e4bda",
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
          navigate("/employer-workplace/my-profile", {
            state: { PriMobile: setPriMobile(true) },
          });
        } else if (result.status === "fail" && result.status_code === 300) {
          setIsOtp(true);
          setCorrectOtp(false);
        } else if (result.status === "FAILED" && result.status_code === 200) {
          setCorrectOtp(true);
          setIsOtp(false);
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const ResentOtp = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      UserId: "f9de734f-623c-11ec-856e-02c01e8e4bda",
      Mobile: userData.Mobile,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    await fetch(
      global.apiLink + "/api/rozgaarapi/ResendOtpThird",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          setOtpSent(true);
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      });
  };
  return (
    <>
      <Backdrop />
      <div className={classes.modalContainer}>
        {" "}
        <div className={classes.modal}>
          <div className={classes.cancelModel}>
            {" "}
            <AiOutlineClose
              size="30"
              onClick={() => navigate(process.env.PUBLIC_URL + "/employer-workplace/my-profile")}
              className={classes.backIcon}
            />
          </div>
          <div className={classes.mainContainer}>
            <h1>
              Verify
              <br /> Mobile number
            </h1>
            <div className={classes.para_text}>
              An OTP has been sent to your Mobile number
            </div>
            <h2>{userData.Mobile}</h2>
            <div className={classes.outer_otp_div}>
              <div className={classes.otp_div}>
                <input
                  type="text"
                  className={classes.otp_input}
                  required
                  maxLength="4"
                  onInput={() => {
                    setIsOtp(false);
                    setCorrectOtp(false);
                  }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>

            <div className={classes.error_message}>
              {correctOtp && <div>Please enter correct otp</div>}
              {isOtp && <div>Please enter OTP</div>}
              {otpSent && <div>OTP sent on {userData.Mobile}</div>}
            </div>
            <div>
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
            </div>
            <div className={classes.forgot_password}>
              Didn't recieve the otp?
            </div>
            <div
              onClick={() => ResentOtp()}
              className={classes.resend_code_link}
            >
              Resend Code
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default VerifyClientProfileMobile;
