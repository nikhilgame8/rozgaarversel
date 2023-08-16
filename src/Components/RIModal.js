import React from "react";

import classes from "./RIModal.module.css";
import { BsCheckLg } from "react-icons/bs";
import ActionButton from "./ActionButton";
import Loader from "react-loader-spinner";
import { AiOutlineClose } from "react-icons/ai";
import {IoIosArrowRoundForward} from "react-icons/io"


const RIModal = (props) => {




  const Backdrop = () => {
    return <div className={classes.backdrop} />;
  };

  const MobileWebHandlerSwitch = (RIModalType) => {
    switch (RIModalType) {
      case "RedirectFreelancer":
        return (
          <>
            <Backdrop />
            <div className={classes.overlay}>
              <div className={classes.mainModalContainer}>
              <div className={classes.closeModal} onClick={props.onClick}>
                    <AiOutlineClose size={25} />
                  </div>
                <div className={classes.modalContent}>
                <img src="../../rozgaarIconNew.png" alt="Freelancer_Logo" className={classes.title} width={250} height={60} title="Freelancer_Logo" loading="lazy"/>
                <img src="../../rozgaarIconNew.png" alt="Freelancer_Logo" className={classes.titleIcon} width={180} height={40} title="Freelancer_Logo" loading="lazy"/>
                  <div className={classes.Message}>
                  Join The Largest Freelancer Community 

                    <div className={classes.msgbtmcenter}>Apply on Freelance Jobs & Projects</div>
                  </div>
                  <div onClick={props.onHrefClick}>
                    <a href={props.href} className={classes.buttonRedirectText} target="_blank">
                      {/* <ActionButton buttonText={"Visit Freelancer"}
                        buttonType={"small"} /> */}
                        Visit Freelancer <span><IoIosArrowRoundForward  className={classes.forwardIcon}/></span>
                    </a>
                  </div>
                 
                 
                </div>
                <div>

                </div>
              </div>
            </div>
          </>
        );
      case "FilterMenu":
        return (
          <>
            <Backdrop />
            <div className={classes.overlay}>

              <div className={classes.mainModalContainer}>
                <div className={classes.closeModal} onClick={() => props.modalClose()}>
                  <AiOutlineClose size={25} onClick={props.modalClose} />
                </div>
                <div className={classes.modalContentFilter}>

                  <div className={classes.Message}>
                    <div className={classes.filterOptionHeadings}>Work Type </div>
                    {props.FilterTypes.map((item, i) => {
                      return (
                        <>
                          <div className={classes.checkBoxContainer} key={item.key}>
                            <input
                              type="checkbox"
                              id={item.key}
                              onChange={(e) =>
                                props.filterSelectedHandler(
                                  e.target.checked,
                                  item.key,
                                  item.work
                                )
                              }
                              checked={item.FilterTypes}
                            />
                            <div className={classes.WorkTypeContainer}>{item.WorkType} </div>

                          </div>

                        </>
                      );
                    })}
                  </div>
                  <div className={classes.MessageSkill}>Job Skills</div>
                  <div className={classes.setoverFlow}>
                    <div className={classes.tagDisplay}>
                      {props.jobSkills.map((item, index) => {
                        return (
                          <div className={classes.PARBtn_Link} onClick={() => props.FindSkillBy(item.Skill)}>
                            {" "}
                            <h3 className={classes.skillOption} >
                              {item.Skill}
                            </h3>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* {console.log(props.modalClose)} */}
                  <div className={classes.buttonRedirectText} onClick={() => props.modalClose()}>
                    <ActionButton buttonText={"Apply"}
                      buttonType={"small"} />
                  </div>


                </div>
                <div>

                </div>
              </div>
            </div>
          </>
        );
        

      default:
        return (
          <>
            <Backdrop />
            <div className={classes.modalContainer}>
              <div className={classes.modal}>
                <div className={classes.ModalCheckIcon}>
                  <BsCheckLg className={classes.modalcheck} />
                </div>
                <div className={classes.ModalCheckTextFirst}>
                  {props.Heading}
                </div>
                <div className={classes.ModalCheckTextSecond}>
                  {props.Text}
                </div>
                <div className={classes.ActionBtn}>
                  <ActionButton
                    buttonType={"small"}
                    buttonText={"Ok"}
                    onClick={() =>
                      props.onClick()
                    }
                  />

                </div>
              </div>
            </div>
          </>
        );
    }
  };
  return (
    <>
      {MobileWebHandlerSwitch(props.RIModalType)}
    </>
  )


};

export default RIModal;
