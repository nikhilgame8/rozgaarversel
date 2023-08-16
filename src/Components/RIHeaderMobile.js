import classes from "./RIHeader.module.css";

import React, { useState, useContext,useRef } from "react";
import { slide as Menu } from "react-burger-menu";
import { IoClose } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";

import { AiFillHome, AiOutlinePoweroff } from "react-icons/ai";

import {
  MdDashboard,
  MdOutlineNotifications,
  MdListAlt,
  MdMapsHomeWork,
} from "react-icons/md";
import { FaSignInAlt, FaSignOutAlt, FaQuestion, FaUserAlt } from "react-icons/fa";
import {
  BsChatRightDots,

  BsFillPersonBadgeFill,

} from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import {AiTwotoneHome} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../Components/useOnClickOutside";
import ActionButton from "./ActionButton";
import ProfileIcon from "./HomeAndLandingPages/ProfileIcon";
import { UserContext } from "../Context/UserContext";
import { encodeAndSendToChat } from "./NewClientDashboardComp/ProposalDetails";
import RIModal from "./RIModal";


const RIHeaderMobile = (props) => {
  const { setIsUserLoggedIn } = useContext(UserContext);

  const dropdownRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const [modal, setModal] = useState(false);


  useOnClickOutside(dropdownRef, () => {
    setMenuClicked(false);
  });

  let navigate = useNavigate();
  var isMenuOpen = (state) => {
    if (state.isOpen === true) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
    return state.isOpen;
  };

  let userLoggedIn = localStorage.getItem("Client_userLoggedIn");
  let FirstName = localStorage.getItem("Client_FirstName");
  let LastName = localStorage.getItem("Client_LastName");
  let UserName = localStorage.getItem("Client_UserName");
  let ProfilePicture = localStorage.getItem("Client_ProfilePicture");

  const Logout = () => {
    sessionStorage.removeItem("Client_googleBiEmail");
    sessionStorage.removeItem("Client_userID");
    sessionStorage.removeItem("Client_USERMOBILENO");
    sessionStorage.removeItem("Client_USEREMAIL");
    sessionStorage.removeItem("Client_FirstName");
    sessionStorage.removeItem("Client_LastName");
    sessionStorage.removeItem("Client_userLoggedIn");
    localStorage.removeItem("Client_userLoggedIn");
    localStorage.removeItem("Client_googleBiEmail");
    localStorage.removeItem("Client_userID");
    localStorage.removeItem("Client_USERMOBILENO");
    localStorage.removeItem("Client_USEREMAIL");
    localStorage.removeItem("Client_FirstName");
    localStorage.removeItem("Client_LastName");
    localStorage.removeItem("Client_UserName");
    localStorage.removeItem("Client_ProfilePicture");
    localStorage.removeItem("Client_IsLoginType")
    localStorage.removeItem("Client_FIRSTNAME")
    localStorage.removeItem("Client_LASTNAME")
    sessionStorage.removeItem("afterAuthRedirectUrl");
    setIsUserLoggedIn(false);
    setMenuClicked(!menuClicked);
    navigate("/");
  };


  const menuStatusHandler = () => {
    setMenuClicked(!menuClicked);
  };

 
  return (
    <>
 
            {modal && (
              <RIModal RIModalType={"RedirectFreelancer"} onClick={() => setModal(false)} href={process.env.PUBLIC_URL +"https://freelancer.rozgaarindia.com/signup"} onHrefClick={()=>setModal(false)}/>
            )}
      {props.type === "web" && !userLoggedIn ? (
        <div className={classes.headerWeb}>
          <a href={process.env.PUBLIC_URL +"/"} className={classes.linkDesignNone}>
            <img
            src= {process.env.PUBLIC_URL + "/assets/IPassets/Rozgaar_Black_Logo.svg"} 
              alt="Rozgaar_India_Logo"
              className={classes.riLogo}
              width={"150px"}
              height={"60px"}
              title="Rozgaar_India_Logo"
              loading="lazy"
            />
          </a>
          <div className={classes.menuContainerTop}>
            <div className={classes.topMenuHeads}>
              <a href={process.env.PUBLIC_URL +"/how-to-hire-freelancer"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/how-to-hire-freelancer");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className={classes.linkDesignNone}
              >
                <div className={classes.menubuttons}> How to Hire </div>
              </a>
              <a href={process.env.PUBLIC_URL +"/skills"} className={classes.linkDesignNone}>
                <div className={classes.menubuttons}> Explore Skills </div>
              </a>
              <a href={process.env.PUBLIC_URL +"/Step1PAR"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className={classes.linkDesignNone}
              >
                <div className={classes.menubuttons}>Post a Requirement </div>
              </a>
             <div className={classes.menubuttons} onClick={()=>setModal(true)}>Join as Freelancer </div>
            </div>
            <div className={classes.topMenuHeadsRight}>
              <a href={process.env.PUBLIC_URL +"/login"} className={classes.linkDesignNone}>
                <div className={classes.menubuttonsLogin}> Log In </div>
              </a>

              <a href={process.env.PUBLIC_URL +"/join"} className={classes.PARBtn_Link}>
                {" "}
                <ActionButton buttonText="Sign Up" buttonType="signUp" />
              </a>
            </div>
          </div>
        </div>
      ) : props.type === "web" && userLoggedIn ? (
        <div className={classes.headerWeb}>
          <a href={process.env.PUBLIC_URL +"/"} className={classes.linkDesignNone}>
            <img
                      src= {process.env.PUBLIC_URL + "/assets/IPassets/Rozgaar_Black_Logo.svg"} 
              alt="Rozgaar_India_Logo"
              className={classes.riLogo}
              width={"150px"}
              height={"60px"}
              title="Rozgaar_India_Logo"
              loading="lazy"
            />
          </a>
          <div className={classes.menuContainerTop}>
            <div className={classes.topMenuHeads}>
              <a href={process.env.PUBLIC_URL +"/skills"} className={classes.linkDesignNone}>
                <div className={classes.menubuttons}> Explore Skills </div>
              </a>

              <a href={process.env.PUBLIC_URL +"/Step1PAR"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className={classes.linkDesignNone}
              >
                <div className={classes.menubuttons}>Post a Requirement </div>
              </a>
            </div>
            <div className={classes.topMenuHeadsRight}>
              <div className={classes.menubuttons}>
                {" "}
                <BsChatRightDots onClick={() => { encodeAndSendToChat(localStorage.getItem("Client_userID")) }} />
              </div>

              <a href={process.env.PUBLIC_URL +"/employer-workplace/notification"} className={classes.linkDesignNone}>
                <div className={classes.menubuttons}>
                  {" "}
                  <MdOutlineNotifications size={"25px"} />{" "}
                </div>
              </a>
              <div
                className={classes.menubuttons}
                onClick={() => menuStatusHandler()}
              >
                <ProfileIcon
                  size={"25px"}
                  FirstName={FirstName}
                  LastName={LastName}
                  ProfilePicture={ProfilePicture}
                />
              </div>
            </div>

            <div
              ref={dropdownRef}
              className={
                menuClicked === true
                  ? classes.menuDropdown
                  : classes.menuDropdownHide
              }
            >
              <a href={process.env.PUBLIC_URL +"/employer-workplace"}
                onClick={() => {
                  menuStatusHandler();
                  sessionStorage.setItem(
                    "afterAuthRedirectUrl",
                    "/employer-workplace"
                  );
                }}
                className={classes.linkTag}
              >
                <div className={classes.iconAndText}>
                  <MdDashboard />
                  <div className={classes.userMenuOptions}> Work Place </div>
                </div>
              </a>
              <a href={process.env.PUBLIC_URL +"/employer-workplace/my-job-posting"}
                onClick={() => {
                  menuStatusHandler();
                  sessionStorage.setItem(
                    "afterAuthRedirectUrl",
                    "/employer-workplace/my-job-posting"
                  );
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className={classes.linkTag}
              >
                <div className={classes.iconAndText}>
                  <MdListAlt />
                  <div className={classes.userMenuOptions}> Requirements</div>
                </div>
              </a>
              <a href={process.env.PUBLIC_URL +"/employer-workplace/my-profile"}
                onClick={() => {
                  menuStatusHandler();
                  sessionStorage.setItem(
                    "afterAuthRedirectUrl",
                    "/employer-workplace/my-profile"
                  );
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className={classes.linkTag}
              >
                <div className={classes.iconAndText}>
                  <IoIosPerson />
                  <div className={classes.userMenuOptions}>Profile </div>
                </div>
              </a>

              <div className={classes.iconAndText} onClick={() => Logout()}>
                <AiOutlinePoweroff />
                <div className={classes.userMenuOptions}> Logout</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Menu isOpen={openMenu} onStateChange={isMenuOpen}>
            <div className={classes.menuWrapper}>
              <div className={classes.menuNav_contaner}>
                {userLoggedIn ? (
                  <>
                    <div className={classes.drawer_menu}>
                      <div className={classes.drawer_menu_header}>
                        <div className={classes.close_button}>
                          {" "}
                          <IoClose
                            size="24px"
                            onClick={() => {
                              setOpenMenu(false);
                            }}
                          />
                        </div>
                        <div className={classes.menu_profile}>
                          <ProfileIcon
                            size={"25px"}
                            FirstName={FirstName}
                            LastName={LastName}
                            ProfilePicture={ProfilePicture}
                            leftMenu={true}
                          />

                          <div>
                            <h2 className={classes.menuProfile_name}>
                              {UserName}
                            </h2>

                            <button
                              onClick={() => {
                                navigate(process.env.PUBLIC_URL +"/employer-workplace/my-profile");
                                setOpenMenu(false);
                              }}
                              className={classes.menuProfile_button}
                            >
                              Update Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.menuNav}>
                    <div className={classes.link_container}>
                        <AiTwotoneHome className={classes.menu_icon} />
                        <a
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          href={process.env.PUBLIC_URL +"/"}
                          className={classes.link}
                        >
                          <div>Home</div>
                        </a>
                      </div>
                      <div className={classes.link_container}>
                        <MdDashboard className={classes.menu_icon} />
                        <a
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          href={process.env.PUBLIC_URL +"/employer-workplace"}
                          className={classes.link}
                        >
                          <div>Work Place</div>
                        </a>
                      </div>
                      <div className={classes.link_container}>
                        <MdListAlt className={classes.menu_icon} />
                        <a
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          href={process.env.PUBLIC_URL +"/employer-workplace/my-job-posting"}
                          className={classes.link}
                        >
                          <div>Requirements</div>
                        </a>
                      </div>
                      <div className={classes.link_container}>
                        <AiFillHome className={classes.menu_icon} />
                        <a
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          href={process.env.PUBLIC_URL +"/skills"}
                          className={classes.link}
                        >
                          <div>Explore Skills</div>
                        </a>
                      </div>
                      <div className={classes.link_container}>
                        <BsFillPersonBadgeFill className={classes.menu_icon} />
                        <a
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          href={process.env.PUBLIC_URL +"/Step1PAR"}
                          className={classes.link}
                        >
                          <div>Post A Requirement</div>
                        </a>
                      </div>

                      <div className={classes.link_container}>
                        <FaUserAlt className={classes.menu_icon} />
                        <a
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          href={process.env.PUBLIC_URL +"/employer-workplace/my-profile"}
                          className={classes.link}
                        >
                          <div>Profile</div>
                        </a>
                      </div>
                    </div>
                    <div className={classes.border}></div>
                    <div className={classes.menuNav}>
                      <div className={classes.link_container}>
                        <FaSignOutAlt className={classes.menu_icon} />
                        <div
                          className={classes.link_bottom}
                          onClick={() => {
                            Logout();
                            setOpenMenu(false);
                          }}
                        >
                          <div>Logout</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={classes.crossIcon}>
                      {" "}
                      <IoClose
                        size="24px"
                        onClick={() => {
                          setOpenMenu(false);
                        }}
                      />
                    </div>
                    <div className={classes.menu_nav}>
                    <div className={classes.link_container}>
                        <AiTwotoneHome className={classes.menu_icon} />
                        <a
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          href={process.env.PUBLIC_URL +"/"}
                          className={classes.link}
                        >
                          <div>Home</div>
                        </a>
                      </div>
                      <div className={classes.link_container}>
                        <FaQuestion className={classes.menu_icon} />
                        <a
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          href={process.env.PUBLIC_URL +"/how-to-hire-freelancer"}
                          className={classes.link}
                        >
                          <div>How to Hire</div>
                        </a>
                      </div>
                      <div className={classes.link_container}>
                        <AiFillHome className={classes.menu_icon} />
                        <a
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          href={process.env.PUBLIC_URL +"/skills"}
                          className={classes.link}
                        >
                          <div>Explore Skills</div>
                        </a>
                      </div>
                      <div className={classes.link_container}>
                        <BsFillPersonBadgeFill className={classes.menu_icon} />
                        <a
                          href={process.env.PUBLIC_URL +"/Step1PAR"}
                          onClick={() => {
                            sessionStorage.setItem(
                              "afterAuthRedirectUrl",
                              "/Step1PAR"
                            );
                            sessionStorage.setItem("goBackRedirectUrl", "/");
                            setOpenMenu(false);
                          }}
                          className={classes.link}
                        >
                          <div>Post a Requirement</div>
                        </a>
                      </div>
                      <div className={classes.link_container}>
                        <MdMapsHomeWork className={classes.menu_icon} />
                        <div 
                          onClick={() => {
                            setOpenMenu(false);setModal(true)
                          }}
                          
                          className={classes.link}
                        >
                          <div>Join As Freelancer</div>
                        </div>
                      </div>
                      
                    </div>
                    <div className={classes.border}></div>
                    <div className={classes.menuNav}>
                      <div className={classes.link_container}>
                        <FaSignInAlt className={classes.menu_icon_noBg} />
                        <a
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          href={process.env.PUBLIC_URL +"/login"}
                          className={classes.link}
                        >
                               <div className={classes.loginHighlight}>Login</div>
                        </a>
                      </div>
                      <div className={classes.link_container}>
                        <FaSignOutAlt className={classes.menu_icon_noBg} />
                        <a
                          onClick={() => {
                            setOpenMenu(false);
                          }}
                          href={process.env.PUBLIC_URL +"/join"}
                          className={classes.link}
                        >
                           <div className={classes.loginHighlight}>Signup</div>
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Menu>

          {userLoggedIn ? (
            <>
              {" "}
              <div className={classes.headerMainContainer_Mobile}>
                <div className={classes.logoAndMenuDiv}>
                  {" "}
                  <BiMenuAltRight
                    size="35"
                    className={classes.hamburger}
                    onClick={() => {
                      setOpenMenu(!openMenu);
                    }}
                  />
                  <a href={process.env.PUBLIC_URL +"/"} className={classes.linkDesignNone}>
                    <img
                              src= {process.env.PUBLIC_URL + "/assets/IPassets/Rozgaar_Black_Logo.svg"} 
                      alt="Rozgaar_India_Logo"
                      className={classes.riLogo_Mobile}
                      width={"110px"}
                      height={"40px"}
                      title="Rozgaar_India_Logo"
                      loading="lazy"
                    />
                  </a>
                </div>
                <div className={classes.headerMobile}>
                  <div className={classes.menuContainerTopMobile}>
                    <div
                      className={classes.menubuttons}
                      onClick={() => menuStatusHandler()}
                    >
                      <ProfileIcon
                        size={"25px"}
                        FirstName={FirstName}
                        LastName={LastName}
                        ProfilePicture={ProfilePicture}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                ref={dropdownRef}
                className={
                  menuClicked === true
                    ? classes.menuDropdown
                    : classes.menuDropdownHide
                }
              >
                <a
                  href={process.env.PUBLIC_URL +"/employer-workplace"}
                  onClick={() => {
                    menuStatusHandler();
                    sessionStorage.setItem(
                      "afterAuthRedirectUrl",
                      "/employer-workplace"
                    );
                    sessionStorage.setItem("goBackRedirectUrl", "/");
                  }}
                  className={classes.linkTag}
                >
                  <div className={classes.iconAndText}>
                    <MdDashboard />
                    <div className={classes.userMenuOptions}> Work Place </div>
                  </div>
                </a>
                <a
                  href={process.env.PUBLIC_URL +"/employer-workplace/my-job-posting"}
                  onClick={() => {
                    menuStatusHandler();
                    sessionStorage.setItem(
                      "afterAuthRedirectUrl",
                      "/employer-workplace/my-job-posting"
                    );
                    sessionStorage.setItem("goBackRedirectUrl", "/");
                  }}
                  className={classes.linkTag}
                >
                  <div className={classes.iconAndText}>
                    <MdListAlt />
                    <div className={classes.userMenuOptions}> Requirements</div>
                  </div>
                </a>
                <a
                  href={process.env.PUBLIC_URL +"/employer-workplace/my-profile"}
                  onClick={() => {
                    menuStatusHandler();
                    sessionStorage.setItem(
                      "afterAuthRedirectUrl",
                      "/employer-workplace/my-profile"
                    );
                    sessionStorage.setItem("goBackRedirectUrl", "/");
                  }}
                  className={classes.linkTag}
                >
                  <div className={classes.iconAndText}>
                    <IoIosPerson />
                    <div className={classes.userMenuOptions}>Profile </div>
                  </div>
                </a>

                <div className={classes.iconAndText} onClick={() => Logout()}>
                  <AiOutlinePoweroff />
                  <div className={classes.userMenuOptions}> Logout</div>
                </div>
              </div>
            </>
          ) : (
            <div className={classes.headerMainContainer_Mobile}>
              <BiMenuAltRight
                size="35"
                className={classes.hamburger}
                onClick={() => {
                  setOpenMenu(!openMenu);
                }}
              />
              <a href={process.env.PUBLIC_URL +"/"} className={classes.linkDesignNone}>
                <img
                           src= {process.env.PUBLIC_URL + "/assets/IPassets/Rozgaar_Black_Logo.svg"} 
                  alt="Rozgaar_India_Logo"
                  className={classes.riLogo_Mobile}
                  width={"110px"}
                  height={"40px"}
                  title="Rozgaar_India_Logo"
                  loading="lazy"
                />
              </a>
              <a href={process.env.PUBLIC_URL +"/login"} className={classes.JoinBtn_Link}>
                <div className={classes.heading1}> Login</div>
              </a>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RIHeaderMobile;
