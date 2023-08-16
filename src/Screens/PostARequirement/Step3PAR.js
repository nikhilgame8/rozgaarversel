import React, { useEffect, useState } from "react";
import { countries } from "../../JsonFiles/countries";
import states from "../../JsonFiles/state.json";
import classes from "./Step3PAR.module.css";
import { FaEdit } from "react-icons/fa";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import PostARequirementBackdropTheme from "../../Components/PostRequirement/PostARequirementBackdropTheme";
import { useNavigate, useParams } from "react-router-dom";
import { pageViewTracker } from "../../Components/GoogleTracking";
const ActionButton = React.lazy(() => import("../../Components/ActionButton"));
const RiTextInputs = React.lazy(() =>
  import("../../Components/PostRequirement/RiTextInputs")
);

const Step3PAR = () => {
  let navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [pinCode, setPinCode] = useState();
  const [getPARLoading, setGetPARLoading] = useState(false);
  const [stateData] = useState();
  const [freelancerCount, setFreelancerCount] = useState("1");
  const [country, setCountry] = useState("");
  const [multipleFreelancer, setMultipleFreelancer] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState("");
  const [error, setError] = useState({});
  const [cityLoading, setCityLoading] = useState(false);
  const [workingPolicyRemote, setWorkingPolicyRemote] = useState("0");
  const [workingPolicyHybrid, setWorkingPolicyHybrid] = useState("0");
  const [workingPolicyOnSite, setWorkingPolicyOnSite] = useState("0");
  const [updateLocation, setUpdateLocation] = useState(true);

  const { reqId } = useParams();
  const RequirementID = reqId;

  let userID = localStorage.getItem("Client_userID");

  useEffect(() => {
    pageViewTracker()
    GetPARapi();
  }, []);

  const cityList = (selectedState) => {
    setCityLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Country: country,
      State: selectedState ? selectedState : state,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/GetCityLocatinList", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setCityData(result.data);
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        alert("Something went wrong, please contact support!");
      })
      .finally(() => {
        setCityLoading(false);
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
    formdata.append("RequirementID", RequirementID);
    formdata.append("FreelancerPolicy", policy);
    if (policy !== "Remote") formdata.append("Country", country);
    if (policy !== "Remote") formdata.append("State", state || stateData);
    if (policy !== "Remote") formdata.append("City", city || cityData);
    formdata.append("Pincode", pinCode);
    formdata.append("MultipleFreelancers", multipleFreelancer||"0");
    formdata.append("FreelancersCount", freelancerCount);

    formdata.append("IsRemote", workingPolicyRemote);
    formdata.append("IsHybrid", workingPolicyHybrid);
    formdata.append("IsOnsite", workingPolicyOnSite);

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
        if (
          result.status === "SUCCESS" &&
          result.status_code === 200
          
        ) {
          navigate("/Step4PAR/" + RequirementID);
        }
        
        else {
          console.log("error")
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const GetPARapi = () => {
    setGetPARLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );

    var formdata = new FormData();
    formdata.append("UserId", userID);
    formdata.append("RequirementID", RequirementID);

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
          setMultipleFreelancer(result.Data.MultipleFreelancers);
          setCountry(result.Data.Country);

          setFreelancerCount(
            result.Data.FreelancersCount === "0"
              ? "1"
              : result.Data.FreelancersCount
          );
          setPinCode(result.Data.Pincode);
          setPolicy(result.Data.FreelancerPolicy);
          setCountry(result.Data.Country);
          setState(result.Data.State);
          setCity(result.Data.City);
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
    if (!policy || policy === "") {
      errors.policy = "How you want your freelancer to work for you.";
      isValid = false;
    }
    if (policy === "Hybrid" || policy === "Onsite") {
      if (!country || country === "") {
        errors.country = "Please select your country";
        isValid = false;
      }
      if (!state || state === "") {
        errors.state = "Please select your state";
        isValid = false;
      }
      if (!city || city === "") {
        errors.city = "Please select your city";
        isValid = false;
      }
      if (!pinCode || pinCode === "") {
        errors.pinCode = "Please enter your pin code";
        isValid = false;
      }
     
      if (multipleFreelancer === "1") {
        if (!freelancerCount) {
          errors.freelancerCount =
            " Please enter number of freelancer required for your work.";
          isValid = false;
        }
      }
    } else {
    }
    setError(errors);
    return isValid;
  };

  const selectedWorkingPolicy = (policySelected) => {
    setPolicy(policySelected);
    if (policySelected === "Remote") {
      setWorkingPolicyRemote("1");
      setWorkingPolicyHybrid("0");
      setWorkingPolicyOnSite("0");
    }
    if (policySelected === "Hybrid") {
      setWorkingPolicyRemote("0");
      setWorkingPolicyHybrid("1");
      setWorkingPolicyOnSite("0");
    }

    if (policySelected === "Onsite") {
      setWorkingPolicyRemote("0");
      setWorkingPolicyHybrid("0");
      setWorkingPolicyOnSite("1");
    }
  };

  const HandleCountry = (e) => {
    setCountry(e.target.value);
  };
  const handleState = (e) => {
    setState(e.target.value);
    cityList(e.target.value);
  };

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
        <PostARequirementBackdropTheme
          headingsMain={"Post A Requirement"}
          subHeadingMain={"In 3/4 quick steps connect with top freelancers"}
          step={"75"}
        >
          {getPARLoading ? (
            <div className={classes.pageLoader}>
              <Loader
                type="TailSpin"
                color="#1678f2"
                height={80}
                width={80}
                className="text-center my-5"
              />
            </div>
          ) : (
            <>
              <label className={classes.HeadingText}>
                Select the working policy for freelancer
              </label>
              <div className={classes.CheckboxStyle}>
                <RiTextInputs
                  input={"checkbox"}
                  placeHolder={""}
                  text={"Remote(Recommended)"}
                  subText={"Freelancer can work from anywhere"}
                  onClick={() => selectedWorkingPolicy("Remote")}
                  checked={policy === "Remote"}
                  onInput={() => {
                    error.policy = " ";
                  }}
                />

                <RiTextInputs
                  input={"checkbox"}
                  placeHolder={""}
                  text={"Hybrid"}
                  subText={"Freelancer will work on site and off site"}
                  onClick={() => selectedWorkingPolicy("Hybrid")}
                  checked={policy === "Hybrid"}
                  onInput={() => {
                    error.policy = " ";
                  }}
                />
                <RiTextInputs
                  input={"checkbox"}
                  placeHolder={""}
                  text={"Onsite"}
                  subText={"Freelancer will come to work in person"}
                  onClick={() => selectedWorkingPolicy("Onsite")}
                  checked={policy === "Onsite"}
                  onInput={() => {
                    error.policy = " ";
                  }}
                />
              </div>
              <div className={classes.error_message}>{error.policy}</div>
              {policy === "Hybrid" || policy === "Onsite" ? (
                <>
                  {updateLocation && country ? (
                    <>
                      <div className={classes.input_fields}>
                        <label>
                          Select country{" "}
                          <FaEdit
                            className={classes.editButton}
                            onClick={() => {
                              setUpdateLocation(false);
                              setCountry("");
                              setState("");
                              setCity("");
                            }}
                            size={16}
                          />
                        </label>
                      </div>
                      <div className={classes.inputArea}>{country}</div>
                    </>
                  ) : (
                    <RiTextInputs
                      input={"Dropdown"}
                      placeHolder={"Select Country"}
                      displayData={countries}
                      label={"Select Country"}
                      onChange={HandleCountry}
                      onInput={() => {
                        error.country = " ";
                      }}
                      value={country}
                      default={country}
                    />
                  )}
                  <div className={classes.error_message}>{error.country}</div>
                  {updateLocation && state ? (
                    <>
                      <div className={classes.input_fields}>
                        <label>Select state</label>
                      </div>
                      <div className={classes.inputArea}>{state}</div>
                    </>
                  ) : (
                    <>
                      <RiTextInputs
                        input={"Dropdown"}
                        label={"Select State"}
                        placeHolder={"State"}
                        displayData={states}
                        onInput={() => {
                          error.state = " ";
                        }}
                        onChange={(e) => {
                          handleState(e);
                        }}
                        value={state}
                        defaultState={state}
                        selectedCountry={country}
                      />

                      <div className={classes.error_message}>{error.state}</div>
                    </>
                  )}
                  {updateLocation && city ? (
                    <>
                      <div className={classes.input_fields}>
                        <label>Select city</label>
                      </div>
                      <div className={classes.inputArea}>{city}</div>
                    </>
                  ) : cityLoading ? (
                    <div className={classes.inputArea}>
                      <Loader
                        type="TailSpin"
                        color="#1778f2"
                        width={20}
                        height={18}
                      />
                    </div>
                  ) : (
                    <>
                      <RiTextInputs
                        input={"Dropdown"}
                        label={"Select City"}
                        placeHolder={"Select City"}
                        displayData={cityData}
                        onInput={() => {
                          error.city = " ";
                        }}
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                      />
                      <div className={classes.error_message}>{error.city}</div>
                    </>
                  )}
                  <RiTextInputs
                    input={"SingleLineInput"}
                    type={"text"}
                    maxLength="6"
                    minLength="6"
                    label={"Pincode"}
                    placeHolder={""}
                    value={pinCode}
                    onInput={() => {
                      error.pinCode = " ";
                    }}
                    onChange={(e) =>
                      setPinCode(
                        isNaN(parseInt(e.target.value)) ? "" : e.target.value
                      )
                    }
                  />
                  <div className={classes.error_message}>{error.pinCode}</div>
                </>
              ) : (
                <></>
              )}
              <div className={classes.input_fields}>
                <label>Do you want more than 1 freelancer?</label>
              </div>
              <div className={classes.radio}>
                <div className={classes.RadioOne}>
                  <input
                    className={classes.inputfilds1}
                    type="radio"
                    id="male"
                    name="gender"
                    required
                    value={multipleFreelancer}
                    onChange={() => {
                      setMultipleFreelancer("1");
                      setFreelancerCount("1");
                    }}
                    checked={multipleFreelancer === "1"}
                  />
                  <label className={classes.selectoption} for="male">
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
                    value={multipleFreelancer}
                    onChange={() => {
                      setMultipleFreelancer("0");
                      setFreelancerCount("0");
                    }}
                    checked={multipleFreelancer === "0"||multipleFreelancer === ""}
                  />
                  <label className={classes.selectoption} for="female">
                    No
                  </label>
                </div>
              </div>
              <div className={classes.error_message}>
                {error.multipleFreelancer}
              </div>
              {multipleFreelancer === "1" ? (
                <>
                  <RiTextInputs
                    input={"SingleLineInput"}
                    type={"text"}
                    label={"How many freelancer's do you require?"}
                    placeHolder={"eg.5"}
                    value={freelancerCount}
                    onInput={() => {
                      error.freelancerCount = " ";
                    }}
                    onChange={(e) => setFreelancerCount(e.target.value)}
                  />
                  <div className={classes.error_message}>
                    {error.freelancerCount}
                  </div>
                </>
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
                    formValidation(freelancerCount)
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
          )}
        </PostARequirementBackdropTheme>
      </React.Suspense>
    </>
  );
};

export default Step3PAR;
