import { useState } from "react";
import { GrChat } from "react-icons/gr";
import classes from "./ProposalsList.module.css";
import ProfileIcon from "../HomeAndLandingPages/ProfileIcon";
import CustomModalTheme from "../../Components/CustomModalTheme";
import ActionButton from "../../Components/ActionButton";
import Loader from "react-loader-spinner";
import { BiChat } from "react-icons/bi";
import ProposalDetails, { encodeAndSendToChat } from "./ProposalDetails";
import { useNavigate } from "react-router-dom";
import RISkeletonLoading from "../RISkeletonLoading";

const ProposalsList = (props) => {
  const [rejectPrposalModal, setRejectPrposalModal] = useState(false);
  const [freelancerProposalId, setFreelancerProposalId] = useState();
  const [proposalByID, setProposalByID] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const dateHandler = (proDate) => {
    let date = new Date(proDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return year + '-' + month + '-' + dt

  }



  console.log(props.proposalGenericData)

  const proposalDetailsApi = (proposalId) => {

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(
      {
        "ProposalId": (proposalId)
      }
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/freelancerapp/rozgaarapi/ProposalDetails",

      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {

        if (result.status === "Success" && result.status_code === 200) {
          setProposalByID(result.data)

        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
      });
  };

  const requirementPamyent = (fProposalID, requirmentID) => {

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(
      { "FreelancerPraposalId": (fProposalID) }
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


  return (
    <div className={classes.mainContainer}>
        {props.isLoading ? <RISkeletonLoading loadingType={"ProposalsList"} /> :
        <div>
      {modalShow && (<ProposalDetails
        freelancerData={proposalByID}

        requirementData={[]}
        proposalsDetails={props.proposalsDetails}
        onClose={() => setModalShow(false)}
      />
      )}

      <div className={classes.mainHeading}>Top Proposals</div>
      <div>Review offers and select the best-fit freelancer</div>
      {props.proposalGenericData.length ? (
        props.proposalGenericData.map((item) => {
          return (
            <>

              <div className={classes.listOfProposals}>
                <div className={classes.budgetPricingFreelancer}>

                  <div className={classes.iconAndUsername}>
                    <ProfileIcon
                      appliedUser={item.RequirementApplication}
                      FirstName={item.FirstName}
                      LastName={item.LastName}
                      FullName={item.FullName}
                      ProfilePicture={item.ProfilePicture}
                      type={"topFiveFreelaners"}
                      FreelancerId={item.FreelancerId}
                    />

                    <div className={classes.nameAndSkillContainer}>
                      <div className={classes.freelancerName}>
                        {" "}
                        {item.FullName}
                      </div>
                      <div className={classes.freelacerSkill}>
                        {" "}
                        {item.FreelancerSkills !== "" &&
                          item.FreelancerSkills[0].Skills}
                      </div>

                    </div>
                  </div>
                </div>
                <div className={classes.budgetAmount}>
                  {" "}
                  <div className={classes.dateProposal}> {dateHandler(item.UpdatedAt)}</div>


                  <div className={classes.proposalPointsHeading}> Proposal Amount: <span className={classes.proposalResponse}>{item.Currency}{item.PraposalAmount} / {item.Unit}</span></div>
                  {item.DepositAmount === 0 ? <></> : <div className={classes.proposalPointsHeading}> Deposit Amount: <span className={classes.proposalResponse}>{item.Currency}{item.DepositAmount}</span> </div>}
                </div>


                <div className={classes.buttonContainer}>

                  {" "}
                  <BiChat className={classes.messageIcon} onClick={() => { encodeAndSendToChat(localStorage.getItem("Client_userID"), item.FreelancerId) }} />

                  {item.ClientRStatus === "" ?
                    <div
                      className={classes.viewProposalButton}
                      onClick={() => { setModalShow(true); proposalDetailsApi(item.FreelancerPraposalId) }}>
                      View Proposal
                    </div>

                    : (item.ClientRStatus === "Reject") ?
                      <div className={classes.statusPaymentRejected}> Rejected  </div>

                      : (item.ClientRStatus === "Accept" && item.DepositAmountPaid === "True") ?
                        <div className={classes.statusPayment}>Accepted & Paid </div>
                        : (item.ClientRStatus === "Accept" && item.DepositAmount > 0 && item.DepositAmountPaid === "False") ?

                          <div className={classes.acceptButton} onClick={() => requirementPamyent(item.FreelancerPraposalId, item.RequirementId)} > {item.DepositAmount === 0 ? "Pay " + item.Currency + item.PraposalAmount : "Pay " + item.Currency + item.DepositAmount} </div>
                          :
                          (item.ClientRStatus === "Accept" && item.DepositAmount === 0) ?
                            <div className={classes.statusPayment}>Accepted </div>
                            :
                            <div>Please contact support </div>
                  }

                </div>
              </div>


            </>
          );
        })
      ) : (
        <div className={classes.listOfProposals}>
          {" "}
          You do not have any active Proposals
        </div>
      )}
      </div>
}
    </div>
  );
};

export default ProposalsList;
