import classes from "./LeftMenu.module.css";
import React, { useState, useRef, useEffect } from "react";
import {
  FcCustomerSupport,
  FcBriefcase,
  FcSms,
  FcRules,
  FcViewDetails,
  FcClock,
  FcManager,
  FcCollaboration,
  FcSearch,
} from "react-icons/fc";

import { Link, useLocation } from "react-router-dom";
import { encodeAndSendToChat } from "./ProposalDetails";

const LeftMenu = (props) => {
  const [leftMenu, setLeftMenu] = useState(false);
  const [optionSelected, setOptionSelected] = useState();
  const { pathname } = useLocation();
    useEffect(() => {
    executeScroll();
  }, [pathname]);
  const scrollToRef = (ref) =>
    window.scrollTo(
      0,
      pathname === "/employer-workplace" ||
        pathname === "/employer-workplace/my-job-posting" ||
        pathname === "/employer-workplace/my-trasaction"
        ? 0
        : ref.current.scrollIntoView()
    );
  const refLocaction = useRef(null);
  const executeScroll = () => scrollToRef(refLocaction);

  const menuOptions = (menu) => {
    setOptionSelected(menu);
    props.option(menu);
  };

  return (
    <div>
      {leftMenu ? (
        <div onClick={() => setLeftMenu(false)}>
          {" "}
         
        </div>
      ) : (
        <div className={classes.rightMenuMain}>
          <a href={process.env.PUBLIC_URL +"/employer-workplace"} className={classes.linkdesign}>
            <div
              ref={refLocaction}
              className={`${classes.leftMenu} ${
                pathname === "/employer-workplace"
                  ? classes.leftMenuSelected
                  : ""
              }`}
            >
              {" "}
              <FcBriefcase size="18px" />
              <div className={classes.menuText}>Work Place</div>
            </div>
          </a>

          <a href={process.env.PUBLIC_URL +"/employer-workplace/my-job-posting"} className={classes.linkdesign}>
            <div
              ref={refLocaction}
              className={`${classes.leftMenu} ${
                pathname === "/employer-workplace/my-job-posting"
                  ? classes.leftMenuSelected
                  : ""
              }`}
            >
              {" "}
              <FcRules size="18px" />
              <div
                className={classes.menuText}
                onClick={() => {
                  menuOptions("Sales");
                }}
              >
                Requirements
              </div>
            </div>
          </a>
          <a
            href={process.env.PUBLIC_URL +"/"}
            onClick={(e) => {
              e.preventDefault();
              encodeAndSendToChat(localStorage.getItem("Client_userID"));
            }}
            target="_blank"
            className={classes.linkdesign}
          >
            <div
              ref={refLocaction}
              className={`${classes.leftMenu} ${
                pathname === "Sales" ? classes.leftMenuSelected : ""
              }`}
            >
              {" "}
              <FcSms size="18px" />
              <div
                className={classes.menuText}
                onClick={() => {
                  menuOptions("Chat");
                }}
              >
                Chat
              </div>
            </div>
          </a>

          <a href={process.env.PUBLIC_URL +"/employer-workplace/my-trasaction"} className={classes.linkdesign}>
            <div
              ref={refLocaction}
              className={`${classes.leftMenu} ${
                pathname === "/employer-workplace/my-trasaction" ? classes.leftMenuSelected : ""
              }`}
            >
              {" "}
              <FcViewDetails size="18px" />
              <div
                className={classes.menuText}
                onClick={() => {
                  menuOptions("Revenue");
                }}
              >
                Transactions
              </div>
            </div>
          </a>
          <a href={process.env.PUBLIC_URL +"/employer-workplace/notification"} className={classes.linkdesign}>
            <div
              ref={refLocaction}
              className={`${classes.leftMenu} ${
                pathname === "/employer-workplace/notification" ? classes.leftMenuSelected : ""
              }`}
            >
              {" "}
              <FcClock size="18px" />
              <div
                className={classes.menuText}
                onClick={() => {
                  menuOptions("Notifications");
                }}
              >
                Notifications
              </div>
            </div>
          </a>
          <a href={process.env.PUBLIC_URL +"/employer-workplace/my-profile"} className={classes.linkdesign}>
            <div
              ref={refLocaction}
              className={`${classes.leftMenu} ${
                pathname === "/employer-workplace/my-profile" ? classes.leftMenuSelected : ""
              }`}
            >
              {" "}
              <FcManager size="18px" />
              <div className={classes.menuText}>Profile</div>{" "}
            </div>
          </a>

          <hr className={classes.horiTag} />

          <a href={process.env.PUBLIC_URL +"/hire-assistant"} className={classes.linkdesign}>
            <div
              ref={refLocaction}
              className={`${classes.leftMenu}  ${
                pathname === "/hire-assistant" ? classes.leftMenuSelected : ""
              }`}
            >
              {" "}
              <FcCollaboration size="18px" />
              <div className={classes.menuText}>Hire Assistant</div>{" "}
            </div>
          </a>

          <a href={process.env.PUBLIC_URL +"/employer-workplace/customer-support"} className={classes.linkdesign}>
            <div
              ref={refLocaction}
              className={`${classes.leftMenu} ${
                pathname === "/employer-workplace/customer-support" ? classes.leftMenuSelected : ""
              }`}
            >
              {" "}
              <FcCustomerSupport size="18px" />
              <div className={classes.menuText}>Contact support</div>
            </div>
          </a>
          <a href={process.env.PUBLIC_URL +"/employer-workplace/How-to-hire-freelancer"} className={classes.linkdesign}>
            <div
              ref={refLocaction}
              className={`${classes.leftMenu} ${
                pathname === "/employer-workplace/How-to-hire-freelancer"
                  ? classes.leftMenuSelected
                  : classes.leftMenu
              }`}
            >
              {" "}
              <FcSearch size="18px" />
              <div
                className={classes.menuText}
                onClick={() => setLeftMenu(true)}
              >
                How to Hire
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default LeftMenu;
