import Notification from "./Notification";
import NewClientDashboard from "../NewClientDashboard/NewClientDashboard";
import NewClientDashboardMobile from "../NewClientDashboard/NewClientDashboardMobile";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { pageViewTracker } from "../../Components/GoogleTracking";

const NotificationDashboard = (props) => {
  useEffect(() => {
 
    pageViewTracker();
  }, []);
  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <NewClientDashboardMobile>
            <Notification />
          </NewClientDashboardMobile>
        );

      default:
        return (
          <NewClientDashboard>
            <Notification />
          </NewClientDashboard>
        );
    }
  };

  return <>
   <Helmet>
        <meta charSet="utf-8" />
        <title>{`Stay updated with freelancer notifications | Rozgaar `}</title>
        <meta
          name="description"
          content={`Turn on Rozgaar notifications and get alerts on freelancer messages, work proposals, project status. Hassle Free relevant updates `}
       
       />
           <link rel="canonical" href="https://www.rozgaarindia.com/NewClientDashboard" />
      </Helmet>
  {MobileWebHandlerSwitch(props.device)}</>;
};

export default NotificationDashboard;
