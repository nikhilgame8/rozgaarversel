import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { pageViewTracker } from "../../Components/GoogleTracking";
import ContactUs from "../ContactUs";
import NewClientDashboard from "../NewClientDashboard/NewClientDashboard";
import NewClientDashboardMobile from "../NewClientDashboard/NewClientDashboardMobile";

const ContactUsDashboard = (props) => {
  useEffect(() => {
    pageViewTracker();
   
  }, []);

  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <NewClientDashboardMobile>
            <ContactUs />
          </NewClientDashboardMobile>
        );

      default:
        return (
          <NewClientDashboard>
            <ContactUs />
          </NewClientDashboard>
        );
    }
  };

  return <>
  <Helmet>
        <meta charSet="utf-8" />
        <title>{`Contact us | Rozgaar`}</title>
        <meta
          name="description"
          content={`Rozgaar India is here to help. Send us your questions or concerns by filling the form and our expert support agents will reach out to you.`}
       
       />
       </Helmet>
  
  
  {MobileWebHandlerSwitch(props.device)}</>;
};

export default ContactUsDashboard;
