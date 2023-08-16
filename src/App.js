import React, { useEffect, useState, useMemo } from "react";
import { UserContext } from "./Context/UserContext";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./Screens/UserRegistration/Login";
import SignUp from "./Screens/UserRegistration/SignUp";
import Joinpage from "./Screens/UserRegistration/Joinpage";
import ForgotPassword from "./Screens/UserRegistration/ForgotPassword";
import MobileVerification from "./Screens/UserRegistration/MobileVerification";
import EmailVerification from "./Screens/UserRegistration/EmailVerification";
import Step2PAR from "./Screens/PostARequirement/Step2PAR";
import Step1PAR from "./Screens/PostARequirement/Step1PAR";
import Step3PAR from "./Screens/PostARequirement/Step3PAR";
import Step4PAR from "./Screens/PostARequirement/Step4PAR";
import Step5PAR from "./Screens/PostARequirement/Step5PAR";
import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUs";
import RIHeaderMobile from "./Components/RIHeaderMobile";
import ReportaBug from "./Screens/ReportaBug";
import HomePageNew from "./Screens/HomePage/HomePageNew";
import HomePageNewWeb from "./Screens/HomePage/HomePageNewWeb";
import TermsConditions from "./Screens/OtherPages/TermsConditions";
import PrivacyPolicy from "./Screens/OtherPages/PrivacyPolicy";
import SocialLogin from "./Screens/UserRegistration/SocialLogin";
import ForgotPasswordPreScreen from "./Screens/UserRegistration/ForgotPasswordPreScreen";
import LoginWithOTP from "./Screens/UserRegistration/LoginWithOTP";
import VerifyOTP from "./Screens/UserRegistration/VerifyOTP";
import VerifyEmailOTP from "./Screens/UserRegistration/VerifyEmailOTP";
import ContactUsDashboard from "./Screens/ClientDashboard/ContactUsDashboard";
import WorkRequirementDashboard from "./Screens/NewClientDashboard/WorkRequirementsDashboard";
import HowToHire from "./Screens/HireToHireScreens/HowToHire";
import HowToHireDashboard from "./Screens/NewClientDashboard/HowToHireDashboard";
import TransactionWeb from "./Screens/NewClientDashboard/TransactionWeb";
import WorkPlace from "./Screens/NewClientDashboard/WorkPlace";
import FrequentlyAskedQuestions from "./Screens/FAQ/FrequentlyAskedQuestions";
import ClientRequirementDetail from "./Screens/NewClientDashboard/ClientRequirementDetail";
import CompanyInformation from "./Screens/NewClientDashboard/CompanyInformation";
import PerosonalInformation from "./Screens/NewClientDashboard/PersonalInformation";
import VerifyClientProfileEmail from "./Screens/NewClientDashboard/VerifyClientProfileEmail";
import VerifyClientProfileMobile from "./Screens/NewClientDashboard/VerifyClientProfileMobile";
import RazorPayGateway from "./Screens/RazorPayPaymentGateway/RazorPayGateway";
import RazorPayGatewayPaymentFailure from "./Screens/RazorPayPaymentGateway/RazorPayGatewayPaymentFailure";
import RazorPayGatewayPaymentSuccess from "./Screens/RazorPayPaymentGateway/RazorPayGatewayPaymentSuccess";

import FreelancerProfileMain from "./Screens/ClientFreelancerProfile/FreelancerProfileMain";
import HireAssistent from "./Screens/HireAssistent/HireAssistent";
import PublicClientRequirementDetail from "./Screens/NewClientDashboard/PublicClientRequirementDetail";
import "animate.css/animate.min.css";
import PublicClientRequirementList from "./Screens/Requirements/PublicClientRequirementList";
import FutureWork from "./Screens/FutureOfWork/FutureWork";
import ArticlesRozgaar from "./Screens/OtherPages/ArticlesRozgaar";
import ArticlesRozgaarWeb from "./Screens/OtherPages/ArticlesRozgaarWeb";
import ExploreSkills from "./Screens/ExploreSkillsScreen/ExploreSkills";
import BulkHiringPage from "./Screens/BulkHiringPage/BulkHiringPage";
import CheckUserEligibility from "./Screens/PostARequirement/CheckUserEligibility";
import NotificationDashboard from "./Screens/OtherPages/NotificationDashboard";
import GatewayPaymentStatus from "./Screens/RazorPayPaymentGateway/GatewayPaymentStatus";
import { pageViewTracker } from "./Components/GoogleTracking";
import RIFooter from "./Components/RIFooter";
import ErrorPage from "./Screens/ErrorPage";
import FreeJobAlert from "./Screens/OtherPages/FreeJobAlert";
import WriteForUs from "./Screens/OtherPages/WriteForUs";

const App = () => {
  global.apiLink = "https://api-preview.rozgaarindia.com";
  global.apiLink8000 = "http://api-preview.rozgaarindia.com:8000";
  global.apiLink8001 = "http://api-preview.rozgaarindia.com:8001";
  global.chatLink = "https://chat.rozgaarindia.com";
  global.imageLink = "https://www.rozgaarindia.com";
  
  const [width, setWidth] = useState(window.innerWidth);



  useEffect(() => {
    pageViewTracker();

    const windowWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", windowWidth);

    return () => {
      window.removeEventListener("resize", windowWidth);
    };
  }, [window.location.pathname]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const value = useMemo(
    () => ({ isUserLoggedIn, setIsUserLoggedIn }),
    [isUserLoggedIn, setIsUserLoggedIn]
  );

  useEffect(() => {
    localStorage.getItem("Client_userLoggedIn")
      ? setIsUserLoggedIn(true)
      : setIsUserLoggedIn(false);
  }, []);
  
  return width > 1023 ? (
    <Router>
      <UserContext.Provider value={value}>
      
        <ScrollToTop />
        <RIHeaderMobile type={"web"} />
        <div className="screeWidth">
          <Routes>
        
            <Route path="/" element={<HomePageNewWeb />} />
            <Route path="/signup" element={<SignUp />} />

            <Route
              path="/employer-workplace"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <WorkPlace /> : <></>}
                </>
              }
            />
<Route
              path="/Step1PAR/:reqId"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step1PAR /> : <></>}
                </>
              }
            />
            <Route
              path="/Step2PAR/:reqId"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step2PAR /> : <></>}
                </>
              }
            />
            <Route
              path="/Step1PAR"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step1PAR /> : <></>}
                </>
              }
            />
            <Route
              path="/Step3PAR/:reqId"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step3PAR /> : <></>}
                </>
              }
            />
            <Route
              path="/Step4PAR/:reqId"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step4PAR /> : <></>}
                </>
              }
            />
            <Route
              path="/Step5PAR/:reqId"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step5PAR /> : <></>}
                </>
              }
            />
            <Route
              path="/login"
              element={!isUserLoggedIn ? <Login /> : <HomePageNewWeb />}
            />

            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/mobileverification"
              element={
                <>
                  {" "}
                  <MobileVerification />{" "}
                </>
              }
            />
            <Route path="/emailverification" element={<EmailVerification />} />

            <Route path="/customer-support" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />

            
            <Route path="/feedback-complaint" element={<ReportaBug />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* <Route path="/SocialLogin" element={<SocialLogin />} /> */}
            <Route
              path="/ForgotPasswordPreScreen"
              element={<ForgotPasswordPreScreen />}
            />
            <Route path="/loginWithOTP" element={<LoginWithOTP />} />
            <Route path="/verifyOTP" element={<VerifyOTP />} />
            <Route path="/verifyEmailOTP" element={<VerifyEmailOTP />} />
            <Route path="/join/" element={<Joinpage/>} />
     

            <Route path="/employer-workplace/customer-support" element={<ContactUsDashboard />} />
            <Route
              path="/employer-workplace/my-job-posting"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <WorkRequirementDashboard /> : <></>}
                </>
              }
            />
            <Route
              path="/how-to-hire-freelancer"
              element={
                <>
                  <HowToHire />
                </>
              }
            />
            <Route
              path="/employer-workplace/How-to-hire-freelancer"
              element={<HowToHireDashboard />}
            />
            <Route
              path="/employer-workplace/my-trasaction"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <TransactionWeb /> : <></>}
                </>
              }
            />
            <Route path="/employer-faq" element={<FrequentlyAskedQuestions />} />
          
            <Route
              path="/clientRequirementDetail/:reqID"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <ClientRequirementDetail /> : <></>}
                </>
              }
            />
            <Route path="/employer-workplace/customer-support" element={<ContactUsDashboard />} />
            <Route
              path="/employer-workplace/my-profile-company-information"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <CompanyInformation /> : <></>}
                </>
              }
            />

            <Route
              path="/employer-workplace/my-profile"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <PerosonalInformation /> : <></>}
                </>
              }
            />

            <Route
              path="/FreelancerProfile/:userID"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <FreelancerProfileMain /> : <></>}
                </>
              }
            />
            <Route
              path="/RazorPayGateway/:paymentType/:orderId"
              element={<RazorPayGateway />}
            />
            <Route
              path="/GatewayPaymentStatus/:orderId"
              element={<GatewayPaymentStatus />}
            />
            <Route
              path="/VerifyClientProfileEmail"
              element={<VerifyClientProfileEmail />}
            />
            <Route
              path="/VerifyClientProfileMobile"
              element={<VerifyClientProfileMobile />}
            />
            <Route
              path="/RazorPayGatewayPaymentSuccess/"
              element={<RazorPayGatewayPaymentSuccess />}
            />
            <Route
              path="/RazorPayGatewayPaymentFailure"
              element={<RazorPayGatewayPaymentFailure />}
            />

            <Route
              path="/hire-assistant"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <HireAssistent /> : <></>}
                </>
              }
            />
            <Route
              path="/freelancer-:RequirementType-job/:title/:reqId"
              element={<PublicClientRequirementDetail />}
            />
            <Route path="/future-of-work" element={<FutureWork />} />
            <Route
              path="/articlesRozgaar/:reqId"
              element={<ArticlesRozgaarWeb />}
            />
            
            <Route path="/skills" element={<ExploreSkills />} />
            <Route path="/free-job-alert" element={<FreeJobAlert/>} />
            <Route
              path="/freelance-job-posting"
              element={<PublicClientRequirementList />}
            />
            <Route path="/enterprise-freelancer-hiring-solution" element={<BulkHiringPage />} />
            <Route
              path="/CheckUserEligibility/:userId"
              element={<CheckUserEligibility />}
            />
            <Route
              path="/employer-workplace/notification"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <NotificationDashboard /> : <></>}
                </>
              }
            />
            <Route path="/writeforus" element={<WriteForUs />} />


              <Route  path="*"  element={<ErrorPage/>} status={404}/>
          </Routes>
        </div>
        <RIFooter />
      </UserContext.Provider>
    </Router>
  ) : (
    <Router>
      <UserContext.Provider value={value}>
        <ScrollToTop />
        <RIHeaderMobile type={"LoggedInMobile"} />
        <div>
          <Routes>
       
         
        
            <Route path="/" element={<HomePageNew />} />
            <Route path="/signup" element={<SignUp />} />
           
            <Route
              path="/Step2PAR/:reqId"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step2PAR /> : <></>}
                </>
              }
            />
          <Route
              path="/Step1PAR/:reqId"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step1PAR /> : <></>}
                </>
              }
            />
            <Route
              path="/Step1PAR"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step1PAR /> : <></>}
                </>
              }
            />
            <Route
              path="/Step3PAR/:reqId"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step3PAR /> : <></>}
                </>
              }
            />
            <Route
              path="/Step4PAR/:reqId"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step4PAR /> : <></>}
                </>
              }
            />
            <Route
              path="/Step5PAR/:reqId"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <Step5PAR /> : <></>}
                </>
              }
            />
            <Route
              path="/login"
              element={!isUserLoggedIn ? <Login /> : <HomePageNewWeb />}
            />

            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/mobileverification"
              element={
                <>
                  {" "}
                  <MobileVerification />{" "}
                </>
              }
            />
            <Route path="/emailverification" element={<EmailVerification />} />
            <Route path="/free-job-alert" element={<FreeJobAlert/>} />
            <Route path="/customer-support" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />

            <Route path="/join" element={<Joinpage/>} />
           
        
            <Route path="/feedback-complaint" element={<ReportaBug />} />
            <Route path="/terms" element={<TermsConditions />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route path="/SocialLogin" element={<SocialLogin />} />
            <Route
              path="/ForgotPasswordPreScreen"
              element={<ForgotPasswordPreScreen />}
            />
            <Route path="/loginWithOTP" element={<LoginWithOTP />} />
            <Route path="/verifyOTP" element={<VerifyOTP />} />
            <Route path="/verifyEmailOTP" element={<VerifyEmailOTP />} />
            <Route
              path="/employer-workplace/How-to-hire-freelancer"
              element={<HowToHireDashboard device={"Mobile"} />}
            />

            <Route
              path="/employer-workplace/my-profile-company-information"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? (
                    <CompanyInformation device={"Mobile"} />
                  ) : (
                    <></>
                  )}
                </>
              }
            />

            <Route
              path="/employer-workplace/my-profile"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? (
                    <PerosonalInformation device={"Mobile"} />
                  ) : (
                    <></>
                  )}
                </>
              }
            />
            <Route
              path="/employer-workplace/my-job-posting"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? (
                    <WorkRequirementDashboard device={"Mobile"} />
                  ) : (
                    <></>
                  )}
                </>
              }
            />
            <Route path="/how-to-hire-freelancer" element={<HowToHire device={"Mobile"}/>} />
            <Route
              path="/employer-workplace/my-trasaction"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? (
                    <TransactionWeb device={"Mobile"} />
                  ) : (
                    <></>
                  )}
                </>
              }
            />
            <Route path="/employer-faq" element={<FrequentlyAskedQuestions />} />
            <Route
              path="/employer-workplace"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <WorkPlace device={"Mobile"} /> : <></>}
                </>
              }
            />
          
            <Route
              path="/clientRequirementDetail/:reqID"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? (
                    <ClientRequirementDetail device={"Mobile"} />
                  ) : (
                    <></>
                  )}
                </>
              }
            />
            <Route
              path="/employer-workplace/customer-support"
              element={<ContactUsDashboard device={"Mobile"} />}
            />
            <Route
              path="/RazorPayGateway/:paymentType/:orderId"
              element={<RazorPayGateway />}
            />
            <Route
              path="/GatewayPaymentStatus/:orderId"
              element={<GatewayPaymentStatus />}
            />

            <Route
              path="/FreelancerProfile/:userID"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? (
                    <FreelancerProfileMain device={"Mobile"} />
                  ) : (
                    <></>
                  )}
                </>
              }
            />
            <Route
              path="/RazorPayGatewayPaymentSuccess/"
              element={<RazorPayGatewayPaymentSuccess />}
            />
            <Route
              path="/RazorPayGatewayPaymentFailure"
              element={<RazorPayGatewayPaymentFailure />}
            />
            <Route
              path="/hire-assistant"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? <HireAssistent device={"Mobile"} /> : <></>}
                </>
              }
            />
            <Route path="/future-of-work" element={<FutureWork />} />
            <Route
              path="/freelancer-:RequirementType-job/:title/:reqId"
              element={<PublicClientRequirementDetail device={"Mobile"} />}
            />
            <Route
              path="/articlesRozgaar/:reqId"
              element={<ArticlesRozgaar />}
            />

            <Route path="/skills" element={<ExploreSkills />} />
            <Route
              path="/freelance-job-posting"
              element={<PublicClientRequirementList device={"Mobile"} />}
            />
            <Route path="/enterprise-freelancer-hiring-solution" element={<BulkHiringPage />} />
            <Route
              path="/CheckUserEligibility/:userId"
              element={<CheckUserEligibility />}
            />
            <Route
              path="/employer-workplace/notification"
              element={
                <>
                  <PublicRedirect />
                  {isUserLoggedIn ? (
                    <NotificationDashboard device={"Mobile"} />
                  ) : (
                    <></>
                  )}
                </>
              }
            />
            <Route path="/writeforus" element={<WriteForUs />} />

              <Route  path="*" element={<ErrorPage/>} status={404}/>
          </Routes>
        </div>
        <RIFooter />
      </UserContext.Provider>
    </Router>
  );
};
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
const PublicRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("Client_userLoggedIn")) {
      navigate("/login");
    }
  }, [navigate]);
  return <></>;
};
export default App;


