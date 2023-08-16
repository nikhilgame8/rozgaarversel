import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loader from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { pageViewTracker } from "../../Components/GoogleTracking";
import NoRequirment from "../../Components/NewClientDashboardComp/NoRequirement";
import RecRequirmentCard from "../../Components/NewClientDashboardComp/RecRequirmentCard";
import RISkeletonLoading from "../../Components/RISkeletonLoading";
import NewClientDashboard from "./NewClientDashboard";
import NewClientDashboardMobile from "./NewClientDashboardMobile";
import classes from "./WorkRequirementsDashboard.module.css";

const WorkRequirementDashboard = (props) => {
  const [postArequirementDetails, setPostArequirementDetails] = useState([]);
  const [addonData, setAddonData] = useState([]);
  const [isloading, setIsLoading] = useState();
  const [pageLoader, setpageLoader] = useState(true)

  let navigate = useNavigate();

  useEffect(() => {
    requirementsApi();
    addonDataApi();
    pageViewTracker();
  }, []);




  const requirementsApi = () => {
    setpageLoader(true)
    setIsLoading(true);

    let userID = localStorage.getItem("Client_userID");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      UserId: userID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/client/RequirementListClientView",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          setPostArequirementDetails(result.data);
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!1");
      })
      .finally(() => {
        setpageLoader(false)
        setIsLoading(false);
      });
  };

  const addonDataApi = () => {
    setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/client/GetAddonMaster", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAddonData(result.data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const ClosePosting = (RequirementID) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      RequirementId: RequirementID,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/client/CloseRequirement", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          navigate("/employer-workplace");
        } else {
          alert("try again");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <NewClientDashboardMobile>
            {isloading ? (
              <></>
            ) : (
              <div className={classes.mainContainer}>
                <div className={classes.headingMain}>
                  {" "}
                  Latest Posted Requirements{" "}
                </div>
                <div className={classes.subHeading}>
                  {" "}
                  Receive qualified freelancer proposals. Review, hire and grow
                  your business.{" "}
                </div>
                {pageLoader ? <div >
                  <RISkeletonLoading loadingType={"PublicRecRequirementCard"} />
                </div> : <>
                {!postArequirementDetails.length ? (
                  <NoRequirment />
                ) : (
                  <RecRequirmentCard
                    requirementsCard={postArequirementDetails}
                    addonData={addonData}
                    device={"Mobile"}
                    ClosePost={ClosePosting}
                  />
                )}</>}
              </div>
            )}
          </NewClientDashboardMobile>
        );

      default:
        return (
          <NewClientDashboard>
            {isloading ? (
              <></>
            ) : (
              <div className={classes.mainContainer}>
                <div className={classes.headingMain}>
                  {" "}
                  Latest Posted Requirements{" "}
                </div>
                <div className={classes.subHeading}>
                  {" "}
                  Receive qualified freelancer proposals. Review, hire and grow
                  your business.{" "}
                </div>
                {pageLoader ? <div >
                  <RISkeletonLoading loadingType={"PublicRecRequirementCard"} />
                </div>: <>
                  {!postArequirementDetails.length ? (
                    <NoRequirment />
                  ) : (
                    <div className={classes.cardArea}>
                      <RecRequirmentCard
                        requirementsCard={postArequirementDetails}
                        addonData={addonData}
                        ClosePost={ClosePosting}
                      />
                    </div>
                  )}</>}

              </div>
            )}
          </NewClientDashboard>
        );
    }
  };

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`Short-Term Hiring requirement | Rozgaar `}</title>
      <meta
        name="description"
        content={`Write the best freelance job description to attract top freelancers. Boost your job post as urgent or featured and get express freelancer applicants`}

      />
      <link rel="canonical" href="https://www.rozgaarindia.com/NewClientDashboard" />
    </Helmet>
    {MobileWebHandlerSwitch(props.device)}</>;
};

export default WorkRequirementDashboard;
