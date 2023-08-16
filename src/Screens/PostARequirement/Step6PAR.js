import React from "react";
import ActionButton from "../../Components/ActionButton";
import classes from "./Step6PAR.module.css";
import { BsCheckLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Step6PAR = (props) => {
  let navigate = useNavigate();

  const SubmitPAR = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      RequirementId: props.RequirementID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/client/ReviewSubmitPARStatus", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "SUCCESS"){
          navigate("/employer-workplace");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const Backdrop = () => {
    return <div className={classes.backdrop} />;
  };
  return (
    <>
      <Backdrop />
      <div className={classes.modalContainer}>
        <div className={classes.modal}>
          <div className={classes.ModalCheckIcon}>
            <BsCheckLg className={classes.modalcheck} />
          </div>
          <div className={classes.ModalCheckTextFirst}>
            Your Post is under review and will be live within 30 minutes
          </div>
          <div className={classes.ModalCheckTextSecond}>
            You will start receiving <br /> proposals from freelancers <br /> as
            soon as your post is live
          </div>
          <div className={classes.ActionBtnContainer}>
          <div className={classes.ActionBtn}>
           
            <ActionButton
              buttonType={"small"}
              buttonText={"Go to dashboard"}
              onClick={() => {
                SubmitPAR();
               
              }}
            />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step6PAR;
