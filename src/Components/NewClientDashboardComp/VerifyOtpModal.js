import React from "react";
import ActionButton from "../ActionButton";
import classes from "./VerifyOtpModal.module.css";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "react-loader-spinner";

const Backdrop = () => {
  return <div className={classes.backdrop} />;
};
const VerifyOtpModal = (props) => {
  window.scrollTo({ top: 0, behavior: "auto" });

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
              onClick={props.onClose}
              className={classes.backIcon}
            />
          </div>
          <div className={classes.mainContainer}>
            {props.contact.includes("@") ? (
              <h1>
                Verify
                <br /> Email Address
              </h1>
            ) : (
              <h1>
                Verify
                <br /> MObile number
              </h1>
            )}
            {props.contact.includes("@") ? (
              <div className={classes.para_text}>
                An OTP has been sent to your email address
              </div>
            ) : (
              <div className={classes.para_text}>
                An OTP has been sent to your Mobile number
              </div>
            )}
            <h2>{props.contact}</h2>
            <div className={classes.outer_otp_div}>
              <div className={classes.otp_div}>
                <input
                  type="text"
                  className={classes.otp_input}
                  required
                  maxLength="4"
                  onInput={props.onInput}
                  value={props.value}
                  onChange={props.onChange}
                />
              </div>
            </div>

            <div className={classes.error_message}>
              {props.otpError === "NotExist" && (
                <div>Please enter correct otp</div>
              )}
            </div>

            <div>
              <div>
                {props.isLoading ? (
                  <div className={classes.LoadingBtn}>
                    <Loader
                      type="TailSpin"
                      color="white"
                      width={20}
                      height={18}
                    />
                  </div>
                ) : (
                  <ActionButton buttonText={"Verify"} onClick={props.onClick} />
                )}
              </div>
            </div>
            {props.otpSent && (
              <div className={classes.success_message}>
                {props.otpError === "OtpSent" && (
                  <div>OTP resend on {props.contact}</div>
                )}
              </div>
            )}
            <div className={classes.forgot_password}>
              Didn't recieve the otp?
            </div>
            <div
              onClick={props.onResendClick}
              className={classes.resend_code_link}
            >
              {props.resentOtpLoading === "primaryContact" ? (
                <Loader
                  type="TailSpin"
                  color="#1778f2"
                  width={20}
                  height={18}
                />
              ) : (
                <div>Resend Code</div>
              )}
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default VerifyOtpModal;
