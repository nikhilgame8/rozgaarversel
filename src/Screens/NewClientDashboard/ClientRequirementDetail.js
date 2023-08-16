import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import AddOnRequirements from "../../Components/NewClientDashboardComp/AddOnRequirements";
import ApplicationDetail from "../../Components/NewClientDashboardComp/ApplicationDetail";
import ProposalsList from "../../Components/NewClientDashboardComp/ProposalsList";
import RequirementDetailArea from "../../Components/NewClientDashboardComp/RequirementDetailArea";
import RequirementPageHeader from "../../Components/NewClientDashboardComp/RequirementPageHeader";
import SharePOst from "../../Components/NewClientDashboardComp/SharePost";
import TopFiveFreelancer from "../../Components/NewClientDashboardComp/TopFiveFreelancers";
import WaitListUsers from "../../Components/NewClientDashboardComp/WaitListUsers";
import Loader from "react-loader-spinner";
import classes from "./ClientRequirementDetail.module.css";
import CustomModalTheme from "../../Components/CustomModalTheme";
import ActionButton from "../../Components/ActionButton";
import Payments from "../../Components/NewClientDashboardComp/Payments";
import { Helmet } from "react-helmet";
import { pageViewTracker } from "../../Components/GoogleTracking";



const ClientRequirementDetail = (props) => {
  const { reqID } = useParams();
  const RequirementID = reqID;
  const [isLoading, setIsLoading] = useState(false);
  const [closeModalShow, setCloseModalShow] = useState(false);
  const [addonData, setAddonData] = useState([]);
  const [requirementApplication, setRequirementApplication] = useState([]);
 

  const [headerDetail, setHeaderDetail] = useState({
    FirstName: " ",
    LastName: " ",
    FreelancerPolicy: " ",
    Status: " ",
    Skills: [],
    RequirementType: " ",
    ClosePostButton: true,
   
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
 

 
  const [paymentsData, setPaymentsData] = useState();

  const [proposalsDetails, setProposalDetails] = useState({
    Skills: [],
    Title: "",
    Description: "",
    Unit: "",
    budget: "",
    RequirementType: "",
    Currency: "",
  });
  const [proposalGenericData, setProposalgenricData] = useState([]);

  const [shareModalShow, setShareModalShow] = useState(false);
  const [freelancerRequirementId, setFreelancerRequirementId] = useState();

  const { pathname } = useLocation();

  useEffect(() => {
    RequirmentDetailApi();
    addonDataApi();
    pageViewTracker();
  }, [pathname]);

  const RequirmentDetailApi = () => {
    setIsLoading(true);

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
      global.apiLink + "/api/client/RequirementDetailClientView",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setFreelancerRequirementId(result.data.RequirementID);
        setRequirementDetailArea({
          ...requirementDetail,
          Title: result.data.Title,
          Description: result.data.Description,
          DescriptionHTML: result.data.DescriptionHTML,
          CompanyName: result.data.CompanyName,
          CompanyLogo: result.data.CompanyLogo,
          CompanyWebsite: result.data.CompanyWebsite,
          RequirementType: result.data.RequirementType,
          FreelancerPolicy: result.data.FreelancerPolicy,
          UpdatedDate: result.data.UpdatedDate,
          IsCompany: result.data.IsCompany,
          Skills: result.data.Skills,
          Location: result.data.City,
          FirstName: result.data.FirstName,
          LastName: result.data.LastName,
          CreatedDate:result.data.CreatedDate,
          Country:result.data.Country,
          State:result.data.State,
          City:result.data.City,
          Pincode:result.data.Pincode,
          OneSkill: result.data.Skills[0]
        });
        setHeaderDetail({
          ...headerDetail,
          FirstName: result.data.FirstName,
          LastName: result.data.LastName,
          FreelancerPolicy: result.data.FreelancerPolicy,
          Skills: result.data.Skills,
          Status: result.data.Status,
          RequirementType: result.data.RequirementType,
         
        });
        setPaymentsData(result.data.RequirementPayments);
        setApplicationDetails({
          ...applicationDetails,
          WaitList: result.data.WaitList,
          Applied: result.data.Applied,
          Addons: result.data.Addons,
          Unit: result.data.BudgetUnit,
          PraposalAmount: result.data.Budget,
          RequirementType: result.data.RequirementType,
          Currency: result.data.BudgetCurrency,
          CompanyName: result.data.CompanyName,
          IsCompany: result.data.IsCompany,
          IsHybrid: result.data.IsHybrid,
          IsOnsite: result.data.IsOnsite,
          IsRemote: result.data.IsRemote
        });
        setProposalDetails({

          ...proposalsDetails,
          Skills: result.data.Skills,
          Title: result.data.Title,
          Description: result.data.Description,
          Unit: result.data.BudgetUnit,
          budget: result.data.Budget,
          RequirementType: result.data.RequirementType,
          Currency: result.data.BudgetCurrency,
        });
        
        setProposalgenricData(result.data.Proposal)
        setRequirementApplication(result.data.RequirementApplication);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const ClosePosting = () => {
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
          window.location.reload();
        } else {
          alert("try again");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const ClosePost = () => {
    return (
      <CustomModalTheme onClose={() => setCloseModalShow(false)}>
        <div className={classes.btnContainer}>
          <div className={classes.closePostHeading}>
            Are you sure want to close this requirement ?
          </div>{" "}
          <div className={classes.closePostButtonsConatiner}>
            <div className={classes.closePostButtons}>
              <ActionButton
                buttonText={"Yes"}
                buttonType={"small"}
                onClick={() => {
                  ClosePosting();
                  setCloseModalShow(false);
                }}
              />{" "}
              <ActionButton
                buttonText={"No"}
                buttonType={"small"}
                onClick={() => setCloseModalShow(false)}
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </CustomModalTheme>
    );
  };

  const addonDataApi = () => {
    setIsLoading(true);
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

    fetch(global.apiLink + "/api/client/AvailableAddons", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAddonData(result.data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
      });
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
          url:"https://rozgaarindia.com/freelancer-"+requirementDetail.RequirementType+"-job"+"/"+requirementDetail.Title.replace(/[^a-zA-Z ]/g, " ").split('  ').join('-').split(" ").join('-').split("--").join("-")+"/" +RequirementID,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong", error);
        });
    }
  };
  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
        
          <div className={classes.pageLayout}>
            {" "}
           
              <>
                {" "}
                {closeModalShow && <ClosePost />}{" "}
                {shareModalShow && (
                  <SharePOst
                    closeModal={() => setShareModalShow(false)}
                    device={"Mobile"}
                    url={"https://rozgaarindia.com/freelancer-"+requirementDetail.RequirementType+"-job"+"/"+requirementDetail.Title.split(' ').join('-').replace(/[^a-zA-Z ]/g, "-")+"/" +RequirementID}
                  />
                )}{" "}
                <RequirementPageHeader
                  headerDetail={headerDetail}
                  OnSharePOst={() => shareOnMobile()}
                  OnClosePOst={() => setCloseModalShow(true)}
                  device={"Mobile"}
                  isLoading={isLoading}
                />{" "}
                <RequirementDetailArea requirementDetail={requirementDetail} isLoading={isLoading}/>{" "}
                <ApplicationDetail
                  applicationDetails={applicationDetails}
                  device={"Mobile"}
                  isLoading={isLoading}
                />{" "}
                <TopFiveFreelancer
                  requirementApplication={requirementApplication}
                />{" "}
                <ProposalsList
                  proposalsDetails={proposalsDetails}
                  proposalGenericData={proposalGenericData}
                  isLoading={isLoading}
                 
              
                />{" "}
               
                <Payments
                  paymentsData={paymentsData}
                  RequirementID={RequirementID}
                  isLoading={isLoading}
                />{" "}
                <AddOnRequirements
                  addonData={addonData}
                  RequirementID={RequirementID}
                  isLoading={isLoading}
                />{" "}
               
                {proposalsDetails.WaitList > 0 ? <WaitListUsers /> : <> </>}{" "}
              </>
            {" "}
          </div>
        );
      default:
        return (
          <div className={classes.pageLayout}>
            {" "}
           
              <>
                {" "}
                {closeModalShow && <ClosePost />}{" "}
                {shareModalShow && (
                  <SharePOst
                    closeModal={() => setShareModalShow(false)}
                    url={"https://rozgaarindia.com/freelancer-"+requirementDetail.RequirementType+"-job"+"/"+requirementDetail.Title.split(' ').join('-').replace(/[^a-zA-Z ]/g, "-")+"/" +RequirementID}
                  />
                )}
                <RequirementPageHeader
                  headerDetail={headerDetail}
                  OnSharePOst={() => setShareModalShow(true)}
                  OnClosePOst={() => setCloseModalShow(true)}
                  isLoading={isLoading}
                />{" "}
                <div className={classes.pageColumn}>
                  <div className={classes.leftArea}>
                    <RequirementDetailArea
                      requirementDetail={requirementDetail}
                      isLoading={isLoading}
                    />{" "}
                    <TopFiveFreelancer
                      requirementApplication={requirementApplication}
                      isLoading={isLoading}
                    />{" "}
   
                    <Payments
                      paymentsData={paymentsData}
                      RequirementID={RequirementID}
                      isLoading={isLoading}
                    />{" "}
                    <AddOnRequirements
                      addonData={addonData}
                      RequirementID={RequirementID}
                      isLoading={isLoading}
                    />{" "}
                    
                  </div>{" "}
                  <div className={classes.rightArea}>
                    <ApplicationDetail
                      applicationDetails={applicationDetails}
                      isLoading={isLoading}
                    />{" "}
                    <ProposalsList
                      proposalsDetails={proposalsDetails}
                      proposalGenericData={proposalGenericData}
                      isLoading={isLoading}
                    
                    />
                    {proposalsDetails.WaitList > 0 ? <WaitListUsers /> : <> </>}{" "}
                  </div>{" "}
                </div>{" "}
              </>
            
          </div>
        );
    }
  };

  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>{`Freelancer Requirement Specifications | Rozgaar India`}</title>
        <meta
          name="description"
          content={`Promote your job requirement and receive top professional freelancer profiles. Rozgaar making short-term hire easier and faster `}
       
       />
     <link rel="canonical" href={"https://www.rozgaarindia.com/clientRequirementDetail/"+RequirementID }/>
      </Helmet>
      {" "}
      {MobileWebHandlerSwitch(props.device)}{" "}

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
  );
};
export default ClientRequirementDetail;
