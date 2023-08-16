import React, { useState } from "react";
import CustomModalTheme from "../CustomModalTheme";
import { FcRating, FcRules, FcOvertime, FcSurvey } from "react-icons/fc";
import classes from "./ProposalDetails.module.css";
import ActionButton from "../ActionButton";
import { useNavigate } from "react-router-dom";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

var jwt = require('jwt-simple');

const ProposalDetails = (props) => {
  const navigate = useNavigate();
  const [modalViewItems, setModalViewItems] = useState("");



  const acceptRejectApi = (status) => {

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      FreelancerProposalId: props.freelancerData.FreelancerPraposalId,
      ClientRStatus: status,
      ClientRemarks: "N/A",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };



    fetch(
      global.apiLink + "/api/freelancerapp/rozgaarapi/AcceptRejectproposal",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {


        if (result.status === "Success" && result.status_code === 200 && result.FreelancerProposal.ClientRStatus === "Accept") {

          setModalViewItems("Accept")

        } else {
          if (result.status === "Success" && result.status_code === 200 && result.FreelancerProposal.ClientRStatus === "Reject") {
            console.log("RejectRespose")
            window.location.reload();
            props.onClose()
          }
          else {
            setModalViewItems("Error")
          }
        }



      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        console.log("");
      });
  }

  const requirementPayment = (fProposalID, requirmentID) => {

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(
      { "FreelancerPraposalId": props.freelancerData.FreelancerPraposalId }
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/rozgaarapi/ClientFreelancerPaymentDepositInitiate",

      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {

        if (result.status === "SUCCESS" && result.status_code === 200) {

          navigate("/RazorPayGateway/" + "PaymentDeposit/" + result.data.PGOrderId, { state: { RequirementID: requirmentID } });
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
      });
  };



  const modalView = () => {

    switch (modalViewItems) {
      case "OnApproval":
        return (

          <CustomModalTheme width={"fullWidth"} onClose={props.onClose}>

            <div className={classes.mainHeading}>Are you sure you want to accept this proposal ? </div>
            <div className={classes.buttonContainer}>
              <div className={classes.chatButton}>
                <ActionButton buttonType={"reject"} buttonText={"Cancel"} onClick={() => { setModalViewItems("") }} />
              </div>
              <div className={classes.chatButton}>
                <ActionButton buttonType={"green"} buttonText={"Confirm"} onClick={() => { acceptRejectApi("Accept") }} />
              </div>
            </div>
          </CustomModalTheme>

        )
      case "Accept":
        return (

          <CustomModalTheme width={"fullWidth"} onClose={props.onClose}>
            <div className={classes.headingWithIcon}>
              <BsFillHandThumbsUpFill className={classes.thumbsUpIcon} />
              <div className={classes.mainHeading}> Great! You have accepted the Proposal</div>
              {props.freelancerData.DepositAmount === 0 ?
                <div>
                  <ActionButton buttonType={"small"} buttonText={"Okay"} onClick={() => { window.location.reload(); props.onClose() }} />
                </div>
                :
                <div>
                  <div> Freelancer have requested a payment in order to start the work</div>
                  <div className={classes.chatButton}>

                    <ActionButton buttonType={"small"} buttonText={`Pay ${props.freelancerData.DepositAmount > 0 ? props.freelancerData.DepositAmountCurrency + "" + props.freelancerData.DepositAmount : props.freelancerData.Currency + " " + props.freelancerData.PraposalAmount}`} onClick={() => { requirementPayment(props.freelancerData.FreelancerPraposalId, props.freelancerData.RequirementId) }} />
                  </div>
                </div>
              }

            </div>

          </CustomModalTheme>

        )
      case "Reject":
        return (
          <CustomModalTheme width={"fullWidth"} onClose={props.onClose}>

            <div className={classes.mainHeading}>Are you sure you want to reject this proposal ? </div>
            <div className={classes.buttonContainer}>
              <div className={classes.chatButton}>
                <ActionButton buttonType={"reject"} buttonText={"Cancel"} onClick={() => { setModalViewItems("") }} />
              </div>
              <div className={classes.chatButton}>
                <ActionButton buttonType={"green"} buttonText={"Confirm"} onClick={() => { acceptRejectApi("Reject") }} />
              </div>
            </div>
          </CustomModalTheme>
        )

      case "Error":
        return (
          <CustomModalTheme width={"fullWidth"} onClose={props.onClose}>

            <div className={classes.mainHeading}> Oops! There is some issue please contact support </div>
            <div className={classes.buttonContainer}>
              <div className={classes.chatButton}>
                <ActionButton buttonType={"reject"} buttonText={"Okay"} onClick={() => { setModalViewItems("") }} />
              </div>

            </div>
          </CustomModalTheme>
        )
      default: return (
        <CustomModalTheme width={"fullWidth"} onClose={props.onClose}>

          <div>
            <div className={classes.mainHeading}>
              Review Proposal
            </div>

            <div className={classes.heading}> Proposal by: <span className={classes.title}>{props.freelancerData.FreelancerUserName} </span> </div>
            <div className={classes.reqBox}>
              {props.proposalsDetails.Title}
              <div className={classes.skilltagsContainer}>
                {" "}
                {props.proposalsDetails.Skills &&
                  props.proposalsDetails.Skills.map((item, i) => {
                    return <div className={classes.skillTags}> {item.Skill.charAt(0).toUpperCase() +
                      item.Skill.slice(1)}</div>;
                  })}
              </div>
              <div className={classes.budgetheading}>
                Budget : <span className={classes.title}>{props.proposalsDetails.Currency}{props.proposalsDetails.budget}<span className={classes.budgetUnit}> {props.proposalsDetails.Unit}</span> </span>
              </div>
            </div>
            <div className={classes.heading}>Freelancer proposal:
              <span className={classes.title}>{props.freelancerData.Currency}{props.freelancerData.PraposalAmount} <span className={classes.budgetUnit}>{props.freelancerData.Unit}</span>
              </span>
            </div>

            <div className={classes.heading}>Deposit Requested:<span className={classes.title}> {props.freelancerData.DepositAmount && props.freelancerData.DepositAmountCurrency + "" + props.freelancerData.DepositAmount}</span></div>

            <div className={classes.heading}>Descrption:
              <span className={classes.title}>
                {props.freelancerData.ProposalDetail ? props.freelancerData.ProposalDetail : "N/A"}
              </span>
            </div>

            <div className={classes.buttonContainer}>
              <div className={classes.chatButton}>
                <ActionButton buttonType={"reject"} buttonText={"Reject"} onClick={() => { setModalViewItems("Reject") }} />
              </div>
              <div className={classes.chatButton}>
                <ActionButton buttonType={"green"} buttonText={"Accept"} onClick={() => { setModalViewItems("OnApproval") }} />
              </div>


            </div>
          </div>
        </CustomModalTheme>
      )
    }
  }

  return (
    <div>
      {modalView()}
    </div>
  );
};
export const encodeAndSendToChat = (senderId, recieverId) => {
  var payload = {
    senderId: senderId,
    recieverId: recieverId || "",
    userType: "client"
  };
  var secret = '5wXnlnG7uE';
  var token = jwt.encode(payload, secret);
  window.open(`${global.chatLink}/chat?token=${token}`)
}

export default ProposalDetails;
