import React, { useState } from "react";
import classes from "./VerifyOtpClientProfile.module.css";
import { useNavigate } from "react-router-dom";
import { MdCancelPresentation } from "react-icons/md";
import ActionButton from "../../Components/ActionButton";

const Backdrop = () => {
  return <div className={classes.backdrop} />;
};

const EmailVerification = () => {
  const [otp, setOtp] = useState();
  const [isOtp, setIsOtp] = useState(false);
  const [correctOtp, setCorrectOtp] = useState(false);
  let navigate = useNavigate();

  window.scrollTo({ top: 0, behavior: "auto" });

  return (
    <>
      <Backdrop />
      <div className={classes.modalContainer}>
        {" "}
        <div className={classes.modal}>
          <div className={classes.cancelModel}>
            {" "}
            <button
              className={classes.back_button}
              onClick={() => navigate(-1)}
            >
              {" "}
              <MdCancelPresentation
                size="30"
                className={classes.backIcon}
              />{" "}
            </button>
          </div>
          <div className={classes.mainContainer}>
            <h1>
              Verify
              <br /> Email Address
            </h1>
            <div className={classes.para_text}>
              An OTP has been sent to your email address
            </div>

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
              <div>
                <ActionButton buttonText={"Verify"} onClick={""} />
              </div>
            </div>
            <div className={classes.forgot_password}>
              Didn't recieve the otp?
            </div>
            <div onClick={""} className={classes.resend_code_link}>
              Resend Code
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default EmailVerification;
