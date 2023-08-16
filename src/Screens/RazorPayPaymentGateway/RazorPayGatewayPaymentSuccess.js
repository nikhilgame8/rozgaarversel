import React, { useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { pageViewTracker } from "../../Components/GoogleTracking";

const RazorPayGatewayPaymentSuccess = (props) => {
  useEffect(() => {
  
    pageViewTracker();
  }, []);

  return (
    <>
      <div className="text-center mt-5 mb-5">
        <BsCheckLg />
        <h1>Payment Successfull</h1>
        <div>
          <p> Payment Id={props.paymentId}</p>
          <p>Order Id={props.OrderId}</p>
          <p>Signature={props.Signature}</p>
        </div>
        <div>
          <a href="http://3.111.183.27">return to home</a>
        </div>
      </div>
    </>
  );
};

export default RazorPayGatewayPaymentSuccess;
