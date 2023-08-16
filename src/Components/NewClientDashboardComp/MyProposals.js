import { MdQuestionAnswer } from 'react-icons/md';
import { Link } from 'react-router-dom';
import classes from './MyProposals.module.css'
import { encodeAndSendToChat } from "./ProposalDetails";
const MyProposals = (props) => {
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

  const proposalStatusHandler = (status) => {
    if (status === "") {
      return "Awaiting response"
    }
    if (status === "Accept") {
      return (
        <span className={classes.accptedColor}>
          Accepted
        </span>
      )
    }
    if (status === "Reject") {
      return (
        <span className={classes.rejectedColor}>
          Rejected
        </span>
      )
    }
  }
  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainHeading}> Recent proposals received</div>

      {props.freelancerProposal.length > 0 ?
        <div>
          {props.freelancerProposal.map((item, i) => {
            return (
              <>
                <div className={classes.proposalBox}>
                  <div>   <div className={classes.updateDate}>{dateHandler(item.UpdatedAt)}</div>

                    <div>
                      Proposal Amount <span className={classes.proposalAmount}> {item.Currency + item.PraposalAmount + "/" + item.Unit} </span>
                    </div>
                    <div>
                      Deposit Amount <span className={classes.proposalAmount}> {item.Currency + item.DepositAmount} </span>
                    </div>
                    <div>  Requirement <a href={process.env.PUBLIC_URL + "/ClientRequirementDetail/" + item.RequirementId} > view </a> </div>
                    <div>  Status <span className={classes.proposalAmount}> {proposalStatusHandler(item.ClientRStatus)}  </span> </div>
                    <div>  {item.ProposalDetail}</div>

                    <div className={classes.chatIcon}> <MdQuestionAnswer />
                      <a href={process.env.PUBLIC_URL + "/"} onClick={(e) => { e.preventDefault(); encodeAndSendToChat(item.FreelancerId, item.ClientId) }} className={classes.AppliedCaseChat}>

                        <div className={classes.chattag}> Chat</div>
                      </a>
                    </div>

                  </div>

                </div>
                <div class="border"> </div>
              </>

            )
          })}
        </div>
        :
        <div className={classes.noProposalHeading}> You have not received any proposals from freelancers yet
        </div>


      }
    </div>
  )
}

export default MyProposals;