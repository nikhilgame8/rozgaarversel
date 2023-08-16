import { useState } from "react";
import classes from "./MenuArea.module.css";
import { RiFolderMusicFill, RiVideoFill, RiFolderFill } from "react-icons/ri";

const MenuArea = (props) => {
  const [menuSelected, setMenuSelected] = useState("Portfolio");

  const PortfolioFileView = (item) => {
    switch (item.PortfolioType) {
      case "Image":
        return (
          <div className={classes.CrossIconContainer}>
            <img
              src={
                typeof item.PortfolioURL === "object"
                  ? URL.createObjectURL(item.PortfolioURL)
                  : item.PortfolioURL
              }
              className={classes.updateImage}
              alt="Portfolio_Image"
              title="Portfolio_Image"
              loading="lazy"
              width={100}
              height={100}
            />
          </div>
        );

      case "Audio/Video":
        return (
          <div className={classes.CrossIconContainer}>
            <RiFolderMusicFill className={classes.fileIcon} size={30} />
          </div>
        );
      case "video":
        return (
          <div className={classes.CrossIconContainer}>
            <RiVideoFill className={classes.fileIcon} size={30} />
          </div>
        );
      case "Document":
        return (
          <div className={classes.CrossIconContainer}>
            <RiFolderFill className={classes.fileIcon} size={30} />
          </div>
        );

      default:
        break;
    }
  };

  const ViewSwitch = () => {
    switch (menuSelected) {
      case "Certification":
        return (
          <div className={classes.imageMainArea}>
            {props.menuAreaData.certification&&props.menuAreaData.certification.map((item, index) => {
              return (
                <div className={classes.CertificationContainer}>
                  <div className={classes.certificationListContainer}>
                    <div>
                      <b>Course Name:</b> {item.CertificateName}
                      <br />
                      <b>Work Type:</b> {item.CertificateAuthority}
                      <br />
                      <b>Experience Duration:</b>{" "}
                      {item.CertificateYear.split("-")[0]}
                      <br />
                      <b>Certificate File:</b> {item.CertificateFile}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case "Portfolio":
        return (
          <div className={classes.portfolioImageContainer}>
            {props.menuAreaData.portfolio.length !== 0 &&
              props.menuAreaData.portfolio.map((item, index) => {
                return PortfolioFileView(item);
              })}
          </div>
        );
      case "Experience":
        return (
          props.menuAreaData.experience.length !== 0 &&
          props.menuAreaData.experience.map((item, index) => {
            return (
              <div className={classes.CrossIconContainer}>
                <div className={classes.experienceListContainer}>
                  <b>Experience Type:</b>{" "}
                  {item.IsFreelancer === "1" ? "Freelance" : "Job"}
                  {item.IsFreelancer === "1" && (
                    <div>
                      <b>Website:</b> {item.WorkExperienceWebsite}
                      <br />
                      <b>Work Type:</b> {item.WorkExperienceJobType}
                      <br />
                      <b>Experience Duration:</b> {item.WorkExperienceYears}
                    </div>
                  )}
                  {item.IsFreelancer === "0" && (
                    <div>
                      <b>Company Name:</b> {item.WorkExperienceComanyName}
                      <br />
                      <b>Company Address:</b>
                      {item.WorkExperienceCompanyAddress}
                      <br />
                      <b>Experience Duration:</b> {item.WorkExperienceYears}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        );
      case "Education":
        return (
          <div className={classes.imageMainArea}>
            {props.menuAreaData.education.map((item) => {
              return (
                <div className={classes.CertificationContainer}>
                  <div className={classes.certificationListContainer}>
                    <div>
                      <b>Degree: </b> {item.Degree}
                      <br />
                      <b>College: </b> {item.College}
                      <br />
                      <b>Year: </b> {item.Year.substr(0, 4)}
                      <br />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.menuContainer}>
        <div
          className={
            menuSelected === "Portfolio"
              ? classes.selectedMenu
              : classes.menuOptions
          }
          onClick={() => setMenuSelected("Portfolio")}
        >
          Portfolio
        </div>
        <div
          className={
            menuSelected === "Certification"
              ? classes.selectedMenu
              : classes.menuOptions
          }
          onClick={() => setMenuSelected("Certification")}
        >
          Certification
        </div>
        <div
          className={
            menuSelected === "Experience"
              ? classes.selectedMenu
              : classes.menuOptions
          }
          onClick={() => setMenuSelected("Experience")}
        >
          Experience
        </div>
        <div
          className={
            menuSelected === "Education"
              ? classes.selectedMenu
              : classes.menuOptions
          }
          onClick={() => setMenuSelected("Education")}
        >
          Education
        </div>
      </div>

      {ViewSwitch()}
    </div>
  );
};

export default MenuArea;
