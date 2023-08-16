import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { pageViewTracker } from "../../Components/GoogleTracking";
import HowToHire from "../HireToHireScreens/HowToHire";
import NewClientDashboard from "./NewClientDashboard";
import NewClientDashboardMobile from "./NewClientDashboardMobile";

const HowToHireDashboard = (props) => {
  useEffect(() => {
   
    pageViewTracker();
  }, []);

  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <NewClientDashboardMobile>
            <div
              style={{
                backgroundColor: "white",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              <HowToHire device={"Mobile"}/>
            </div>
          </NewClientDashboardMobile>
        );

      default:
        return (
          <NewClientDashboard>
            <div
              style={{
                backgroundColor: "white",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              <HowToHire  />
            </div>
          </NewClientDashboard>
        );
    }
  };

  return <>
  <Helmet>
        <meta charSet="utf-8" />
        <title>{`How to Hire best Freelancers on Rozgaar- Step-by-Step Guide`}</title>
        <meta
          name="description"
          content={`Post a freelance job requirement with great job description and define your budget; Find the best skilled freelancer, sign NDA, pay safe and get your job done`}
       
       />
       </Helmet>
  {MobileWebHandlerSwitch(props.device)}</>;
};

export default HowToHireDashboard;
