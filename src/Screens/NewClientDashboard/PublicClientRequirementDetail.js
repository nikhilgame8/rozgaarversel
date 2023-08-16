import { useEffect, useState } from "react";
import ApplicationDetail from "../../Components/NewClientDashboardComp/ApplicationDetail";
import RequirementDetailArea from "../../Components/NewClientDashboardComp/RequirementDetailArea";
import RequirementPageHeader from "../../Components/NewClientDashboardComp/RequirementPageHeader";
import classes from "./PublicClientRequirementDetail.module.css";
import SharePOst from "../../Components/NewClientDashboardComp/SharePost";
import { useLocation, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import NewRequirementCard from "../../Components/NewRequirement/NewRequirementCard";
import { Helmet } from "react-helmet";
import { pageViewTracker } from "../../Components/GoogleTracking";
import { AiOutlineClose } from "react-icons/ai";
import RIModal from "../../Components/RIModal";

const PublicClientRequirementDetail = (props) => {
  const [requirementData, setRequirementData] = useState([]);
  const [shareModalShow, setShareModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [headerDetail, setHeaderDetail] = useState({
    FreelancerPolicy: " ",
    Status: " ",
    Skills: [],
    RequirementType: " ",
    FirstName: "",
    LastName: ""
  });
  const [requirementDetail, setRequirementDetailArea] = useState({
    Title: " ",
    Description: " ",
    CompanyName: " ",
    CompanyLogo: " ",
    CompanyWebsite: " ",
    RequirementType: " ",
    UpdatedDate: " ",
    IsCompany: " ",
    Skills: [],
    Location: "",
    FreelancerPolicy: " ",
    FirstName: "",
    LastName: "",
    Addons: [],
    Country: "",
    State: "",
    City: "",
    OneSkill: ""
  });
  const [applicationDetails, setApplicationDetails] = useState({
    PraposalAmount: " ",
    Currency: " ",
    Unit: " ",
    Addons: [],
    Applied: "",
    WaitList: "",
    RequirementType: "",
    IsCompany: "",
    CompanyName: "",
    IsHybrid: "",
    IsOnsite: "",
    IsRemote: ""
  });

  const { reqId, freelancerType, title } = useParams();
  const [modal, setModal] = useState(false);



  const RequirementID = reqId;

  const { pathname } = useLocation();

  useEffect(() => {
    RequirmentDetailApi();
    pageViewTracker();
  }, [pathname]);



  const RequirmentDetailApi = () => {


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

    fetch(
      global.apiLink + "/api/client/RequirementDetailPublicView",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setRequirementData(result.data.SimilarRequirements);
        setRequirementDetailArea({
          ...requirementDetail,
          Title: result.data.Title,
          Description: result.data.Description,
          CompanyName: result.data.CompanyName,
          CompanyLogo: result.data.CompanyLogo,
          DescriptionHTML: result.data.DescriptionHTML,
          CompanyWebsite: result.data.CompanyWebsite,
          RequirementType: result.data.RequirementType,
          FreelancerPolicy: result.data.FreelancerPolicy,
          UpdatedDate: result.data.UpdatedDate,
          IsCompany: result.data.IsCompany,
          Skills: result.data.Skills,
          Location: result.data.Location,
          FirstName: result.data.FirstName,
          LastName: result.data.LastName,
          Addons: result.data.Addons,
          CreatedDate: result.data.CreatedDate,
          Country: result.data.Country,
          State: result.data.State,
          City: result.data.City,
          Pincode: result.data.Pincode,
          OneSkill: result.data.Skills[0]
        });
        setHeaderDetail({
          ...headerDetail,
          FreelancerPolicy: result.data.FreelancerPolicy,
          Skills: result.data.Skills,
          Status: result.data.Status,
          RequirementType: result.data.RequirementType,
          FirstName: result.data.FirstName,
          LastName: result.data.LastName
        });
        setApplicationDetails({
          ...applicationDetails,
          WaitList: result.data.WaitList,
          Applied: result.data.Applied,
          Addons: result.data.Addons,
          Unit: result.data.BudgetUnit,
          IsCompany: result.data.IsCompany,
          PraposalAmount: result.data.Budget,
          RequirementType: result.data.RequirementType,
          Currency: result.data.BudgetCurrency,
          CompanyName: result.data.CompanyName,
          IsHybrid: result.data.IsHybrid,
          IsOnsite: result.data.IsOnsite,
          IsRemote: result.data.IsRemote
        });
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
      });
  };


  const UserName = (firstName, lastName) => {

    return (
      firstName.charAt(0).toUpperCase() +
      firstName.slice(1) +
      " " +
      lastName.charAt(0).toUpperCase()
    );
  };

  const workTypeColor = (workType) => {
    if (applicationDetails.RequirementType === "commission") {
      return "Other";
    }
    if (applicationDetails.RequirementType === "monthly-basis") {
      return "Temporary";
    }
    if (applicationDetails.RequirementType === "onetime") {
      return "Part-time";
    }

    if (applicationDetails.RequirementType === "contract") {
      return "Contractor";
    }
  };

  const LocationType = () => {
    if (applicationDetails.IsRemote === "1") {
      return "TELECOMMUTE";
    }
    if (applicationDetails.IsOnsite === "1") {
      return "Walk-In";
    }
    if (applicationDetails.IsHybrid === "1") {
      return "TELECOMMUTE";
    }
  }
  const shareOnMobile = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "rozgaarindia.com",
          text: " ",
          url:window.location.href,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong", error);
        });
    }
  };
  const UrlType = (workType) => {
    if (requirementDetail.RequirementType === "commission") {
      return "commission";
    }
    if (requirementDetail.RequirementType === "monthly-basis") {
      return "monthly";
    }
    if (requirementDetail.RequirementType === "onetime") {
      return "one-time";
    }

    if (requirementDetail.RequirementType === "contract") {
      return "contract";
    }
  };

  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <div className={classes.pageLayout}>
 
            {modal && (
               <RIModal RIModalType={"RedirectFreelancer"} onClick={() => setModal(false)} href={process.env.PUBLIC_URL +"https://freelancer.rozgaarindia.com/requirementDetail/"+RequirementID} onHrefClick={()=>setModal(false)}/>
               
            )}
            {isLoading ? (
              <div className={classes.pageLoader}>
                <Loader type="TailSpin" color="red" height={80} width={80} />
              </div>
            ) : (
              <>
                {shareModalShow && (
                  <SharePOst
                    closeModal={() => setShareModalShow(false)}
                    device={"Mobile"}
                    url={window.location.href}
                  />
                )}
                <RequirementPageHeader
                  headerDetail={headerDetail}
                  isLoading={isLoading}
                  OnSharePOst={() => shareOnMobile()}
                  device={"Mobile"}
                />
                <RequirementDetailArea requirementDetail={requirementDetail} isLoading={isLoading} showModal={() => setModal(true)}/>
                <ApplicationDetail applicationDetails={applicationDetails} isLoading={isLoading} device={"Mobile"} showModal={() => setModal(true)} />
                {requirementData.length > 0 ?
                  <NewRequirementCard
                    RequirementData={requirementData}
                    heading={"Similar Requirements"}
                  /> : <></>}
              </>
            )}
          </div>
        );

      default:
        return (

          <div className={classes.pageLayout}>
           
            {modal && (
              <RIModal RIModalType={"RedirectFreelancer"} onClick={() => setModal(false)} href={process.env.PUBLIC_URL +"https://freelancer.rozgaarindia.com/requirementDetail/"+RequirementID} onHrefClick={()=>setModal(false)}/>
            )}
            <>
              {shareModalShow && (
                <SharePOst
                  closeModal={() => setShareModalShow(false)}
                  url={window.location.href}
                />
              )}
              <RequirementPageHeader
                headerDetail={headerDetail}
                isLoading={isLoading}
                OnSharePOst={() => setShareModalShow(true)}
              />
              <div className={classes.pageColumn}>
                <div className={classes.leftArea}>
                  <RequirementDetailArea
                  isLoading={isLoading}
                    requirementDetail={requirementDetail}
                  />
                </div>
                <div className={classes.rightArea}>
                  <ApplicationDetail applicationDetails={applicationDetails} isLoading={isLoading} showModal={() =>  setModal(true)} />
                </div>
              </div>

              {requirementData.length > 0 ?
                <NewRequirementCard
                  RequirementData={requirementData}
                  isLoading={isLoading}
                  heading={"Similar Requirements"}
                /> 
                : <></>} 
            </>
          </div>
        );
    }
  };


  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>{"freelancer job for -" + " " + requirementDetail.Skills.map((item) => {
          return (item.Skill.split(','))
        })}</title>
        <meta
          name="description"
          content={requirementDetail.Title + "." + `Skills Required for freelancer job.` + `Skills - ` + requirementDetail.Skills.map((item) => {
            return (item.Skill.split(','))
          })}

        />
        <link rel="canonical" href={"https://www.rozgaarindia.com/freelancer-" + `${UrlType()}` + "-job/" + `${requirementDetail.Title}`.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-") + "/" + reqId} />
      </Helmet>
      {MobileWebHandlerSwitch(props.device)}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({


          }
          )
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            "title": `${requirementDetail.Title}`,
            "description": `${requirementDetail.Description}`,
            "identifier": {
              "@type": "PropertyValue",
              "name": `${requirementDetail.CompanyName}`,
              "value": "Swapnil Chaturvedi"
            },
            "hiringOrganization": {
              "@type": "Organization",
              "name": "RozgaarIndia",
              "sameAs": `${requirementDetail.CompanyWebsite}`
            },
            "jobLocationType": `${applicationDetails.IsOnsite === "1"?"":LocationType()}`,

            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": `${applicationDetails.IsRemote === "1" ? "" : `${requirementDetail.City}`}`,
                "addressLocality": `${applicationDetails.IsRemote === "1" ? "" : `${requirementDetail.State}`}`,
                "addressRegion": `${applicationDetails.IsRemote === "1" ? "" : `${requirementDetail.Country}`}`,
                "postalCode": `${applicationDetails.IsRemote === "1" ? "" : `${requirementDetail.Pincode}`}`,
                "addressCountry": `${applicationDetails.IsRemote === "1" ? "" : `${requirementDetail.Country}`}`
              }
            },
            "industry": `${requirementDetail.OneSkill.Skill}`,
            "employmentType": `${workTypeColor()}`,
            "workHours": "-",
            "datePosted": `${requirementDetail.CreatedDate}`,
            "validThrough": `${requirementDetail.UpdatedDate}`,
            "applicantLocationRequirements": {
              "@type": "Country",
              "name": "India"
            },
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": `${applicationDetails.Currency}`,
              "value": {
                "@type": "QuantitativeValue",
                "value": `${applicationDetails.PraposalAmount}`,
                "unitText": `${applicationDetails.Unit}`
              }
            },
            "responsibilities": "-",
            "qualifications": "-",
            "educationRequirements":[ {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "high school"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "associate degree"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "bachelor degree"
            }
           ],
            "experienceRequirements": {
              "@type": "OccupationalExperienceRequirements",
              "monthsOfExperience": "12"
            },
          }

          )
        }}


      />
    </>
  )
};
export default PublicClientRequirementDetail;
