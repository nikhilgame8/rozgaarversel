import classes from './GatewayPaymentStatus.module.css';
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import ActionButton from '../../Components/ActionButton';
import { pageViewTracker } from '../../Components/GoogleTracking';
const GatewayPaymentStatus = () => {


  const [paymentStatus, setPaymentStatus] = useState("")
  const [timeOutStatus, setTimeOutStatus] = useState(true);
  const [PaymentType, setPaymentType] = useState("");
  const [ClientId, setClientId] = useState("");
  const [requirementID, setRequirementID] = useState("");
  const [paymentDetail, setpaymentDetail] =useState("");
  const { orderId } = useParams();
  let navigate = useNavigate();


  useEffect(() => {
    pageViewTracker()
    paymentStatusCheck() 
  }, []);

  const timeOutFunction = (type, payment ,RequirementID) => {
    console.log(type, payment)
    return setTimeout(() => {
    
      setTimeOutStatus(false);
      if (payment === "Success") {
        redirectionTimeOut(type, RequirementID)
      }
    }, 4000);
  }

  const redirectionTimeOut = (type,RequirementID) => {
    return setTimeout(() => {
  
      redirectionSwitch(type ,RequirementID)
     

    }, 10000);
  }


  const redirectionSwitch = (type ,RequirementID) => {
  
    switch (type) {
      case 'ClientRequirement':
        return navigate("/Step1PAR");
      case 'ClientAddons':
        return  SubmitPAR(RequirementID) 
        case 'ClientFreelancerPaymentDeposit':
          return  navigate("/ClientRequirementDetail/"+RequirementID) 
      default:
        return null

    }

  }   
  
  const retryPaymentSwitch = () => {
   
    switch (PaymentType) {
      case 'ClientRequirement':
        return console.log("heu");
      case 'ClientAddons':
        return navigate("/CheckUserEligibility/" + ClientId);

      default:
        return null
    }
  }



  const paymentStatusCheck = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
      {
        "OrderId": orderId
      }
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/freelancerapp/rozgaarapi/GetPaymentStatus", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "Success" && result.status_code === 200) {
          setPaymentType(result.data.PaymentType)
          setClientId(result.data.ClientId)
          setPaymentStatus(result.data.PaymentStatus)
          setRequirementID(result.data.RequirementID)
          setpaymentDetail(result.data)
          timeOutFunction(result.data.PaymentType, result.data.PaymentStatus,result.data.RequirementID )
          


        } else {
          console.log(result)
        }
      })
      .catch((error) => console.log("error", error));
  };


  const SubmitPAR = (RequirementID) => {
    console.log("api")
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "RequirementId": RequirementID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/client/ReviewSubmitPARStatus", requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log("Submited",result); navigate("/employer-workplace")})
      .catch((error) => console.log("error", error));
  };


  return (
    <div className={classes.mainContainer}>
      <div className={classes.modal}>
        {timeOutStatus && <div className={classes.backMessage}> <Loader />

          <div className={classes.backMessage}>We are confirming the payment status from the bank </div> <div> Do not refresh or press back button...</div>
        </div>
        }


        {(paymentStatus === "Success" && !timeOutStatus) ?
          <div>
            <h3 className={classes.successfulHeading}>Payment Successful</h3>
            <img width="80px" height="80px" src= {process.env.PUBLIC_URL +"/assets/success.gif"} alt="Success_Gif" />
            <div className={classes.detailContainer}>
              <div className={classes.detailDiv}>
                <div className={classes.mainHeading}>Id</div>

                <div className={classes.detailvalue}>{paymentDetail.PGOrderId}</div>
              </div>

              <div className={classes.detailDiv}>
                <div className={classes.mainHeading}>Currency</div>


                <div className={classes.detailvalue}>INR</div>
              </div>
              <div className={classes.detailDiv}>
                <div className={classes.mainHeading}>Receipt</div>


                <div className={classes.detailvalue}>receipt</div>
              </div>
              <div className={classes.detailDiv}>
                <div className={classes.mainHeading}>Amount</div>

                <div className={classes.detailvalue}>{paymentDetail.GrandTotal}</div>
              </div>
              <div className={classes.backMessage}> Do not press refresh or press back button...</div>
            </div>
          </div>

          :
          !timeOutStatus ?

            <div>
              <div>
                <h3 className={classes.failHeading}>Payment Fail</h3>
                <img width="80px" height="80px" src={process.env.PUBLIC_URL +"/assets/fail.gif"} alt="Fail_Gif" />

                <div className={classes.detailContainer}>
                  <div className={classes.detailDiv}>
                    <div className={classes.mainHeading}>Id</div>

                    <div className={classes.detailvalue}>{paymentDetail.PGOrderId}</div>
                  </div>

                  <div className={classes.detailDiv}>
                    <div className={classes.mainHeading}>Currency</div>


                    <div className={classes.detailvalue}>INR</div>
                  </div>
                  <div className={classes.detailDiv}>
                    <div className={classes.mainHeading}>Receipt</div>


                    <div className={classes.detailvalue}>receipt</div>
                  </div>
                  <div className={classes.detailDiv}>
                    <div className={classes.mainHeading}>Amount</div>

                    <div className={classes.detailvalue}>{paymentDetail.GrandTotal}</div>
                  </div>
                </div>
                <div onClick={() => { retryPaymentSwitch() }}>
                  <ActionButton buttonText={"Retry"}
                    buttonType={"small"} />
                </div>
              </div>


            </div>

            :
            <></>

        }



      </div>
    </div>

  )



}

export default GatewayPaymentStatus;