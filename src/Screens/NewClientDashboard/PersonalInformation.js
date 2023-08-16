import React, { useEffect, useState } from "react";
import classes from "./PersonalInformation.module.css";
import { countries } from "../../JsonFiles/countries";
import states from "../../JsonFiles/state.json";
import RiTextInputs from "../../Components/PostRequirement/RiTextInputs";
import ActionButton from "../../Components/ActionButton";
import {
  FaPen,
  FaTwitterSquare,
  FaLinkedin,
  FaFacebookSquare,
} from "react-icons/fa";
import { BsCameraFill } from "react-icons/bs";
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import NewClientDashboard from "./NewClientDashboard";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import VerifyOtpModal from "../../Components/NewClientDashboardComp/VerifyOtpModal";
import NewClientDashboardMobile from "./NewClientDashboardMobile";
import CancelProfile from "../../Components/NewClientDashboardComp/CancelProfile";
import SocialHandles from "../../Components/ClientProfile/SocialHandles";
import { pageViewTracker } from "../../Components/GoogleTracking";
import RIModal from "../../Components/RIModal";
const Modal = React.lazy(() => import("../../Components/Modal"));

let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const PerosonalInformation = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState();
  const [socialLinks, setSocialLinks] = useState();
  const [dialCode, setDialCode] = useState("+91");
  const [checkMObileVal, setCheckMObileVal] = useState(false);
  const [country, setCountry] = useState("");
  const [Whatsapp, setWhatsapp] = useState([]);
  const [whatsAppDialCode, setWhatsAppDialCode] = useState("+91");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState("");
  const [cityLoading, setCityLoading] = useState(false);
  const [dob, setDob] = useState();
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState();
  const [error, setError] = useState({});
  const [pinCode, setPinCode] = useState();
  const [isAlternativeMobile, setIsAlternativeMobile] = useState(false);
  const [isAlternativeEmail, setIsAlternativeEmail] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [isCheckMObile, setIsCheckMobile] = useState(false);
  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const [checkWhatsAppMObile, setCheckWhatsAppMObile] = useState();
  const [checkAlternateMobile, setCheckAlternateMobile] = useState();
  const [alternateMobile, setAlternateMobile] = useState([]);
  const [alternateDialCode, setAlternateDialCode] = useState("+91");
  const [alternateEmail, setAlternateEmail] = useState("");
  const [tabStatus, setTabStatus] = useState("Personal");
  const [profilePicture, setProfilePicture] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [profile, setProfile] = useState("");
  const [updateLocation, setUpdateLocation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyModalShow, setVerifyModalShow] = useState(false);
  const [otp, setOtp] = useState();
  const [otpError, setOtpError] = useState("");
  const [contactType, setContactType] = useState("");
  const [resentOtpLoading, setResentOtpLoading] = useState();
  const [priEmail, setPriEmail] = useState("");
  const [priMobile, setPriMobile] = useState("");
  const [getInfoLoading, setIsGetInfoLoading] = useState("");
  const [socialFieldsShow, setSocialFieldsShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMobile, setIsMobile] = useState("")


  let userID = localStorage.getItem("Client_userID");
  const [otpSent, setOtpsent] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    getClient();
    pageViewTracker();
  }, []);

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
    formdata.append("AlternateEmail ", alternateEmail);
    formdata.append("WhatsAppNumber ", Whatsapp ? Whatsapp : null);
    formdata.append(
      "AlternateMobile",
      alternateMobile ? alternateMobile : null
    );
    formdata.append("DOB ", dob);
    formdata.append("Gender ", gender);
    formdata.append("Pincode ", pinCode);
    formdata.append("City ", city);
    formdata.append("State ", state);
    formdata.append("CountryCode ", dialCode);
    formdata.append("CountryCodeAM ", alternateDialCode || "+91");
    formdata.append("CountryCodeWN ", whatsAppDialCode || "+91");
    formdata.append("Country ", country);
    formdata.append("Address ", address);
    formdata.append("Mobile ", mobile ? mobile : null);
    formdata.append("Email ", userEmail);
    formdata.append("LastName ", lastName);
    formdata.append("FirstName ", firstName);
    formdata.append("ProfilePicture ", profilePicture);
    formdata.append("SetAsPriEmail  ", priEmail === "1" ? priEmail : "");
    formdata.append("SetAsPriMobile  ", priMobile === "1" ? priMobile : "");

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
          sessionStorage.setItem("ProfilePicture", result.data.ProfilePicture);
          localStorage.setItem("ProfilePicture", result.data.ProfilePicture);
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
          setFirstName(result.data.FirstName);
          setLastName(result.data.LastName);
          setUserName(result.data.FirstName + " " + result.data.LastName)
          setUserEmail(result.data.Email);
          setDialCode(result.data.CountryCode);
          setMobile(result.data.Mobile);
          setIsMobile(result.data.Mobile)
          setAlternateMobile(result.data.AlternateMobile);
          setAlternateDialCode(result.data.CountryCodeAM);
          setAlternateEmail(result.data.AlternateEmail);
          setWhatsapp(result.data.WhatsAppNumber);
          setWhatsAppDialCode(result.data.CountryCodeWN);
          setDob(result.data.DOB);
          setGender(result.data.Gender);
          setAddress(result.data.Address);
          setPinCode(result.data.PinCode);
          setCountry(result.data.Country);
          setState(result.data.State);
          setCity(result.data.City);
          setGender(result.data.Gender);
          setProfile(result.data.ProfilePicture);

          setSocialLinks(result.data);
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
  const ResentOtp = async (value, loadingValue) => {
    setResentOtpLoading(loadingValue);

    setOtpsent(false);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = value.includes("@")
      ? JSON.stringify({
        UserId: userID,
        Email: value,
      })
      : JSON.stringify({
        UserId: userID,
        Mobile: value,
      });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    await fetch(
      global.apiLink + "/api/rozgaarapi/ResendOtpThird",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          setVerifyModalShow(true);
          setContactType(value);
          setOtpError(
            loadingValue !== "primaryEmail" && loadingValue !== "primaryMobile"
              ? "OtpSent"
              : ""
          );
        } else if (
          result.status_code === 200 &&
          result.message === "OTP Not send"
        ) {
          setError({
            ...error,
            alternateMobile: "Please select valid dail code",
          });
        } else {
          console.log(result.message);
        }
      })
      .catch((error) => {
        setErrorMessage("Something went wrong, please contact support!");
        setErrorShow(true);
      })
      .finally(() => {
        setResentOtpLoading("");
        setOtpsent(true);
      });
  };
  const VerifyOtp = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      UserId: userID,
      Otp: otp,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/VerifyOtp", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          setVerifyModalShow(false);
          setModalShow("set as primary");
          contactType.includes("@") ? setPriEmail("1") : setPriMobile("1");
        } else {
          setOtpError("NotExist");
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleState = (e) => {
    setState(e.target.value);
    cityList(e.target.value);
  };

  const formValidation = () => {
    let errors = {};
    let isValid = true;

    if (!firstName || firstName === "") {
      errors.firstName = "Please enter your first name";
      isValid = false;
    }

    if (!lastName || lastName === "") {
      errors.lastName = "Please enter your last name";
      isValid = false;
    }
    if (!lastName.match(/^[a-z ,.'-]+$/i)) {
      errors.lastName = "Please enter a valid last name";
      isValid = false;
    }

    if (!userEmail || userEmail === "") {
      errors.email = "Please enter a valid email address ";
      isValid = false;
    }
    if (!dob || dob === "") {
      errors.dob = "Please enter your Date of Birth";
      isValid = false;
    }
    if (!address || address === "") {
      errors.address = "Please enter your address";
      isValid = false;
    }
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
    if (alternateEmail.length > 0 && !alternateEmail.includes("@")) {
      errors.alternateEmail = "Please enter a valid email";
      isValid = false;
    }
    if (
      alternateMobile
        ? alternateMobile.length < 10 && alternateMobile.length > 0
        : ""
    ) {
      errors.alternateMobile = "Please enter a valid mobile number";
      isValid = false;
    }
    if (Whatsapp.length < 10 && Whatsapp.length > 0) {
      errors.Whatsapp = "Please enter a valid mobile number";
      isValid = false;
    }

    if (!mobile || mobile === "" || mobile.length < 10) {
      errors.mobile = "Please enter a valid mobile number ";
      isValid = false;
    }
    if (!userEmail || userEmail === "" || !userEmail.includes("@")) {
      errors.email = "Please enter a valid email";
      isValid = false;
    } else {
    }
    setError(errors);
    return isValid;
  };
  useEffect(() => {
    isCheckMObile &&
      alternateMobile &&
      ResentOtp(alternateMobile, "primaryMobile");
  }, [isCheckMObile]);

  useEffect(() => {
    isCheckEmail && alternateEmail && ResentOtp(alternateEmail, "primaryEmail");
  }, [isCheckEmail]);


  const fileChangedHandler = event => {
    let errors = {};
    let isValid = true;

    let file = event.target.files[0];

    if (file.size > 10e6) {
      errors.file = "Maxium file size is 10mb.";
      isValid = false;
    }
    else {
      setProfilePicture(file)
    }
    setError(errors);
    return isValid;
  };


  const MobileWebHandlerSwitch = (device) => {
    switch (device) {
      case "Mobile":
        return (
          <>
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
                </div>
                {verifyModalShow && (
                  <VerifyOtpModal
                    onClick={() => VerifyOtp()}
                    onClose={() => setVerifyModalShow(false)}
                    otpError={otpError}
                    value={otp}
                    otpSent={otpSent}
                    resentOtpLoading={resentOtpLoading}
                    onInput={() => setOtpError("")}
                    contact={contactType}
                    onResendClick={() =>
                      ResentOtp(contactType, "primaryContact")
                    }
                    onChange={(e) => setOtp(e.target.value)}
                  />
                )}
                {socialFieldsShow && (
                  <SocialHandles
                    onClose={() => {
                      setSocialFieldsShow(false);
                    }}
                    socialLinks={socialLinks}
                  />
                )}
                <div className={classes.pageMainContainer}>
                  {modalShow === "set as primary" && (
                    <Modal
                      heading={`${contactType} set as primary`}
                      onClick={() => setModalShow("")}
                    />
                  )}
                  {modalShow === "cancel" && (
                    <CancelProfile
                      onClick={() => navigate("/employer-workplace")}
                      onClose={() => setModalShow("")}
                      clickOnNo={() => setModalShow("")}
                    />
                  )}
                  {modalShow === "updated successfully" && (
                    <RIModal
                      Heading={"Personal Information"}
                      Text={"Your profile has been saved successfully "}
                      onClick={() => navigate("/employer-workplace/my-profile-company-information")}
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
                      <div className={classes.InputContaine}>
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
                              {profilePicture ? (
                                <img
                                  className={classes.form_upload_label}
                                  src={URL.createObjectURL(profilePicture)}
                                  alt={firstName + " " + lastName}
                                  title={firstName + " " + lastName}
                                  loading="lazy"
                                  width={120}
                                  height={120}
                                />
                              ) : (
                                <>
                                  {profile ? (
                                    <img
                                      className={classes.form_upload_label}
                                      src={profile}
                                      alt={firstName + " " + lastName}
                                      title={firstName + " " + lastName}
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
                            <h1 className={classes.nameHeading}>
                              {userName}
                            </h1>
                            <FaFacebookSquare
                              onClick={() => setSocialFieldsShow(true)}
                              color="#1877f2"
                              className={classes.socialIcons}
                              size={25}
                            />
                            <FaTwitterSquare
                              onClick={() => setSocialFieldsShow(true)}
                              color="#1d9bf0"
                              className={classes.socialIcons}
                              size={25}
                            />
                            <FaLinkedin
                              onClick={() => setSocialFieldsShow(true)}
                              color="#0a66c2"
                              className={classes.socialIcons}
                              size={25}
                            />
                          </div>
                        </div>
                        <div className={classes.error_message}>
                          {error.file}
                        </div>
                        <div className={classes.formContainer}>
                          <div className={classes.personalInfoInput}>
                            <RiTextInputs
                              input={"SingleLineInput"}
                              placeHolder={"First Name"}
                              onInput={() => {
                                error.firstName = " ";
                              }}
                              maxLength={30}
                              onChange={(e) => setFirstName(e.target.value)}
                              value={firstName}
                            />
                          </div>
                        </div>
                        <div className={classes.error_message}>
                          {error.firstName}
                        </div>
                        <div className={classes.personalInfoInput}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"Last Name"}
                            onInput={() => {
                              error.lastName = " ";
                            }}
                            maxLength={30}
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                          />
                        </div>
                        <div className={classes.error_message}>
                          {error.lastName}
                        </div>

                        <div className={isMobile === "" ? classes.disable : classes.disabledInput}>
                          <RiTextInputs
                            input={"mobileWithDropdown"}
                            maxLength="10"
                            minLength="10"
                            onDialCodechange={(e) => {
                              setDialCode(e.target.value);
                            }}
                            dialCodeValue={dialCode}
                            checkMObileVal={checkMObileVal}
                            onChange={(e) => {
                              setMobile(
                                isNaN(parseInt(e.target.value))
                                  ? ""
                                  : e.target.value
                              );
                              setCheckMObileVal(
                                e.target.value.length === 10 ? true : false
                              );
                            }}
                            value={mobile}
                            onInput={() => {
                              error.mobile = " ";
                            }}
                            placeHolder={"Phone Number"}
                          />
                        </div>
                        <div className={classes.error_message}>
                          {error.mobile}
                        </div>
                        {!isAlternativeMobile ? (
                          <div className={classes.AddAlternative}>
                            <AiOutlinePlusCircle
                              className={classes.addIcon}
                              onClick={() => {
                                setIsAlternativeMobile(!isAlternativeMobile);
                              }}
                            />
                            <div
                              onClick={() => {
                                setIsAlternativeMobile(!isAlternativeMobile);
                              }}
                              className={classes.alterNateText}
                            >
                              Alternate mobile number
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className={classes.AddAlternativeOpen}>
                              <AiOutlineMinusCircle
                                className={classes.addIcon}
                                onClick={() => {
                                  setIsAlternativeMobile(!isAlternativeMobile);
                                }}
                              />
                              <div
                                onClick={() => {
                                  setIsAlternativeMobile(!isAlternativeMobile);
                                }}
                                className={classes.alterNateText}
                              >
                                Alternate mobile number
                              </div>
                            </div>
                            <div className={classes.personalInfoInput}>
                              <RiTextInputs
                                input={"mobileWithDropdown"}
                                maxLength="10"
                                minLength="10"
                                onDialCodechange={(e) => {
                                  setAlternateDialCode(e.target.value);
                                }}
                                dialCodeValue={alternateDialCode}
                                onInput={() => {
                                  error.alternateMobile = " ";
                                }}
                                checkMObileVal={checkAlternateMobile}
                                onChange={(e) => {
                                  setAlternateMobile(
                                    isNaN(parseInt(e.target.value))
                                      ? ""
                                      : e.target.value
                                  );
                                  setCheckAlternateMobile(
                                    e.target.value.length === 10 ? true : false
                                  );
                                }}
                                value={alternateMobile}
                                placeHolder={"Phone Number"}
                              />
                              <div className={classes.error_message}>
                                {error.alternateMobile}
                              </div>
                              {isCheckMObile &&
                                resentOtpLoading === "primaryMobile" ? (
                                <Loader
                                  type="TailSpin"
                                  color="#1778f2"
                                  width={20}
                                  height={18}
                                />
                              ) : (
                                <div>
                                  {" "}
                                  <input
                                    type="checkbox"
                                    checked={isCheckMObile}
                                    value={isCheckMObile}
                                    onChange={() => {
                                      alternateMobile === "" ||
                                        alternateMobile === undefined
                                        ? setError({
                                          ...error,
                                          alternateMobile: "Invalid number",
                                        })
                                        : alternateMobile.length === 10
                                          ? setIsCheckMobile(!isCheckMObile)
                                          : setError({
                                            ...error,
                                            alternateMobile: "Invalid number",
                                          });
                                    }}
                                    className={classes.CheckBoxInput}
                                  />
                                  Set as primary
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        <div className={classes.disabledInput}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            type={"email"}
                            placeHolder={"Email"}
                            onInput={() => {
                              error.email = " ";
                            }}
                            onChange={(e) => {
                              let keyword = e.target.value.toLowerCase();
                              var re = /^[a-z@A-Z.0-9_]*$/;
                              if (keyword === "" || re.test(keyword)) {
                                setUserEmail(keyword);
                              }
                            }}
                            value={userEmail}
                          />
                        </div>
                        <div className={classes.error_message}>
                          {error.email}
                        </div>
                        {!isAlternativeEmail ? (
                          <div className={classes.AddAlternative}>
                            <AiOutlinePlusCircle
                              className={classes.addIcon}
                              onClick={() => {
                                setIsAlternativeEmail(!isAlternativeEmail);
                              }}
                            />
                            <div
                              onClick={() => {
                                setIsAlternativeEmail(!isAlternativeEmail);
                              }}
                              className={classes.alterNateText}
                            >
                              Alternate email
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className={classes.AddAlternativeOpen}>
                              <AiOutlineMinusCircle
                                className={classes.addIcon}
                                onClick={() => {
                                  setIsAlternativeEmail(!isAlternativeEmail);
                                }}
                              />
                              <div
                                onClick={() => {
                                  setIsAlternativeEmail(!isAlternativeEmail);
                                }}
                                className={classes.alterNateText}
                              >
                                Alternate email
                              </div>
                            </div>
                            <div className={classes.personalInfoInput}>
                              <RiTextInputs
                                input={"SingleLineInput"}
                                type={"email"}
                                placeHolder={"Email"}
                                onInput={() => {
                                  error.alternateEmail = " ";
                                }}
                                onChange={(e) => {
                                  let keyword = e.target.value.toLowerCase();
                                  var re = /^[a-z@A-Z.0-9_]*$/;
                                  if (keyword === "" || re.test(keyword)) {
                                    setAlternateEmail(keyword);
                                  }
                                }}
                                value={alternateEmail}
                              />
                              <div className={classes.error_message}>
                                {error.alternateEmail}
                              </div>
                              {isCheckEmail &&
                                resentOtpLoading === "primaryEmail" ? (
                                <Loader
                                  type="TailSpin"
                                  color="#1778f2"
                                  width={20}
                                  height={18}
                                />
                              ) : (
                                <div className={classes.CheckBoxInputDiv}>
                                  {" "}
                                  <input
                                    checked={isCheckEmail}
                                    type="checkbox"
                                    value={isCheckEmail}
                                    onChange={(e) => {
                                      regEmail.test(alternateEmail)
                                        ? setIsCheckEmail(!isCheckEmail)
                                        : setError({
                                          ...error,
                                          alternateEmail: "Invalid Email",
                                        });
                                    }}
                                    className={classes.CheckBoxInput}
                                  />{" "}
                                  Set as primary
                                </div>
                              )}
                            </div>
                          </>
                        )}
                        <div className={classes.personalInfoInput}>
                          <RiTextInputs
                            input={"mobileWithDropdown"}
                            maxLength="10"
                            minLength="10"
                            onDialCodechange={(e) => {
                              setWhatsAppDialCode(e.target.value);
                            }}
                            dialCodeValue={whatsAppDialCode}
                            onInput={() => {
                              error.Whatsapp = " ";
                            }}
                            checkWhatsAppMObile={checkWhatsAppMObile}
                            onChange={(e) => {
                              setWhatsapp(
                                isNaN(parseInt(e.target.value))
                                  ? ""
                                  : e.target.value
                              );
                              setCheckWhatsAppMObile(
                                e.target.value.length === 10 ? true : false
                              );
                            }}
                            value={Whatsapp}
                            placeHolder={"WhatsApp Number"}
                          />
                          <div className={classes.error_message}>
                            {error.Whatsapp}
                          </div>
                        </div>
                        <div className={classes.personalInfoInput}>
                          <RiTextInputs
                            input={"Dropdown"}
                            placeHolder={"Gender"}
                            defaultGender={gender}
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                          />
                        </div>
                        <div className={classes.personalInfoInput}>
                          <RiTextInputs
                            input={"date"}
                            placeHolder={"Date of Birth"}
                            onInput={() => {
                              error.dob = " ";
                            }}
                            onChange={(e) => setDob(e.target.value)}
                            value={dob}
                          />
                          <div className={classes.error_message}>
                            {error.dob}
                          </div>
                        </div>
                        <div className={classes.personalInfoInput}>
                          <RiTextInputs
                            input={"SingleLineInput"}
                            placeHolder={"Address"}
                            onInput={() => {
                              error.address = " ";
                            }}
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                          />
                          <div className={classes.error_message}>
                            {error.address}
                          </div>
                        </div>
                        {updateLocation && country && state ? (
                          <>
                            <div className={classes.personalInfoInputEdit}>
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
                            <div className={classes.personalInfoInputState}>
                              <div className={classes.inputArea}>{state}</div>
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div className={classes.personalInfoInput}>
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
                            <div className={classes.personalInfoInput}>
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
                          </>
                        )}

                        {updateLocation && city ? (
                          <div className={classes.personalInfoInputEdit}>
                            <div className={classes.inputArea}>{city}</div>
                          </div>
                        ) : (
                          <>
                            {cityLoading ? (
                              <div className={classes.personalInfoInputEdit}>
                                <div className={classes.inputArea}>
                                  <Loader
                                    type="TailSpin"
                                    color="#1778f2"
                                    width={20}
                                    height={18}
                                  />
                                </div>{" "}
                              </div>
                            ) : (
                              <div className={classes.personalInfoInput}>
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
                              </div>
                            )}
                          </>
                        )}
                        <div className={classes.personalInfoInput}>
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

                        <ActionButton
                          buttonType={"dual"}
                          buttonText={"Save"}
                          onCancelClick={() => setModalShow("cancel")}
                          isLoading={isLoading}
                          secondButtonText={"Cancel"}
                          onClicK={() => {
                            formValidation()
                              ? UpdateClient()
                              : console.log("somethin went wrong");
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </NewClientDashboardMobile>
            </React.Suspense>
          </>
        );
      default:
        return (
          <>
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
              {verifyModalShow && (
                <VerifyOtpModal
                  onClick={() => VerifyOtp()}
                  onClose={() => setVerifyModalShow(false)}
                  otpError={otpError}
                  value={otp}
                  otpSent={otpSent}
                  resentOtpLoading={resentOtpLoading}
                  onInput={() => setOtpError("")}
                  contact={contactType}
                  onResendClick={() =>
                    ResentOtp(contactType, "primaryContact")
                  }
                  onChange={(e) => setOtp(e.target.value)}
                />
              )}
              {socialFieldsShow && (
                <SocialHandles
                  onClose={() => {
                    setSocialFieldsShow(false);
                  }}
                  socialLinks={socialLinks}
                />
              )}

              {modalShow === "set as primary" && (
                <Modal
                  heading={`${contactType} set as primary`}
                  onClick={() => setModalShow("")}
                />
              )}
              {modalShow === "cancel" && (
                <CancelProfile
                  onClick={() => navigate("/employer-workplace")}
                  onClose={() => setModalShow("")}
                  clickOnNo={() => setModalShow("")}
                />
              )}
              {modalShow === "updated successfully" && (
                <RIModal
                  Heading={"Personal Information"}
                  Text={"Your profile has been saved successfully "}
                  onClick={() => navigate("/employer-workplace/my-profile-company-information")}
                />

              )}
              {errorShow && (
                <Modal
                  heading={errorMessage}
                  onClick={() => setErrorShow(false)}
                />
              )}
              <NewClientDashboard>
                <div>
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
                      <div className={classes.InputContainer}>
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
                              {profilePicture ? (
                                <img
                                  className={classes.form_upload_label}
                                  src={URL.createObjectURL(profilePicture)}
                                  alt={firstName + " " + lastName}
                                  title={firstName + " " + lastName}
                                  loading="lazy"
                                  width={120}
                                  height={120}

                                />
                              ) : (
                                <>
                                  {profile ? (
                                    <img
                                      className={classes.form_upload_label}
                                      src={profile}
                                      alt={firstName + " " + lastName}
                                      title={firstName + " " + lastName}
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
                            <h1 className={classes.nameHeading}>
                              {userName}
                            </h1>
                            <FaFacebookSquare
                              onClick={() => setSocialFieldsShow(true)}
                              color="#1877f2"
                              className={classes.socialIcons}
                              size={25}
                            />
                            <FaTwitterSquare
                              onClick={() => setSocialFieldsShow(true)}
                              color="#1d9bf0"
                              className={classes.socialIcons}
                              size={25}
                            />
                            <FaLinkedin
                              onClick={() => setSocialFieldsShow(true)}
                              color="#0a66c2"
                              className={classes.socialIcons}
                              size={25}
                            />
                          </div>
                        </div>
                        <div className={classes.error_message}>
                          {error.file}
                        </div>
                        <div className={classes.formContainer}>
                          <div className={classes.inputFieldsWrapper}>
                            <div className={classes.inputFields}>
                              <RiTextInputs
                                input={"SingleLineInput"}
                                placeHolder={"First Name"}
                                onInput={() => {
                                  error.firstName = " ";
                                }}
                                maxLength={30}
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                              />
                              <div className={classes.error_message}>
                                {error.firstName}
                              </div>
                            </div>
                            <div className={classes.inputFields}>
                              <RiTextInputs
                                input={"SingleLineInput"}
                                placeHolder={"Last Name"}
                                onInput={() => {
                                  error.lastName = " ";
                                }}
                                maxLength={30}
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                              />
                              <div className={classes.error_message}>
                                {error.lastName}
                              </div>
                            </div>
                          </div>
                          <div className={classes.inputFieldsWrapper}>
                            <div className={classes.inputFields}>
                              <div className={isMobile === "" ? classes.disable : classes.disabledInput}>
                                <RiTextInputs
                                  input={"mobileWithDropdown"}
                                  maxLength="10"
                                  minLength="10"
                                  onDialCodechange={(e) => {
                                    setDialCode(e.target.value);
                                  }}
                                  dialCodeValue={dialCode}
                                  checkMObileVal={checkMObileVal}
                                  onChange={(e) => {
                                    setMobile(
                                      isNaN(parseInt(e.target.value))
                                        ? ""
                                        : e.target.value
                                    );
                                    setCheckMObileVal(
                                      e.target.value.length === 10
                                        ? true
                                        : false
                                    );
                                  }}
                                  value={mobile}
                                  onInput={() => {
                                    error.mobile = " ";
                                  }}
                                  placeHolder={"Phone Number"}
                                />
                              </div>
                              <div className={classes.error_message}>
                                {error.mobile}
                              </div>
                              {!isAlternativeMobile ? (
                                <div className={classes.AddAlternative}>
                                  <AiOutlinePlusCircle
                                    className={classes.addIcon}
                                    onClick={() => {
                                      setIsAlternativeMobile(
                                        !isAlternativeMobile
                                      );
                                    }}
                                  />
                                  <div
                                    onClick={() => {
                                      setIsAlternativeMobile(
                                        !isAlternativeMobile
                                      );
                                    }}
                                    className={classes.alterNateText}
                                  >
                                    Alternate mobile number
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className={classes.AddAlternativeOpen}>
                                    <AiOutlineMinusCircle
                                      className={classes.addIcon}
                                      onClick={() => {
                                        setIsAlternativeMobile(
                                          !isAlternativeMobile
                                        );
                                      }}
                                    />
                                    <div
                                      onClick={() => {
                                        setIsAlternativeMobile(
                                          !isAlternativeMobile
                                        );
                                      }}
                                      className={classes.alterNateText}
                                    >
                                      Alternate mobile number
                                    </div>
                                  </div>
                                  <div className={classes.alternateContainer}>
                                    <RiTextInputs
                                      input={"mobileWithDropdown"}
                                      maxLength="10"
                                      minLength="10"
                                      onDialCodechange={(e) => {
                                        setAlternateDialCode(e.target.value);
                                      }}
                                      dialCodeValue={alternateDialCode}
                                      onInput={() => {
                                        error.alternateMobile = " ";
                                      }}
                                      checkMObileVal={checkAlternateMobile}
                                      onChange={(e) => {
                                        setAlternateMobile(
                                          isNaN(parseInt(e.target.value))
                                            ? ""
                                            : e.target.value
                                        );
                                        setCheckAlternateMobile(
                                          e.target.value.length === 10
                                            ? true
                                            : false
                                        );
                                      }}
                                      value={alternateMobile}
                                      placeHolder={"Phone Number"}
                                    />
                                    <div className={classes.error_message}>
                                      {error.alternateMobile}
                                    </div>

                                    {isCheckMObile &&
                                      resentOtpLoading === "primaryMobile" ? (
                                      <Loader
                                        type="TailSpin"
                                        color="#1778f2"
                                        width={20}
                                        height={18}
                                      />
                                    ) : (
                                      <div>
                                        {" "}
                                        <input
                                          type="checkbox"
                                          checked={isCheckMObile}
                                          value={isCheckMObile}
                                          onChange={() => {
                                            alternateMobile === "" ||
                                              alternateMobile === undefined
                                              ? setError({
                                                ...error,
                                                alternateMobile:
                                                  "Invalid number",
                                              })
                                              : alternateMobile.length === 10
                                                ? setIsCheckMobile(!isCheckMObile)
                                                : setError({
                                                  ...error,
                                                  alternateMobile:
                                                    "Invalid number",
                                                });
                                          }}
                                          className={classes.CheckBoxInput}
                                        />
                                        Set as primary
                                      </div>
                                    )}
                                  </div>{" "}
                                </>
                              )}
                            </div>

                            <div className={classes.inputFields}>
                              <div className={classes.disabledInput}>
                                <RiTextInputs
                                  input={"SingleLineInput"}
                                  type={"email"}
                                  placeHolder={"Email"}
                                  onInput={() => {
                                    error.email = " ";
                                  }}
                                  onChange={(e) => {
                                    let keyword = e.target.value.toLowerCase();
                                    var re = /^[a-z@A-Z.0-9_]*$/;
                                    if (keyword === "" || re.test(keyword)) {
                                      setUserEmail(keyword);
                                    }
                                  }}
                                  value={userEmail}
                                />
                              </div>
                              <div className={classes.error_message}>
                                {error.email}
                              </div>
                              {!isAlternativeEmail ? (
                                <div className={classes.AddAlternative}>
                                  <AiOutlinePlusCircle
                                    className={classes.addIcon}
                                    onClick={() => {
                                      setIsAlternativeEmail(
                                        !isAlternativeEmail
                                      );
                                    }}
                                  />
                                  <div
                                    onClick={() => {
                                      setIsAlternativeEmail(
                                        !isAlternativeEmail
                                      );
                                    }}
                                    className={classes.alterNateText}
                                  >
                                    Alternate email
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className={classes.AddAlternativeOpen}>
                                    <AiOutlineMinusCircle
                                      className={classes.addIcon}
                                      onClick={() => {
                                        setIsAlternativeEmail(
                                          !isAlternativeEmail
                                        );
                                      }}
                                    />
                                    <div
                                      onClick={() => {
                                        setIsAlternativeEmail(
                                          !isAlternativeEmail
                                        );
                                      }}
                                      className={classes.alterNateText}
                                    >
                                      Alternate email
                                    </div>
                                  </div>
                                  <div className={classes.alternateContainer}>
                                    <RiTextInputs
                                      input={"SingleLineInput"}
                                      type={"email"}
                                      placeHolder={"Email"}
                                      onInput={() => {
                                        error.alternateEmail = " ";
                                      }}
                                      onChange={(e) => {
                                        let keyword =
                                          e.target.value.toLowerCase();
                                        var re = /^[a-z@A-Z.0-9_]*$/;
                                        if (
                                          keyword === "" ||
                                          re.test(keyword)
                                        ) {
                                          setAlternateEmail(keyword);
                                        }
                                      }}
                                      value={alternateEmail}
                                    />
                                    <div className={classes.error_message}>
                                      {error.alternateEmail}
                                    </div>

                                    {isCheckEmail &&
                                      resentOtpLoading === "primaryEmail" ? (
                                      <Loader
                                        type="TailSpin"
                                        color="#1778f2"
                                        width={20}
                                        height={18}
                                      />
                                    ) : (
                                      <div className={classes.CheckBoxInputDiv}>
                                        {" "}
                                        <input
                                          checked={isCheckEmail}
                                          type="checkbox"
                                          value={isCheckEmail}
                                          onChange={(e) => {
                                            regEmail.test(alternateEmail)
                                              ? setIsCheckEmail(!isCheckEmail)
                                              : setError({
                                                ...error,
                                                alternateEmail:
                                                  "Invalid Email",
                                              });
                                          }}
                                          className={classes.CheckBoxInput}
                                        />{" "}
                                        Set as primary
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className={classes.inputFieldsWrapper}>
                            <div className={classes.inputFields}>
                              <RiTextInputs
                                input={"mobileWithDropdown"}
                                maxLength="10"
                                minLength="10"
                                onDialCodechange={(e) => {
                                  setWhatsAppDialCode(e.target.value);
                                }}
                                dialCodeValue={whatsAppDialCode}
                                onInput={() => {
                                  error.Whatsapp = " ";
                                }}
                                checkWhatsAppMObile={checkWhatsAppMObile}
                                onChange={(e) => {
                                  setWhatsapp(
                                    isNaN(parseInt(e.target.value))
                                      ? ""
                                      : e.target.value
                                  );
                                  setCheckWhatsAppMObile(
                                    e.target.value.length === 10 ? true : false
                                  );
                                }}
                                value={Whatsapp}
                                placeHolder={"WhatsApp Number"}
                              />
                              <div className={classes.error_message}>
                                {error.Whatsapp}
                              </div>
                            </div>
                          </div>
                          <div className={classes.inputFieldsWrapper}>
                            <div className={classes.inputFields}>
                              <RiTextInputs
                                input={"Dropdown"}
                                placeHolder={"Gender"}
                                defaultGender={gender}
                                onChange={(e) => setGender(e.target.value)}
                                value={gender}
                              />
                            </div>

                            <div className={classes.inputFields}>
                              <RiTextInputs
                                input={"date"}
                                placeHolder={"Date of Birth "}
                                onInput={() => {
                                  error.dob = " ";
                                }}
                                onChange={(e) => setDob(e.target.value)}
                                value={dob}
                              />
                              <div className={classes.error_message}>
                                {error.dob}
                              </div>
                            </div>
                          </div>
                          <div className={classes.inputAdressWrapper}>
                            <RiTextInputs
                              input={"SingleLineInput"}
                              placeHolder={"Address"}
                              onInput={() => {
                                error.address = " ";
                              }}
                              onChange={(e) => setAddress(e.target.value)}
                              value={address}
                            />
                            <div className={classes.error_message}>
                              {error.address}
                            </div>
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
                                  <div className={classes.inputArea}>
                                    {state}
                                  </div>
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
                                  <div className={classes.inputArea}>
                                    {city}
                                  </div>
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
                                        onChange={(e) =>
                                          setCity(e.target.value)
                                        }
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
                              : console.log("somethin went wrong");
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </NewClientDashboard>
            </React.Suspense>
          </>
        );
    }
  };
  return (
    <>
      {" "}
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

export default PerosonalInformation;
