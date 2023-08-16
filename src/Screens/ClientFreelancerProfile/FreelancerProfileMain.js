import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AboutFreelancer from "../../Components/ClientFreelancerProfileComp/AboutFreelancer";
import MenuArea from "../../Components/ClientFreelancerProfileComp/MenuArea";
import ProfileImage from "../../Components/ClientFreelancerProfileComp/ProfileImage";
import WorkDetail from "../../Components/ClientFreelancerProfileComp/WorkDetail";
import { pageViewTracker } from "../../Components/GoogleTracking";
import classes from "./FreelancerProfileMain.module.css";
import { Helmet } from "react-helmet";

const FreelancerProfileMain = (props) => {
  const { userID } = useParams();
  const [loading, setLoading] = useState("");
  const [freelancerProfileImage, setFreelancerProfileImage] = useState({
    firstName: "",
    lastName: "",
  })
  const [profileImageData, setProfileImageData] = useState({
    profilePicture: "",
    CoverImage: "",
    firstName: "",
    lastName: "",
    CompanyName: "",
    primarySkill: "",
    isAvailable: "",
    availableCountry: "",
    availableCity: "",
    SocialMedia: [],
  });
  const [aboutFreelancerData, setAboutFreelancerData] = useState({
    skills: [],
    professionalTitle: "",
    description: "",
  });
  const [menuAreaData, setMenuAreaData] = useState({
    portfolio: [],
    certification: [],
    experience: [],
    education: [],
  });
  const [workDetailData, setWorkDetailData] = useState({
    isAvailable: "",
    isMonthly: "",
    isOnCommision: "",
    isContractual: "",
    isOneTime: "",
    languages: [],
  });

  useEffect(() => {
    GetFreelancerProfileAPI();
    pageViewTracker();
  }, []);

  const GetFreelancerProfileAPI = async () => {
    setLoading("GetFreelancerProfile");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );

    var formdata = new FormData();
    formdata.append("FreelancerId", userID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(global.apiLink + "/api/freelancerapp/rozgaarapi/ApprovedFreelancerProfile", requestOptions)

      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200) {
          setProfileImageData({
            profilePicture: result.data.ProfilePicture,
            firstName: result.data.FirstName,
            lastName: result.data.LastName,
            primarySkill: result.data.Skills[0].Skills,
            isAvailable: result.data.IsAvailable,
            Country: result.data.Country,
            City: result.data.City,
            SocialMedia: result.data.SocialMedia,
            CoverImage: result.data.CoverImage,
            CompanyName: result.data.CompanyName
          });
          setAboutFreelancerData({
            skills: result.data.Skills,
            professionalTitle: result.data.ProfessionalTitle,
            description: result.data.Description,
          });
          setMenuAreaData({
            portfolio: result.data.Portfolio,
            certification: result.data.Certification,
            experience: result.data.WorkExperience,
            education: result.data.Education,
          });
          setWorkDetailData({
            isAvailable: result.data.IsAvailable,
            isMonthly: result.data.IsMonthly,
            isOnCommision: result.data.IsOnCommision,
            isContractual: result.data.IsContractual,
            isOneTime: result.data.IsOneTime,
            languages: result.data.Languages,
          });
          setFreelancerProfileImage({
            firstName: result.data.FirstName,
            lastName: result.data.LastName,
          })
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(""));
  };

  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <div className={classes.pageLayout}>
            <div className={classes.mainProfileImageContainer}>
            {profileImageData.CoverImage!==""?
              <img
                className={classes.mainProfileImage}
                src={process.env.PUBLIC_URL+"/assets/banners/FreelancerProfile.webp"}
                alt={profileImageData.firstName + " " + profileImageData.lastName}
                title={profileImageData.firstName + " " + profileImageData.lastName}
                loading="lazy"
                width={"100%"}
                height={120}
              />:
               <img
                className={classes.mainProfileImage}
                src={process.env.PUBLIC_URL+"/assets/banners/FreelancerProfile.webp"}
                alt={profileImageData.firstName + " " + profileImageData.lastName}
                title={profileImageData.firstName + " " + profileImageData.lastName}
                loading="lazy"
                width={"100%"}
                height={120}
              />
            }
            </div>

            <ProfileImage profileImageData={profileImageData} />

            <AboutFreelancer aboutFreelancerData={aboutFreelancerData} />

            <MenuArea menuAreaData={menuAreaData} />

            <WorkDetail workDetailData={workDetailData} />

          </div>
        );

      default:
        return (
          <div className={classes.pageLayout}>

            <div className={classes.mainProfileImageContainer}>
              {profileImageData.CoverImage!==""?
              <img
                className={classes.mainProfileImage}
                src={process.env.PUBLIC_URL+"/assets/banners/FreelancerProfile.webp"}
                alt={profileImageData.firstName + "_" + profileImageData.lastName}
                title={profileImageData.firstName + "_" + profileImageData.lastName}
                loading="lazy"
                height={"200px"}
                width={"100%"}
              />:
              <img
              src={process.env.PUBLIC_URL+"/assets/banners/FreelancerProfile.webp"}
              alt={profileImageData.firstName + "_" + profileImageData.lastName}
              title={profileImageData.firstName + "_" + profileImageData.lastName}
              loading="lazy"
              height={"200px"}
              width={"100%"}
              />
    }
            </div>

            <div className={classes.pageContainer}>
              <div className={classes.leftArea}>
                <div className={classes.profileAboutContainer}>
                  <ProfileImage profileImageData={profileImageData} freelancerProfileImage={"Rozgaar_Profile" + " " + freelancerProfileImage.firstName + " " + freelancerProfileImage.lastName} />
                  <AboutFreelancer aboutFreelancerData={aboutFreelancerData} />
                </div>
                <MenuArea menuAreaData={menuAreaData} />
              </div>
              <div className={classes.rightArea}>
                <WorkDetail workDetailData={workDetailData} />

              </div>
            </div>
          </div>
        );
    }
  };

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{profileImageData.CompanyName ? profileImageData.CompanyName + " " + `Profile | job | Rozgaar India` : profileImageData.firstName + " " + profileImageData.lastName + " " + `Profile | job | Rozgaar India`}</title>
      <meta
        name="description"
        content={profileImageData.CompanyName ? profileImageData.CompanyName+ " " + profileImageData.availableCity + "," + profileImageData.availableCountry + " " + profileImageData.isAvailable + " " + `Skills - ` +
        aboutFreelancerData.skills.map((item) => {
          return (item.Skills)
        }): profileImageData.firstName + " " + profileImageData.lastName + " " + profileImageData.availableCity + "," + profileImageData.availableCountry + " " + profileImageData.isAvailable + " " + `Skills - ` +
          aboutFreelancerData.skills.map((item) => {
            return (item.Skills)
          })}

      />
      <link rel="canonical" href="https://www.rozgaarindia.com/FreelancerProfile" />
    </Helmet>
    {MobileWebHandlerSwitch(props.device)}</>;
};

export default FreelancerProfileMain;
