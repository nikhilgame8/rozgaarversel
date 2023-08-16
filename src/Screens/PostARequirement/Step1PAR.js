import React, { useEffect, useState } from "react";
import classes from "./Step1PAR.module.css";
import Loader from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BsUpload } from "react-icons/bs";
import AutoCompelete from "../../Components/PostRequirement/AutoCompelete";
import PostARequirementBackdropTheme from "../../Components/PostRequirement/PostARequirementBackdropTheme";
import { HiOutlinePlusSm } from "react-icons/hi";
import { pageViewTracker } from "../../Components/GoogleTracking";
import TextEditor from "../../Components/PostRequirement/TextEditor";

const ActionButton = React.lazy(() => import("../../Components/ActionButton"));
const RiTextInputs = React.lazy(() =>
  import("../../Components/PostRequirement/RiTextInputs")
);

const Step1PAR = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const [characterCount, setCharacterCount] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [relatedSkill, setRelatedSkill] = useState([]);
  const [companyImage, setCompanyImage] = useState("");
  const [error, setError] = useState({});
  const [draftReqId, setDraftReqId] = useState();
  const [website, setWebsite] = useState("");
  const [companyLogo, setCompanyLogo] = useState();
  const [getPARLoading, setGetPARLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const [imageUrl, setImageUrl] = useState("");


  let navigate = useNavigate();
  let userID = localStorage.getItem("Client_userID");
  const ReqId = sessionStorage.getItem("ReqId");

  useEffect(() => {
    
    pageViewTracker()
    IsDraftAllowed();
  
  }, []);
  useEffect(() => {
    RelatedSkill();
  }, [skillList]);
  const IsDraftAllowed = () => {
    setCheckLoading(true);
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

    fetch(global.apiLink + "/api/client/IsDraftAllowed", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
       
          if (result.IsDraft === "True") {
            setCheckLoading(false);
            setDraftReqId(result.data.RequirementID);
            GetPARapi(result.data.RequirementID); 
          }
        else {
          isFreeRequirementAllowed()  
        }  
      }
    else{
          setCheckLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const isFreeRequirementAllowed = () => {

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
      global.apiLink + "/api/client/isNewFreeRequirementAllowed",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
     
        if (
          result.status === "SUCCESS" &&
          result.status_code === 200 &&
          result.Return === "False"
        ) {
          navigate("/CheckUserEligibility/" + userID); 
        } 
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setCheckLoading(false);
      });
  }; 

 

  const PARapi = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    var formdata = new FormData();
    formdata.append("UserId", userID);
    formdata.append("RequirementID", draftReqId ? draftReqId : "");
    formdata.append("Title", characterCount);
    formdata.append("Description", description.replace(/<[^>]*>/g, ""));
    formdata.append("DescriptionHTML", description);
    formdata.append("IsCompany", showUsers ? "1" : "0");
    formdata.append("CompanyName", companyName);
    formdata.append("Skill", skillList.toString());
    formdata.append("ImageUrl", companyImage);
    formdata.append("CompanyLogo", logo);
    formdata.append("CompanyWebsite", website);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/rozgaarapi/PostARequirementSecond",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          sessionStorage.setItem("ReqId", result.Data.RequirementID);
          navigate("/Step2PAR/" + result.Data.RequirementID);
        } else {
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const GetPARapi = (id) => {

    setGetPARLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );

    var formdata = new FormData();
    formdata.append("UserId", userID);
    formdata.append("RequirementID", (draftReqId ? draftReqId : ReqId) || id);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      global.apiLink + "/api/rozgaarapi/PostARequirementSecond",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          setCompanyName(result.Data.CompanyName);
          setDescription(result.Data.DescriptionHTML?result.Data.DescriptionHTML: result.Data.Description);
          setSkillList(result.Data.Skill.split(","));
          setCharacterCount(result.Data.Title);
          setImageUrl(result.Data.ImageUrl);
          setCompanyLogo(result.Data.CompanyLogo);
          setWebsite(result.Data.CompanyWebsite);
          setShowUsers(result.Data.IsCompany === "1" ? true : false);
        } else {
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setGetPARLoading(false);
      });
  };

  const formValidation = () => {
    let errors = {};
    let isValid = true;

    if (!skillList || skillList.length < 1) {
      errors.skillList =
        " Choose the most suitable skill that matches your requirement ";
      isValid = false;
    }
    if (!characterCount || characterCount === "") {
      errors.characterCount =
        "Please enter a title that explains your requirement ";
      isValid = false;
    }
    if (!description || description === "") {
      errors.description =
        "Explain your work requirement in detail so the best freelancers can reach you";
      isValid = false;
    }

    if (showUsers) {
      if (!companyName || companyName === "") {
        errors.companyName = "Please enter your company name ";
        isValid = false;
      }
    } else {
    }
    setError(errors);
    return isValid;
  };

  const RemoveCompany = () => {
    setShowUsers(false);
    setCompanyName("");
    setCompanyLogo("");
    setWebsite("");
  };
  const RelatedSkill = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");
    let skillForRelated = skillList.toString();

    var raw = JSON.stringify({
      Skill: skillForRelated,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/SkillFinder", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          setRelatedSkill(result.data);
        } else {
        }
      })
      .catch((error) => console.log("error", error));
  };
  

//  let plainText = description.replace(/<[^>]*>/g, "");



  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Best Remote work and freelance projects at RozgaarIndia.com via Times Ascent`}</title>
        <meta
          name="description"
          content={`Rozgaar India is one of India's Leading online service marketplace for remote work and freelance projects. You can find the best skilled online service providers at RozgaarIndia.com`}
        />
      </Helmet>
      <React.Suspense
        fallback={
          <div className={classes.pageLoader}>
            <Loader
              type="TailSpin"
              color="#1678f2"
              height={80}
              width={80}
              className="text-center my-5"
            />
          </div>
        }
      >
      {checkLoading||getPARLoading ? (
            <div className={classes.pageLoader}>
              <Loader
                type="TailSpin"
                color="#1678f2"
                height={80}
                width={80}
                className="text-center my-5"
              />
            </div>
          ) :  <PostARequirementBackdropTheme
          headingsMain={"Post A Requirement"}
          subHeadingMain={"In 1/4 quick steps connect with top freelancers "}
          step={"25"}
        >
        
            <>
              <RiTextInputs
                input={"SingleLineInput"}
                type={"text"}
                maxLength={100}
                onInput={() => {
                  error.characterCount = " ";
                }}
                placeHolder={"eg. I need an app developer for a ecommerce site"}
                label={"Give a Title to your Requirement"}
                onChange={(e) => setCharacterCount(e.target.value)}
                value={characterCount}
              />
               
              <div className={classes.error_message}>
                {error.characterCount}
              </div>
              <div className={classes.NumberStyle}>
                {characterCount.length}/100
              </div>
              <div className={classes.formContainer}>
                <label className={classes.lableDesign}>{"Select Skills"}</label>
              </div>
              <div className={classes.PopUpText}>
                We will match the Freelancers on the basis of skills selected by
                you
              </div>
              <AutoCompelete
                skillList={skillList}
                setSkillList={setSkillList}
                placeholder={"Select upto 7 skills"}
                onInput={() => {
                  error.skillList = " ";
                }}
              />

              <div className={classes.error_message}>{error.skillList}</div>

              <div>
                {" "}
                {relatedSkill && skillList.length > 0 ? (
                  <div className={classes.relatedSkillContainer}>
                    {" "}
                    {relatedSkill.map((item, i) => {
                      return (
                        <div
                          className={classes.relatedSkillBox}
                          key={i}
                          onClick={() => {
                            setSkillList([...skillList, item]);
                          }}
                        >
                          <div> {item} </div>
                          <div>
                            {" "}
                            <HiOutlinePlusSm className={classes.addIcon} />{" "}
                          </div>
                        </div>
                      );
                    })}{" "}
                  </div>
                ) : (
                  <></>
                )}{" "}
              </div>
              {/* <RiTextInputs
                input={"MultiLineInput"}
                placeholder={"Give a detailed description of your requirement"}
                label={"Describe your requirement"}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                onInput={() => {
                  error.description = " ";
                }}
                maxLength={1000}
              /> */}


              <div className={classes.formContainer}>
                <label>{"Describe your requirement"}</label>
              </div>

              <div className={focus? classes.htmlEditorFocus:classes.htmlEditor} > <TextEditor  onChangeContent={ setDescription} setFocus={setFocus} value={ description} /></div>
       
            
              <div className={classes.error_message}>{error.description}</div>
              <div className={classes.NumberStyle}>
                {description.replace(/<[^>]*>/g, "").length}/1000
              </div>
              <label>Upload Sample for work(Optional)</label>
              <div className={classes.inputArea}>
                <label className={classes.form_upload_label} for="upload">
                  <input
                    type="file"
                    id="upload"
                    hidden
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      e.target.files[0]
                        ? setCompanyImage(e.target.files[0])
                        : setCompanyImage(companyImage);
                    }}
                  />
                  {companyImage ? (
                    companyImage.name.slice(-40)
                  ) : (
                    <>
                      {imageUrl ? (
                        imageUrl.substring(imageUrl.lastIndexOf("/") + 1)
                      ) : (
                        <>upload </>
                      )}
                    </>
                  )}
                </label>

                <div className={classes.uploadButtonContainer}>
                  <label for="upload" className={classes.uploadImagebutton}>
                    <BsUpload id="upload" className={classes.closeIcon} />
                  </label>
                </div>
              </div>
              <div className={classes.formContainer}>
                <label>{"Are you hiring for a company?"}</label>
              </div>
              <div className={classes.radio}>
                <div className={classes.RadioOne}>
                  <input
                    className={classes.inputfilds1}
                    type="radio"
                    id="male"
                    name="gender"
                    required
                    value="yes"
                    onChange={() => setShowUsers(true)}
                    checked={showUsers ? true : false}
                  />
                  <label
                    className={classes.selectoption}
                    for="male"
                    onChange={() => setShowUsers(true)}
                    value={showUsers}
                  >
                    Yes
                  </label>
                </div>

                <div className={classes.RadioTwo}>
                  <input
                    className={classes.inputfilds1}
                    type="radio"
                    id="female"
                    name="gender"
                    required
                    value="no"
                    onChange={RemoveCompany}
                    checked={showUsers ? false : true}
                  />
                  <label
                    className={classes.selectoption}
                    for="female"
                    onChange={RemoveCompany}
                    value={showUsers}
                  >
                    No
                  </label>
                </div>
              </div>
              <div className={classes.error_message}>{error.showUsers}</div>
              {showUsers ? (
                <div className={classes.TextInputRadioSelected}>
                  <RiTextInputs
                    input={"SingleLineInput"}
                    type={"text"}
                    placeHolder={"eg. ABC limited"}
                    label={"Enter your company name"}
                    value={companyName}
                    onInput={() => {
                      error.companyName = " ";
                    }}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <div className={classes.error_message}>
                    {error.companyName}
                  </div>
                  <RiTextInputs
                    input={"SingleLineInput"}
                    type={"text"}
                    placeHolder={"eg. https://www.rozgaarindia.com"}
                    label={"Company Website (optional)"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <label>Company Logo (Optional)</label>
                  <div className={classes.inputArea}>
                    <label className={classes.form_upload_label} for="logo">
                      <input
                        type="file"
                        id="logo"
                        hidden
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                          e.target.files[0]
                            ? setLogo(e.target.files[0])
                            : setLogo(logo);
                        }}
                      />
                      {logo ? (
                        logo.name.slice(-40)
                      ) : (
                        <>
                          {companyLogo ? (
                            companyLogo.substring(
                              companyLogo.lastIndexOf("/") + 1
                            )
                          ) : (
                            <>upload </>
                          )}
                        </>
                      )}
                    </label>

                    <div className={classes.uploadButtonContainer}>
                      <label for="logo" className={classes.uploadImagebutton}>
                        <BsUpload id="logo" className={classes.closeIcon} />
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {isLoading ? (
                <div className={classes.LoadingBtn}>
                  <Loader
                    type="TailSpin"
                    color="white"
                    width={20}
                    height={18}
                  />
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    formValidation()
                      ? PARapi()
                      : console.log("Something's wrong");
                  }}
                >
                  <ActionButton
                    buttonText={"Save & Continue"}
                    className={classes.Login_button}
                  />
                </div>
              )}
            </>
          
        </PostARequirementBackdropTheme>}
      </React.Suspense>
    </>
  );
};

export default Step1PAR;
