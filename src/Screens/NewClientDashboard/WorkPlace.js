import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ActionButton from "../../Components/ActionButton";
import { pageViewTracker } from "../../Components/GoogleTracking";
import MyProposals from "../../Components/NewClientDashboardComp/MyProposals";
import NoRequirment from "../../Components/NewClientDashboardComp/NoRequirement";
import ProfileHealth from "../../Components/NewClientDashboardComp/ProfileHealth";
import RecRequirmentCard from "../../Components/NewClientDashboardComp/RecRequirmentCard";
import RozgaarIsProtected from "../../Components/NewClientDashboardComp/RozgaarIsProtected";
import SuggestiveSKills from "../../Components/NewClientDashboardComp/SuggestiveSKills";
import RISkeletonLoading from "../../Components/RISkeletonLoading";
import NewClientDashboard from "./NewClientDashboard";
import NewClientDashboardMobile from "./NewClientDashboardMobile";
import classes from "./WorkPlace.module.css";

const WorkPlace = (props) => {
  const [dayTime, setDayTime] = useState();
  const [databoardData, setDashboardData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [postArequirementDetails, setPostArequirementDetails] = useState([]);
  const [addonData, setAddonData] = useState();
  const [requirement, setRequrements] = useState(false);
  const [closeModalShow, setCloseModalShow] = useState(false);
  const [firstNameUser, setFirstNameUser] = useState('')
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [freelancerProposal, setFreelancerProposal] = useState([]);
  const [pageLoader,setPageLoader] = useState(true)

  const [profileHealthData, setProfileHealthData] = useState({
    userName: "",
    EmptyProfileFields: [],
    AccountBalance: "",
    ProfileCompleted: "",
  });

  const userID = localStorage.getItem("Client_userID");
  var today = new Date();
  var curHr = today.getHours();

  useEffect(() => {
    pageViewTracker()
    dashBoardData();
    requirementsApi();
    addonDataApi();
    if (curHr < 12) {
      setDayTime("Good Morning");
    } else if (curHr < 18) {
      setDayTime("Good Afternoon");
    } else {
      setDayTime("Good Evening");
    }
  }, []);


  const dashBoardData = () => {
    setIsLoading(true);

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

    fetch(global.apiLink + "/api/client/ClientDashboard", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDashboardData(result.data);
        setFirstNameUser(result.data.FirstName)
        setProfileHealthData({
          ...profileHealthData,
          userName: result.data.UserName,
          EmptyProfileFields: result.data.EmptyProfileFields,
          AccountBalance: result.data.AccountBalance,
          ProfileCompleted: result.data.ProfileCompleted,
        });
        setSuggestedSkills(result.data.SuggestedSkills);
        setFreelancerProposal(result.FreelancerProposal)
      })

      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const requirementsApi = () => {
    setPageLoader(true)
    setIsLoading(true);

    let userID = localStorage.getItem("Client_userID");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      UserId: userID,
      Page: "2",
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
          if (result.data.length) {
            setRequrements(true);
          }
        } else {
          console.log("Check");
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setPageLoader(false)
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
          window.location.reload()
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
            <div className={classes.welcomeMessage}>
              <div>
                <div className={classes.firstWelcome}>
                  {" "}
                  {dayTime},
                  <div className={classes.welcomeName}>
                    {firstNameUser.charAt(0).toUpperCase() + firstNameUser.slice(1)}{" "}
                  </div>
                </div>
                <div className={classes.secondLine}>
                  {" "}
                  Hope you are having a lovely day!{" "}
                </div>
              </div>
              {requirement && (
                <a href={process.env.PUBLIC_URL + "/Step1PAR"}>
                  <ActionButton
                    buttonText="Post A Requirement"
                    buttonType={"small"}
                  />
                </a>
              )}
            </div>

            <div className={classes.bannerContainer}>
              <img
                src={process.env.PUBLIC_URL +"/assets/banners/Client_Dashboard_Banner.jpg"}
                alt="HireTop_Verified_Freelancer_Rozgaar"
                title="HireTop_Verified_Freelancer_Rozgaar"
                loading="lazy"
                className={classes.banner}
                height={"105px"}
                width={"100%"}
              />
            </div>
{pageLoader?<><div >
              <RISkeletonLoading loadingType={"PublicRecRequirementCard"} />
            </div> 

                <MyProposals freelancerProposal={freelancerProposal} /></>
                :<>
                 {!requirement && (
              <>
                <NoRequirment />
                <ProfileHealth profileHealthData={profileHealthData} databoardData={databoardData} />
              </>
            )}
                </>}
           
            {requirement && (
              <>
                <RecRequirmentCard
                  requirementsCard={postArequirementDetails}
                  addonData={addonData}
                  device={"Mobile"}
                  ClosePost={ClosePosting}
                  CloseModal={closeModalShow}
                  CancelButton={() => setCloseModalShow(false)}
                  CrossButton={() => setCloseModalShow(false)}
                />

                <MyProposals freelancerProposal={freelancerProposal} />
              </>
            )}

            <div>
              <SuggestiveSKills suggestedSkills={suggestedSkills} />
              {requirement && (
                <ProfileHealth profileHealthData={profileHealthData} />
              )}
              <div className={classes.snippetsCollection}>
                <RozgaarIsProtected />
              </div>
            </div>
          </NewClientDashboardMobile>
        );

      default:
        return (
          <NewClientDashboard>
            <div className={classes.welcomeMessage}>
              <div>
                <div className={classes.firstWelcome}>
                  {" "}
                  {dayTime},
                  <div className={classes.welcomeName}>

                    {firstNameUser.charAt(0).toUpperCase() + firstNameUser.slice(1)}{" "}
                  </div>
                </div>
                <div className={classes.secondLine}>
                  {" "}
                  Hope you are having a lovely day!{" "}
                </div>
              </div>
              {requirement && (
                <a href={process.env.PUBLIC_URL + "/Step1PAR"}>
                  <ActionButton
                    buttonText="Post A Requirement"
                    buttonType={"small"}
                  />
                </a>
              )}
            </div>

            <div className={classes.bannerContainer}>
              <img
                src={process.env.PUBLIC_URL +"/assets/banners/NewDashboardBanner.png"}
                alt="HireTop_Verified_Freelancer_Rozgaar"
                title="HireTop_Verified_Freelancer_Rozgaar"
                loading="lazy"
                className={classes.banner}
                height={"160px"}
                width={"100%"}
              />
            </div>
{pageLoader? <div className={classes.pageDivider}>
                <div className={classes.leftArea}>
                  <div className={classes.RequirementCard_Package}>
                    <div className={classes.mainHeading}>My Requirements</div>
                    <div >
              <RISkeletonLoading loadingType={"PublicRecRequirementCard"} />
            </div> 
                  </div>

                  <SuggestiveSKills suggestedSkills={suggestedSkills} />
                </div>
                <div className={classes.rightArea}>
                  <MyProposals freelancerProposal={freelancerProposal} />
                  <ProfileHealth profileHealthData={profileHealthData} />
                  <RozgaarIsProtected />
                </div>
              </div>:<> {!requirement && (
              <div className={classes.noreqAndProfile}>
                {" "}
                <NoRequirment />{" "}
                <ProfileHealth profileHealthData={profileHealthData} />{" "}

              </div>
            )}</>}
           



            {requirement && (
              <div className={classes.pageDivider}>
                <div className={classes.leftArea}>
                  <div className={classes.RequirementCard_Package}>
                    <div className={classes.mainHeading}>My Requirements</div>
                    <RecRequirmentCard
                      requirementsCard={postArequirementDetails}
                      addonData={addonData}
                      ClosePost={ClosePosting}
                      CloseModal={closeModalShow}
                      CancelButton={() => setCloseModalShow(false)}
                      CrossButton={() => setCloseModalShow(false)}
                    />
                  </div>

                  <SuggestiveSKills suggestedSkills={suggestedSkills} />
                </div>
                <div className={classes.rightArea}>
                  <MyProposals freelancerProposal={freelancerProposal} />
                  <ProfileHealth profileHealthData={profileHealthData} />
                  <RozgaarIsProtected />
                </div>
              </div>
            )}
          </NewClientDashboard>
        );
    }
  };

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`Employer Dashboard | Rozgaar India`}</title>
      <meta
        name="description"
        content={`Manage freelancers in your workplace dashboard. Receive freelancers profiles and proposals, connect via chat or call, and manage payments—all from a single dashboard.`}

      />
      <link rel="canonical" href="https://www.rozgaarindia.com/employer-workplace" />
    </Helmet>

    {MobileWebHandlerSwitch(props.device)}</>;
};
export default WorkPlace;
