import React, { useContext, useEffect, useState } from "react";
import classes from "./Login.module.css";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { pageViewTracker } from "../../Components/GoogleTracking";
import RIModal from "../../Components/RIModal";
const Modal = React.lazy(() => import("../../Components/Modal"));
const ActionButton = React.lazy(() => import("../../Components/ActionButton"));
const RiTextInputs = React.lazy(() =>
  import("../../Components/PostRequirement/RiTextInputs")
);
// const LoginOptions = React.lazy(() =>
//   import("../../Components/RegistrationComponents/LoginOptions")
// );


const Login = () => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);

  const [userName, setUserName] = useState();
  const [error, setError] = useState({});
  const [password, setPassword] = useState();
  const [credientialCheck, setCredientialCheck] = useState(true);
  const [userNameErr, setUserNameErr] = useState();
  const [isLoading, setIsLoading] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modal, setModal] = useState(false);

  const afterAuthRedirectUrl = sessionStorage.getItem("afterAuthRedirectUrl");
  const goBackRedirectUrl = sessionStorage.getItem("goBackRedirectUrl");

  useEffect(() => {
    pageViewTracker()
    if (isUserLoggedIn) {
      navigate(goBackRedirectUrl);
    }
  }, []);

  const formValidation = () => {
    let errors = {};
    let isValid = true;

    if (!userName || userName === "") {
      errors.userName = "Please enter your Email / Mobile number";
      isValid = false;
    }
    if (!password || password === " ") {
      errors.emptydetails = "Please enter your password";
      isValid = false;
    } else {
    }
    setError(errors);
    return isValid;
  };
  let navigate = useNavigate();

  const UserLogin = () => {
    setIsLoading("login");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = userName.includes("@")
      ? JSON.stringify({
        Password: password,
        Email: userName,
      })
      : JSON.stringify({
        Password: password,
        Mobile: userName,
      });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(global.apiLink + "/api/rozgaarapi/Login?", requestOptions)
      .then((response) => response.json())
      .then((result) => {

        if (result.status === "SUCCESS" && result.status_code === 200) {
          setIsUserLoggedIn(true);
          sessionStorage.setItem("Client_userID", result.data.UserId);
          sessionStorage.setItem("Client_USERMOBILENO", result.data.Mobile);
          sessionStorage.setItem("Client_USEREMAIL", result.data.Email);
          sessionStorage.setItem("Client_FirstName", result.data.FirstName);
          sessionStorage.setItem("Client_LastName", result.data.LastName);
          sessionStorage.setItem("Client_ProfilePicture", result.data.ProfilePicture);
          localStorage.setItem("Client_userLoggedIn", true);
          localStorage.setItem("Client_IsLoginType", "Client")
          localStorage.setItem("Client_userID", result.data.UserId);
          localStorage.setItem("Client_USERMOBILENO", result.data.Mobile);
          localStorage.setItem("Client_USEREMAIL", result.data.Email);
          localStorage.setItem("Client_FirstName", result.data.FirstName);
          localStorage.setItem("Client_LastName", result.data.LastName);
          localStorage.setItem("Client_UserName", result.data.UserName);
          localStorage.setItem("Client_ProfilePicture", result.data.ProfilePicture);
          navigate(
            afterAuthRedirectUrl ? afterAuthRedirectUrl : "/employer-workplace"
          );
          sessionStorage.removeItem("afterAuthRedirectUrl");
        } else {
          setCredientialCheck(false);
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setIsLoading("");
      });
  };

  // const SocialLogin = (res) => {
  //   var myHeaders = new Headers();
  //   myHeaders.append(
  //     "Authorization",
  //     "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
  //   );
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     Email: "profileObj" in res ? res.profileObj.email : res.email,
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(global.apiLink + "/api/rozgaarapi/SocialLogin", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (
  //         result.status === "SUCCESS" &&
  //         result.status_code === 200 &&
  //         result.message === "data successfully created"
  //       ) {
  //         sessionStorage.setItem(
  //           "googleBiEmail",
  //           "profileObj" in res ? res.profileObj.email : res.email
  //         );
  //         sessionStorage.setItem("userID", result.data.UserId);
  //         navigate("/SocialLogin");
  //       }
  //       if (
  //         result.status === "SUCCESS" &&
  //         result.status_code === 200 &&
  //         result.message === "data successfully updated" &&
  //         result.data.Country === ""
  //       ) {
  //         sessionStorage.setItem(
  //           "googleBiEmail",
  //           "profileObj" in res ? res.profileObj.email : res.email
  //         );
  //         sessionStorage.setItem("userID", result.data.UserId);

  //         navigate("/SocialLogin");
  //       }
  //       if (
  //         result.status === "SUCCESS" &&
  //         result.status_code === 200 &&
  //         result.message === "data successfully updated" &&
  //         result.data.Country !== ""
  //       ) {
  //         sessionStorage.setItem(
  //           "googleBiEmail",
  //           "profileObj" in res ? res.profileObj.email : res.email
  //         );
  //         sessionStorage.setItem("userID", result.data.UserId);

  //         sessionStorage.setItem("USERMOBILENO", result.data.Mobile);
  //         sessionStorage.setItem("USEREMAIL", result.data.Email);
  //         sessionStorage.setItem("FirstName", result.data.FirstName);
  //         sessionStorage.setItem("LastName", result.data.LastName);
  //         sessionStorage.setItem("ProfilePicture", result.data.ProfilePicture);
  //         localStorage.setItem("userLoggedIn", true);
  //         localStorage.setItem("IsLoginType", "Client")
  //         localStorage.setItem(
  //           "googleBiEmail",
  //           "profileObj" in res ? res.profileObj.email : res.email
  //         );
  //         localStorage.setItem("USERMOBILENO", result.data.Mobile);
  //         localStorage.setItem("USEREMAIL", result.data.Email);
  //         localStorage.setItem("FirstName", result.data.FirstName);
  //         localStorage.setItem("LastName", result.data.LastName);
  //         localStorage.setItem("UserName", result.data.UserName);
  //         localStorage.setItem("userID", result.data.UserId);
  //         localStorage.setItem("ProfilePicture", result.data.ProfilePicture);
  //         navigate(
  //           afterAuthRedirectUrl ? afterAuthRedirectUrl : "/employer-workplace"
  //         );
  //         sessionStorage.removeItem("afterAuthRedirectUrl");
  //         setIsUserLoggedIn(true);
  //         setModalShow(true);
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  // };
  const ResentOtp = async (value) => {
    value==="ForgotPasswordPreScreen"? setIsLoading("forgotPassword"):setIsLoading("verifyOtp");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Email: userName.includes("@")?userName:"",
      Mobile: userName.includes("@")?"":userName,
      CountryCode: "+91",
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    await fetch(
      global.apiLink + "/api/rozgaarapi/ResendOtpSecond",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          {value==="ForgotPasswordPreScreen"? navigate("/forgotpassword", {
            state: { Mobile: userName.includes("@")?"":userName, Email: userName.includes("@")?userName:"", DialCode: "+91" },
          }):
          navigate(userName.includes("@")? "/verifyEmailOTP":"/verifyOTP", {
            state: { Mobile: userName, DialCode: "+91" },
          })
        }
        } else if (result.message === "Please Enter Valid Mobile or Email") {
          setUserNameErr(result.message);
        } else {
        }
      })
      .catch((error) => {
        alert("There is some issue , please contact support!");
      })
      .finally(() => {
        setIsLoading(" ");
      });
  };
  const handleSubmit=(e)=>{
  
    if (e.key === 'Enter') {
      formValidation()
      ? UserLogin()
      : console.log("something went wrong");
    }
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Employer Login | Rozgaar India `}</title>
        <meta
          name="description"
          content={`Find & Hire Freelancer for your professional requirement. Post your freelance job requirement for free`}

        />
        <link rel="canonical" href="https://www.rozgaarindia.com/login" />
      </Helmet>
      <React.Suspense
        fallback={
          <div className={classes.pageLoader}>
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
         {modal && (
            <RIModal RIModalType={"RedirectFreelancer"} onClick={() => setModal(false)} href={process.env.PUBLIC_URL +"https://freelancer.rozgaarindia.com/login"} onHrefClick={()=>setModal(false)}/>
          )}
        <div className={classes.Pagewrapper}>
          <div className={classes.Maincontainer_border}>
            {modalShow && (
              <Modal
                heading={"Login successfully"}
                onClick={() => navigate("/")}
              />
            )}

            <div className={classes.mainContainer}>
              <h1 className={classes.MainHeading}>Welcome back!</h1>
              <h2 className={classes.loginLink}>
              Don't have an account?
                <a href={process.env.PUBLIC_URL +"/join"} className={classes.terms_link}>
                  {" "}
                  Signup
                </a>
              </h2>
              <div className={classes.input_container}>
                <RiTextInputs
                  input={"SingleLineInput"}
                  type={"text"}
                  onInput={() => {
                    error.userName = " ";
                    setUserNameErr(" ")
                  }}
                  onKeyPress={handleSubmit}
                  placeHolder={"Email / Mobile"}
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />

                <div className={classes.error_message}>{error.userName}</div>
                <div className={classes.error_message}>{userNameErr}</div>


                <RiTextInputs
                  input={"password"}
                  placeHolder={"Password"}
                  onInput={() => {
                    error.emptydetails = " ";
                  }}
                  onKeyPress={handleSubmit}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div className={classes.error_message}>
                  {error.emptydetails}
                </div>

                {!credientialCheck && (
                  <div className={classes.error_message}>
                    <div>Your login details and password do not match</div>
                  </div>
                )}
                <div className={classes.loginWith_Otp} onClick={()=>userName?ResentOtp("verifyOTP"):navigate(process.env.PUBLIC_URL +"/loginWithOTP")}>
                  {" "}
                  {/* <a href={process.env.PUBLIC_URL +"/loginWithOTP"} className={classes.loginWith_Otp}> */}
                  {isLoading==="verifyOtp" ? (
                    <div className={classes.Loading}>
                      <Loader
                        type="TailSpin"
                        color="#1778f2"
                        width={20}
                        height={18}
                      />
                    </div>
                  ) :   <>Login with OTP</>}
                  {/* </a> */}
                </div>

                <div className={classes.error_message}>
                  <div>{error.checked}</div>
                </div>
              </div>
              <div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    formValidation()
                      ? UserLogin()
                      : console.log("Something's wrong");
                  }}
                >
                  {isLoading==="login" ? (
                    <div className={classes.LoadingBtn}>
                      <Loader
                        type="TailSpin"
                        color="white"
                        width={20}
                        height={18}
                      />
                    </div>
                  ) : (
                    <ActionButton buttonText={"Login"} />
                  )}
                </div>
              </div>

              <div onClick={() => userName?ResentOtp("ForgotPasswordPreScreen"):navigate("/ForgotPasswordPreScreen")}>
              {isLoading==="forgotPassword" ? (
                    <div className={classes.Loading}>
                      <Loader
                        type="TailSpin"
                        color="#1778f2"
                        width={20}
                        height={18}
                      />
                    </div>
                  ) :  <div className={classes.forgot_password}>Forgot password?</div>}
              </div>

              {/* <div className={classes.login_with}>or Login With</div>
              <LoginOptions
                OnSuccess={SocialLogin}
                responseFacebook={SocialLogin}
              /> */}
              <div className={classes.freelancerlink} onClick={()=>setModal(true)}>
                {" "}
                Login as Freelancer
              </div>
            </div>
          </div>
        </div>
      </React.Suspense>
    </>
  );
};

export default Login;
