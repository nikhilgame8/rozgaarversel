import React, { useEffect, useState } from "react";
import classes from "./PersonalInformation.module.css";
import { countryCode } from "../../JsonFiles/ContryCodes";
import { Helmet } from "react-helmet";
import states from "../../JsonFiles/state.json";
import { countries } from "../../JsonFiles/countries";
import Industries from "../../JsonFiles/Industries.json";
import NewClientDashboard from "./NewClientDashboard";
import { BsCameraFill } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import RiTextInputs from "../../Components/PostRequirement/RiTextInputs";
import ActionButton from "../../Components/ActionButton";
import Loader from "react-loader-spinner";
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import NewClientDashboardMobile from "./NewClientDashboardMobile";
import CancelProfile from "../../Components/NewClientDashboardComp/CancelProfile";
import { pageViewTracker } from "../../Components/GoogleTracking";
import RIModal from "../../Components/RIModal";
const Modal = React.lazy(() => import("../../Components/Modal"));

const CompanyInformation = (props) => {
  const [companyAddress, setCompanyAddress] = useState();
  const [companyLogo, setCompanyLogo] = useState("");
  const [pinCode, setPinCode] = useState();
  const [gst, setGst] = useState();
  const [dialCode, setDialCode] = useState("+91");
  const [checkMObileVal, setCheckMObileVal] = useState(false);
  const [country, setCountry] = useState("");
  const [contactPersonNumber, setContactPersonNumber] = useState();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState("");
  const [error, setError] = useState({});
  const [cityLoading, setCityLoading] = useState(false);
  const [companyName, setCompanyName] = useState();
  const [website, setWebsite] = useState();
  const [industry, setIndustry] = useState();
  const [contactPersonName, setContactPersonName] = useState();
  const [designation, setDesignation] = useState();
  const [tabStatus, setTabStatus] = useState("Company");
  const [modalShow, setModalShow] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [company, setCompany] = useState();
  const [logo, setLogo] = useState();
  const [updateLocation, setUpdateLocation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [getInfoLoading, setIsGetInfoLoading] = useState("");

  let userID = localStorage.getItem("Client_userID");
  let navigate = useNavigate();
  useEffect(() => {
    getClient();
    pageViewTracker();
  }, []);

  useEffect(() => {
    countryCode.map((item, index) => {
      if (item.name === country) {
        setDialCode(item.dial_code);
      }
    });
  }, [country]);
  const checkTab = (status) => {
    setTabStatus(status);
  };

  const UpdateClient = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    var formdata = new FormData();
    formdata.append("UserId", userID);
    formdata.append("CompanyIndustry ", industry);
    formdata.append("CompanyAddress ", companyAddress);
    formdata.append("ContactPersonDesignation ", designation);
    formdata.append("CompanyLogo ", companyLogo);
    formdata.append("GSTNumber ", gst);
    formdata.append("CompanyPincode ", pinCode);
    formdata.append("CountryCodePM ", dialCode || "+91");
    formdata.append("CompanyCity ", city);
    formdata.append("CompanyState ", state);
    formdata.append("CompanyCountry ", country);
    formdata.append("CompanyWebsite ", website);
    formdata.append("ContactPersonMobile ", contactPersonNumber);
    formdata.append("ContactPersonName ", contactPersonName);
    formdata.append("CompanyName ", companyName);
    formdata.append("CompanyIndustry ", industry);

    formdata.append("IsCompany ", companyName ? "1" : "0");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/ClientProfile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setModalShow("updated successfully");
        } else {
          setErrorMessage(result.Reason);
          setErrorShow(true);
        }
      })
      .catch((error) => {
        setError("Something went wrong, please contact support!");
        setErrorShow(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getClient = () => {
    setIsGetInfoLoading(true);

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

    fetch(global.apiLink + "/api/rozgaarapi/ClientProfile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setWebsite(result.data.CompanyWebsite);
          setCompanyName(result.data.CompanyName);
          setCompanyAddress(result.data.CompanyAddress);
          setPinCode(result.data.PinCode);
          setDialCode(result.data.CountryCodePM);
          setContactPersonName(result.data.ContactPersonName);
          setContactPersonNumber(result.data.ContactPersonMobile);
          setDesignation(result.data.ContactPersonDesignation);
          setGst(result.data.GSTNumber);
          setIndustry(result.data.CompanyIndustry);
          setLogo(result.data.CompanyLogo);
          setCountry(result.data.CompanyCountry);
          setCity(result.data.CompanyCity);
          setState(result.data.CompanyState);
          setCompany(result.data.CompanyName);
        } else {
          setErrorMessage(result.Reason);
          setErrorShow(true);
        }
      })
      .catch((error) => {
        setErrorMessage("Something went wrong, please contact support!");
        setErrorShow(true);
      })
      .finally(() => {
        setIsGetInfoLoading(false);
      });
  };

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
          setErrorMessage(result.message);
          setErrorShow(true);
        }
      })
      .catch((error) => {
        setErrorMessage("Something went wrong, please contact support!");
        setErrorShow(true);
      })
      .finally(() => {
        setCityLoading(false);
      });
  };

  const HandleCountry = (e) => {
    setCountry(e.target.value);
  };
  const handleState = (e) => {
    setState(e.target.value);
    cityList(e.target.value);
  };

  const formValidation = () => {
    let errors = {};
    let isValid = true;

    if (!companyName || companyName === "") {
      errors.companyName = "Please Enter Company Name";
      isValid = false;
    }
    if (country !== "") {
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
    }
    if (gst.length > 0 && gst.length < 15) {
      errors.gst = "Please Enter Correct GSTIn";
      isValid = false;
    } else {
    }
    setError(errors);
    return isValid;
  };


  const fileChangedHandler = event => {
    let errors = {};
    let isValid = true;

    let file = event.target.files[0];

    if (file.size > 10e6) {
      errors.file = "Maxium file size is 10mb.";
      isValid = false;
    }
    else {
      setCompanyLogo(file)
    }
    setError(errors);
    return isValid;
  };

  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
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
            <NewClientDashboardMobile>
              <div className={classes.scrollAreaContainer}>
                <div className={classes.scrollArea}>
                  <a href={process.env.PUBLIC_URL + "/employer-workplace/my-profile"}
                    className={
                      tabStatus === "Personal"
                        ? classes.menuOptionSelected
                        : classes.menuOptionContent
                    }
                    onClick={() => {
                      checkTab("Personal");
                    }}
                  >
                    {" "}
                    Personal Information
                  </a>
                  <a href={process.env.PUBLIC_URL + "/employer-workplace/my-profile-company-information"}
                    className={
                      tabStatus === "Company"
                        ? classes.menuOptionSelected
                        : classes.menuOptionContent
                    }
                    onClick={() => {
                      checkTab("Company");
                    }}
                  >
                    Company Information{" "}
                  </a>
                </div>
              </div>
              <div className={classes.pageMainContainer}>
                {modalShow === "updated successfully" && (
                  <RIModal
                    Heading={"Company Information"}
                    Text={"Your profile has been saved successfully "}
                    onClick={() => navigate("/employer-workplace")}
                  />
                )}
                {modalShow === "cancel" && (
                  <CancelProfile
                    onClick={() => navigate("/employer-workplace")}
                    onClose={() => setModalShow("")}
                    clickOnNo={() => setModalShow("")}
                  />
                )}
                {errorShow && (
                  <Modal
                    heading={errorMessage}
                    onClick={() => setErrorShow(false)}
                  />
                )}
                {getInfoLoading ? (
                  <div className={classes.pageLoader}>
                    <Loader
                      type="TailSpin"
                      color="#1678f2"
                      height={80}
                      width={80}
                    />
                  </div>
                ) : (
                  <>
                    <div className={classes.inputContainerCompany}>
                      <div className={classes.uploadContainer}>
                        <div>
                          <label
                            className={classes.form_upload_label}
                            for="upload"
                          >
                            <input
                              type="file"
                              id="upload"
                              hidden
                              accept=".png, .jpg, .jpeg"
                              onChange={fileChangedHandler}
                            />
                            {companyLogo ? (
                              <img
                                className={classes.form_upload_label}
                                src={URL.createObjectURL(companyLogo)}
                                alt="Company_Logo"
                                title="Company_Logo"
                                loading="lazy"
                                width={120}
                                height={120}
                              />
                            ) : (
                              <>
                                {logo ? (
                                  <img
                                    className={classes.form_upload_label}
                                    src={logo}
                                    alt="Company_Logo"
                                    title="Company_Logo"
                                    loading="lazy"
                                    width={120}
                                    height={120}
                                  />
                                ) : (
                                  <AiOutlineCloudUpload
                                    size={40}
                                    className={classes.uploadIcon}
                                  />
                                )}
                              </>
                            )}
                          </label>
                          <div className={classes.uploadButtonContainer}>
                            <label
                              for="upload"
                              className={classes.uploadImagebutton}
                            >
                              <BsCameraFill
                                id="upload"
                                className={classes.uploadIcon}
                              />
                            </label>
                          </div>
                        </div>
                        <div className={classes.uploadLogoText}>
                          <div className={classes.nameHeading}>
                            {company ? company : <>Company Name</>}
                          </div>
                        </div>
                      </div>
                      <div className={classes.error_message}>
                        {error.file}
                      </div>
                      <div className={classes.formContainer}>
                        <div className={classes.companyInfoInput}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"Company Name"}
                            onInput={() => {
                              error.companyName = " ";
                            }}
                            onChange={(e) => setCompanyName(e.target.value)}
                            value={companyName}
                          />
                          <div className={classes.error_message}>
                            {error.companyName}
                          </div>
                        </div>
                        <div className={classes.companyInfoInput}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"Company Website"}
                            type={"text"}
                            onChange={(e) => setWebsite(e.target.value)}
                            value={website}
                          />
                        </div>
                        <div className={classes.companyInfoInput}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"Company Address"}
                            onChange={(e) => setCompanyAddress(e.target.value)}
                            value={companyAddress}
                          />
                        </div>
                        {updateLocation && country && state ? (
                          <>
                            <div className={classes.companyInfoInputEdit}>
                              <div className={classes.inputArea}>
                                {country}
                                <FaPen
                                  className={classes.editButton}
                                  onClick={() => {
                                    setUpdateLocation(false);
                                    setCountry("");
                                    setState("");
                                    setCity("");
                                  }}
                                  size={16}
                                />
                              </div>
                            </div>
                            <div className={classes.companyInfoInputState}>
                              <div className={classes.inputArea}>{state}</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={classes.companyInfoInput}>
                              <RiTextInputs
                                input={"Dropdown"}
                                placeHolder={"Select Country"}
                                displayData={countries}
                                onInput={() => {
                                  error.country = " ";
                                }}
                                onChange={HandleCountry}
                                value={country}
                                defaultCountry={country}
                              />
                            </div>
                            <div className={classes.error_message}>
                              {error.country}
                            </div>
                            <div className={classes.companyInfoInput}>
                              <RiTextInputs
                                input={"Dropdown"}
                                placeHolder={"Select State"}
                                displayData={states}
                                selectedCountry={country}
                                onInput={() => {
                                  error.state = " ";
                                }}
                                onChange={(e) => {
                                  handleState(e);
                                }}
                                value={state}
                                defaultState={state}
                              />
                            </div>
                            <div className={classes.error_message}>
                              {error.state}
                            </div>
                          </>
                        )}

                        {updateLocation && city ? (
                          <div className={classes.companyInfoInputEdit}>
                            <div className={classes.inputArea}>{city}</div>
                          </div>
                        ) : (
                          <>
                            {cityLoading ? (
                              <>
                                <div className={classes.companyInfoInputEdit}>
                                  <div className={classes.inputArea}>
                                    <Loader
                                      type="TailSpin"
                                      color="#1778f2"
                                      width={20}
                                      height={18}
                                    />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className={classes.inputContainerCompany}>
                                  <RiTextInputs
                                    input={"Dropdown"}
                                    placeHolder={"Select City"}
                                    displayData={cityData}
                                    onInput={() => {
                                      error.city = " ";
                                    }}
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                  />
                                </div>
                                <div className={classes.error_message}>
                                  {error.city}
                                </div>
                              </>
                            )}
                          </>
                        )}
                        <div className={classes.inputContainerCompany}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"Pin Code"}
                            type={"text"}
                            maxLength="6"
                            onInput={() => {
                              error.pinCode = " ";
                            }}
                            onChange={(e) =>
                              setPinCode(
                                isNaN(parseInt(e.target.value))
                                  ? ""
                                  : e.target.value
                              )
                            }
                            value={pinCode}
                          />
                          <div className={classes.error_message}>
                            {error.pinCode}
                          </div>
                        </div>
                        <div className={classes.error_message}>
                          {error.pinCode}
                        </div>

                        <div className={classes.inputContainerCompany}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"Contact Person Name"}
                            type={"text"}
                            onChange={(e) =>
                              setContactPersonName(e.target.value)
                            }
                            value={contactPersonName}
                          />
                        </div>
                        <div className={classes.inputContainerCompany}>
                          <RiTextInputs
                            input={"mobile"}
                            maxLength="10"
                            minLength="10"
                            dialCode={dialCode || "+91"}
                            checkMObileVal={checkMObileVal}
                            onChange={(e) => {
                              setContactPersonNumber(
                                isNaN(parseInt(e.target.value))
                                  ? ""
                                  : e.target.value
                              );
                              setCheckMObileVal(
                                e.target.value.length === 10 ? true : false
                              );
                            }}
                            value={contactPersonNumber}
                            placeHolder={"Contact Person Number"}
                            required={country === "India" ? true : false}
                          />
                        </div>
                        <div className={classes.inputContainerCompany}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"Designation"}
                            type={"text"}
                            onChange={(e) => setDesignation(e.target.value)}
                            value={designation}
                          />
                        </div>
                        <div className={classes.inputContainerCompany}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"GST (Optional)"}
                            type={"text"}
                            maxLength="15"
                            onInput={() => {
                              error.gst = " ";
                            }}
                            onChange={(e) => setGst(e.target.value)}
                            value={gst}
                          />
                        </div>
                        <div className={classes.error_message}>{error.gst}</div>

                        <div className={classes.companyInfoInput}>
                          <RiTextInputs
                            input={"Dropdown"}
                            placeHolder={"Industry"}
                            displayData={Industries}
                            onChange={(e) => setIndustry(e.target.value)}
                            value={industry}
                            defaultIndustry={industry}
                          />
                        </div>
                      </div>

                      <ActionButton
                        buttonType={"dual"}
                        buttonText={"Save"}
                        onCancelClick={() => setModalShow("cancel")}
                        isLoading={isLoading}
                        secondButtonText={"Cancel"}
                        onClicK={() => {
                          formValidation()
                            ? UpdateClient()
                            : console.log("something went wrong");
                        }}
                      />
                    </div>{" "}
                  </>
                )}
              </div>
            </NewClientDashboardMobile>
          </React.Suspense>
        );
      default:
        return (
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
            {modalShow === "updated successfully" && (
              <RIModal
                Heading={"Company Information"}
                Text={"Your profile has been saved successfully "}
                onClick={() => navigate("/employer-workplace")}
              />

            )}
            {modalShow === "cancel" && (
              <CancelProfile
                onClick={() => navigate("/employer-workplace")}
                onClose={() => setModalShow("")}
                clickOnNo={() => setModalShow("")}
              />
            )}

            {errorShow && (
              <Modal
                heading={errorMessage}
                onClick={() => setErrorShow(false)}
              />
            )}
            <NewClientDashboard>
              <div className={classes.scrollArea}>
                <a
                  href={process.env.PUBLIC_URL + "/employer-workplace/my-profile"}
                  className={
                    tabStatus === "Personal"
                      ? classes.menuOptionSelected
                      : classes.menuOptionContent
                  }
                  onClick={() => {
                    checkTab("Personal");
                  }}
                >
                  {" "}
                  Personal Information
                </a>
                <a
                  href={process.env.PUBLIC_URL + "/employer-workplace/my-profile-company-information"}
                  className={
                    tabStatus === "Company"
                      ? classes.menuOptionSelected
                      : classes.menuOptionContent
                  }
                  onClick={() => {
                    checkTab("Company");
                  }}
                >
                  Company Information{" "}
                </a>
              </div>
              <div className={classes.pageMainContainer}>

                {getInfoLoading ? (
                  <div className={classes.pageLoader}>
                    <Loader
                      type="TailSpin"
                      color="#1678f2"
                      height={80}
                      width={80}
                    />
                  </div>
                ) : (
                  <>
                    <div className={classes.inputContainer}>
                      <div className={classes.uploadContainer}>
                        <div>
                          <label
                            className={classes.form_upload_label}
                            for="upload"
                          >
                            <input
                              type="file"
                              id="upload"
                              hidden
                              accept=".png, .jpg, .jpeg"
                              onChange={fileChangedHandler}
                            />
                            {companyLogo ? (
                              <img
                                className={classes.form_upload_label}
                                src={URL.createObjectURL(companyLogo)}
                                alt="Comapny_Logo"
                                title="Company_Logo"
                                loading="lazy"
                                width={120}
                                height={120}
                              />
                            ) : (
                              <>
                                {logo ? (
                                  <img
                                    className={classes.form_upload_label}
                                    src={logo}
                                    alt="Company_Logo"
                                    title="Company_Logo"
                                    loading="lazy"
                                    width={120}
                                    height={120}
                                  />
                                ) : (
                                  <AiOutlineCloudUpload
                                    size={40}
                                    className={classes.uploadIcon}
                                  />
                                )}
                              </>
                            )}
                          </label>
                          <div className={classes.uploadButtonContainer}>
                            <label
                              for="upload"
                              className={classes.uploadImagebutton}
                            >
                              <BsCameraFill
                                id="upload"
                                className={classes.uploadIcon}
                              />
                            </label>
                          </div>
                        </div>
                        <div className={classes.uploadLogoText}>
                          <div className={classes.nameHeading}>
                            {company ? company : <>Company Name</>}
                          </div>
                        </div>
                      </div>
                      <div className={classes.error_message}>
                        {error.file}
                      </div>
                      <div className={classes.formContainerCompany}>
                        <div className={classes.companyInfoInput}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"Company Name"}
                            onInput={() => {
                              error.companyName = " ";
                            }}
                            onChange={(e) => setCompanyName(e.target.value)}
                            value={companyName}
                          />
                        </div>
                        <div className={classes.error_message}>
                          {error.companyName}
                        </div>
                        <div className={classes.companyInfoInput}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"Company Website"}
                            type={"text"}
                            onChange={(e) => setWebsite(e.target.value)}
                            value={website}
                          />
                        </div>
                        <div className={classes.companyInfoInput}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"Company Address"}
                            onChange={(e) => setCompanyAddress(e.target.value)}
                            value={companyAddress}
                          />
                        </div>
                        {updateLocation && country && state ? (
                          <div className={classes.inputFieldsWrapper}>
                            <div className={classes.inputFields}>
                              <div className={classes.companyInfoInputEdit}>
                                <div className={classes.inputArea}>
                                  {country}
                                  <FaPen
                                    className={classes.editButton}
                                    onClick={() => {
                                      setUpdateLocation(false);
                                      setCountry("");
                                      setState("");
                                      setCity("");
                                    }}
                                    size={16}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className={classes.inputFields}>
                              <div className={classes.companyInfoInputEdit}>
                                <div className={classes.inputArea}>{state}</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={classes.inputFieldsWrapper}>
                            <div className={classes.inputFields}>
                              <RiTextInputs
                                input={"Dropdown"}
                                placeHolder={"Select Country"}
                                displayData={countries}
                                onInput={() => {
                                  error.country = " ";
                                }}
                                onChange={HandleCountry}
                                value={country}
                                defaultCountry={country}
                              />
                              <div className={classes.error_message}>
                                {error.country}
                              </div>
                            </div>
                            <div className={classes.inputFields}>
                              <RiTextInputs
                                input={"Dropdown"}
                                placeHolder={"Select State"}
                                displayData={states}
                                selectedCountry={country}
                                onInput={() => {
                                  error.state = " ";
                                }}
                                onChange={(e) => {
                                  handleState(e);
                                }}
                                value={state}
                                defaultState={state}
                              />
                              <div className={classes.error_message}>
                                {error.state}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className={classes.inputFieldsWrapper}>
                          <div className={classes.inputFields}>
                            {updateLocation && city ? (
                              <div className={classes.companyInfoInputState}>
                                <div className={classes.inputArea}>{city}</div>
                              </div>
                            ) : (
                              <>
                                {cityLoading ? (
                                  <>
                                    <div className={classes.inputArea}>
                                      <Loader
                                        type="TailSpin"
                                        color="#1778f2"
                                        width={20}
                                        height={18}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <RiTextInputs
                                      input={"Dropdown"}
                                      placeHolder={"Select City"}
                                      displayData={cityData}
                                      onInput={() => {
                                        error.city = " ";
                                      }}
                                      onChange={(e) => setCity(e.target.value)}
                                      value={city}
                                    />
                                    <div className={classes.error_message}>
                                      {error.city}
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                          <div className={classes.inputFields}>
                            <RiTextInputs
                              input={"SingleLineInput"}
                              placeHolder={"Pin Code"}
                              type={"text"}
                              maxLength="6"
                              onInput={() => {
                                error.pinCode = " ";
                              }}
                              onChange={(e) =>
                                setPinCode(
                                  isNaN(parseInt(e.target.value))
                                    ? ""
                                    : e.target.value
                                )
                              }
                              value={pinCode}
                            />
                            <div className={classes.error_message}>
                              {error.pinCode}
                            </div>
                          </div>
                        </div>
                        <div className={classes.inputFieldsWrapper}>
                          <div className={classes.inputFields}>
                            <RiTextInputs
                              input={"SingleLineInput"}
                              placeHolder={"Contact Person Name"}
                              type={"text"}
                              onChange={(e) =>
                                setContactPersonName(e.target.value)
                              }
                              value={contactPersonName}
                            />
                          </div>
                          <div className={classes.inputFields}>
                            <RiTextInputs
                              input={"mobile"}
                              maxLength="10"
                              minLength="10"
                              dialCode={dialCode || "+91"}
                              checkMObileVal={checkMObileVal}
                              onChange={(e) => {
                                setContactPersonNumber(
                                  isNaN(parseInt(e.target.value))
                                    ? ""
                                    : e.target.value
                                );
                                setCheckMObileVal(
                                  e.target.value.length === 10 ? true : false
                                );
                              }}
                              value={contactPersonNumber}
                              placeHolder={"Phone Number"}
                              required={country === "India" ? true : false}
                            />
                          </div>
                        </div>
                        <div className={classes.inputFieldsWrapper}>
                          <div className={classes.inputFields}>
                            <RiTextInputs
                              input={"SingleLineInput"}
                              placeHolder={"Designation"}
                              type={"text"}
                              onChange={(e) => setDesignation(e.target.value)}
                              value={designation}
                            />
                          </div>
                          <div className={classes.inputFields}>
                            <RiTextInputs
                              input={"SingleLineInput"}
                              placeHolder={"GST (Optional)"}
                              type={"text"}
                              maxLength="15"
                              onInput={() => {
                                error.gst = " ";
                              }}
                              onChange={(e) => setGst(e.target.value)}
                              value={gst}
                            />
                            <div className={classes.error_message}>
                              {error.gst}
                            </div>
                          </div>
                        </div>
                        <div className={classes.companyInfoInput}>
                          <RiTextInputs
                            input={"Dropdown"}
                            placeHolder={"Industry"}
                            displayData={Industries}
                            onChange={(e) => setIndustry(e.target.value)}
                            value={industry}
                            defaultIndustry={industry}
                          />
                        </div>
                        <ActionButton
                          buttonType={"dual"}
                          buttonText={"Save"}
                          onCancelClick={() => setModalShow("cancel")}
                          isLoading={isLoading}
                          secondButtonText={"Cancel"}
                          onClicK={() => {
                            formValidation()
                              ? UpdateClient()
                              : console.log("something went wrong");
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </NewClientDashboard>
          </React.Suspense>
        );
    }
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
      {MobileWebHandlerSwitch(props.device)}
    </>
  );
};

export default CompanyInformation;
