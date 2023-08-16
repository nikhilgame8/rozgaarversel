import React, { useState, useEffect } from "react";
import classes from "./Notification.module.css";
import Loader from "react-loader-spinner";
import {
  FcUnlock,
  FcMoneyTransfer,
  FcHighPriority,
  FcServices,
  FcRating,
  FcDocument,
  FcInfo,
  FcOk,
  FcApproval,
  FcBriefcase,
  FcFile,
  FcPuzzle,
} from "react-icons/fc";
import { RiMessage2Fill } from "react-icons/ri";
import RISkeletonLoading from "../../Components/RISkeletonLoading";
const Notification = () => {
  const [isdataUnread, setIsDataUnread] = useState([]);
  const [readData, setReadData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  let userID = localStorage.getItem("Client_userID");

  useEffect(() => {
    GetNotificationAPI();
  }, []);
  const GetNotificationAPI = () => {
    setIsLoading(true)
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
    fetch(global.apiLink + "/api/rozgaarapi/GetNotification", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsDataUnread(result.dataunread);
        setReadData(result.dataread);
        console.log(result.dataread);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  };
  const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  const SwitchStatus = (imagesfornotification) => {
    switch (imagesfornotification) {
      case "Post Live":
        return (
          <div>
            <FcBriefcase className={classes.icon} />
          </div>
        );
      case "Post Rejected":
        return (
          <div>
            <FcHighPriority className={classes.icon} />
          </div>
        );
      case "Urgent":
        return (
          <div>
            <FcInfo className={classes.icon} />
          </div>
        );
      case "Feature":
        return (
          <div>
            <FcPuzzle className={classes.icon} />
          </div>
        );
      case "Personal Manager":
        return (
          <div>
            <FcServices className={classes.icon} />
          </div>
        );
      case "NDA ":
        return (
          <div>
            <FcFile className={classes.icon} />
          </div>
        );
      case "Waitlist Unlocked":
        return (
          <div>
            <FcUnlock className={classes.icon} />
          </div>
        );
      case "Freelancer Proposal":
        return (
          <div>
            <FcDocument className={classes.icon} />
          </div>
        );
      case "Hired Freelancer":
        return (
          <div>
            <FcApproval className={classes.icon} />
          </div>
        );
      case "Request Payment":
        return (
          <div>
            <FcMoneyTransfer className={classes.icon} />
          </div>
        );
      case "Sucess Payment Message":
        return (
          <div>
            <FcOk className={classes.icon} />
          </div>
        );
      case "Rate And Review":
        return (
          <div>
            <FcRating className={classes.icon} />
          </div>
        );
      case "MESSAGE":
        return (
          <div>
            <RiMessage2Fill className={classes.icon} />
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <React.Suspense
      fallback={
        <div className="pageLoader">
          <Loader
            type="TailSpin"
            color="red"
            height={80}
            width={80}
            className="text-center my-5"
          />
        </div>
      }
    >
      <div className={classes.Notification_heading}>Notification</div>
      <div className={classes.Notification_maindiv}>
        <div className={classes.Notification_container}>

          {isdataUnread || readData ? (
            <div>
              {isLoading ? <div >
                <RISkeletonLoading loadingType={"Notifation"} />
              </div> :
                <div>
                  {isdataUnread &&
                    isdataUnread.map((item, index) => {
                      return (
                        <>
                          <div key={index} className={classes.Notification_flex}>
                            {SwitchStatus(item.Event)}
                            <div>
                              <div
                                className={
                                  Text === "dataunread"
                                    ? classes.notification_text
                                    : classes.notification_textbold
                                }
                              >
                                {item.Text}
                              </div>
                              <div className={classes.Notification_time}>
                                {timeSince(new Date(item.UpdatedDate))} ago
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}

                  {readData &&
                    readData.map((item, index) => {
                      return (
                        <>
                          <div key={index} className={classes.Notification_flex}>
                            {SwitchStatus(item.Event)}
                            <div>
                              <div
                                className={
                                  Text === "dataunread"
                                    ? classes.notification_text
                                    : classes.notification_textbold
                                }
                              >
                                {item.Text}
                              </div>
                              <div className={classes.Notification_time}>
                                {timeSince(new Date(item.UpdatedDate))} ago
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              }
            </div>
          ) : (
            <div className={classes.blank_Notification_div}>
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/notification/Nothing.svg"
                }
                className={classes.blank_Notification_img}
                alt="Notification_Image"
                title="Notification_Image"
                loading="lazy"
                width={"20%"}
                height={130}
              />
              <div className={classes.blank_Notification_heading}>
                Nothing here!
              </div>
              <div className={classes.blank_Notification_text}>
                You do not have any notification yet
              </div>
            </div>
          )}




        </div>
      </div>
    </React.Suspense>
  );
};
export default Notification;
