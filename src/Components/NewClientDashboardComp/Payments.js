import React,{useState} from "react";
import ActionButton from "../ActionButton";
import RISkeletonLoading from "../RISkeletonLoading";
import classes from "./Payments.module.css";


const Payments = (props) => {

  const [show, setShow] = useState();

  const paymentType = (type) => {
    if (type === "ClientAddons") {
      return "Addons ";
    }
    if (type === "ClientFreelancerPaymentDeposit") {
      return "Advance to Freelancer";
    }
    if (type === "ClientFreelancerPayment") {
      return "Payment to Freelancer";
    }

    if (type === "ClientRequirement") {
      return "Post a Job Payment";
    }
    if (type === "FreelancerPackages") {
      return "Freelancer Package";
    }
  };

  const paymentStatus = (status) => {
    if (status === "PaymentRequested") {
      return "Payment Requested ";
    }
    if (status === "Deposit Successful") {
      return "Advance Paid";
    }
    if (status === "DepositRequested") {
      return " Advance Requested";
    }
  };
  return (
    <div>
      
       
    {props.paymentsData&&
      props.paymentsData.length>0?
       <div className={classes.mainContainer}>
          {props.isLoading ? <RISkeletonLoading loadingType={"Payments"} /> :
          <div>
     <div className={classes.headingContainer}>
     
       <div>
         <div className={classes.mainHeading}>Payments</div>
       </div>
       <div className={classes.idWrapper}>
         <div>Requirement id</div>
         <div className={classes.mainHeading}>{props.RequirementID&&props.RequirementID.slice(-9)}</div>
       </div>
     </div>

      {props.paymentsData&&props.paymentsData.slice(0, show ? show.length : 5).map((item) => {
        return (
          <>
            <div className={classes.paymentDetails}>
            <div>Order id:<span className={classes.tableheading}> {item.PGOrderId}</span></div>
            <div>Name:<span className={classes.tableheading}> {item.UserName}</span></div>
            <div>Payment type:<span className={classes.tableheading}> {paymentType(item.PaymentType)}</span></div>
            <div>Payment status:<span className={classes.tableheading}> {paymentStatus(item.PaymentStatus)}</span></div>
            <div>Amount:<span className={classes.tableheading}> {item.Currency+" "+item.PaymentAmount}</span></div>
              <div>Payment date:<span className={classes.tableheading}> {item.UpdatedAt.slice(0, 10).split("-").reverse().join("-")}</span></div>
             
            </div>
            <div className={classes.border}></div>
          </>
        );
      })}
 {
        props.paymentsData.length>5 &&
        (
        <div className={classes.faq_ActionButton}>
        {!show ? (
          <ActionButton
            buttonText={"View More"}
            buttonType={"small"}
            onClick={() => setShow(true)}
          />
        ) : (
          <ActionButton
            buttonText={"View less"}
            buttonType={"small"}
            onClick={() => setShow(false)}
          />
        )}
      </div>
        )
      }
           </div>} 
          
    </div>
    :<></>
     }</div>
   
  );
};

export default Payments;
