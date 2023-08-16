import React, { useEffect } from "react";
import { useNavigate, useParams,useLocation } from "react-router";
import { pageViewTracker } from "../../Components/GoogleTracking";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}


const RazorPayGateway = () => {
  let navigate = useNavigate();



  const { paymentType, orderId} = useParams();
  let userID = localStorage.getItem("Client_userID");
 
  const PaymentorderId = orderId;
  useEffect(() => {
    pageViewTracker();
    paymentStatus();
  }, []);
const location=useLocation();
let reqId=location.state.RequirementID 

  const paymentStatus = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
      {
        "OrderId": PaymentorderId
      }
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(global.apiLink + "/api/freelancerapp/rozgaarapi/GetPaymentStatus", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "Success") {
         
          console.log(result.data.PaymentType);

          displayRazorpay(result.data.Email, result.data.Mobile)
        } else {
          console.log("fail")
        }
      })
      .catch((error) => console.log("error", error));
  };

 
  const displayRazorpay = async (email, phone) => {

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      
      key: "rzp_live_JsB8mC5ribaCzk",

      amount: "",
      order_id: PaymentorderId,
      name: "Rozgaar India",
      description: "Remote Hiring ",
      image: "https://res.cloudinary.com/rozgaarindia/image/upload/v1646979716/userprofile/rozgaarIcon_rtomzi.png",
      handler: function (response) {
        if (
          typeof response.razorpay_payment_id == "undefined" ||
          response.razorpay_payment_id < 1 ||
          response.status_code === 300
        ) {
          navigate("/GatewayPaymentStatus/" + orderId);
        } else {
          navigate("/GatewayPaymentStatus/" + orderId);
        }
      
      
      },
      prefill: {
       
        email: email,
        contact: phone,
      }
      ,
      "modal": {
        "ondismiss": function () {
       
          switch (paymentType) {
            case 'ClientRequirement':
              return navigate("/CheckUserEligibility/" + userID);
            case 'ClientAddons':
              return navigate("/employer-workplace/my-job-posting");
            case 'DClientAddons':
              return navigate("/clientRequirementDetail/"+reqId)
              case 'PaymentDeposit':
                return navigate("/clientRequirementDetail/"+reqId)
            default:
              return null
          }

        }
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      if (response.error.code === "BAD_REQUEST_ERROR") {
        navigate("/RazorPayGatewayPaymentFailure");
      }
    });
    paymentObject.open();
  }



  return (
    <>
      <div>
      
      </div>
    </>
  );
};

export default RazorPayGateway;
