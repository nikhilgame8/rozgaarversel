import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { pageViewTracker } from "../../Components/GoogleTracking";

const RazorPayGatewayPaymentFailure = () => {
  let navigate = useNavigate();
  useEffect(() => {
   
    pageViewTracker();
  }, []);

  return (
    <>
      <div className="text-center mt-5 mb-5">
        <h1>!OOPs Payment Failed</h1>
        <div>
          <button onClick={() => navigate("/RazorPayGateway")}>
            Retry Again
          </button>
        </div>
      </div>
    </>
  );
};

export default RazorPayGatewayPaymentFailure;
