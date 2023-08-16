import SkillsSuggestion from "../Components/HomeAndLandingPages/SkillsSuggestion";
import classes from "./LandingPage.module.css";
import { Helmet } from "react-helmet";
import FreelancerProfileSnippet from "../Components/HomeAndLandingPages/FreelancerProfileSnippet";
import PARCallForAction from "../Components/HomeAndLandingPages/PARCallForAction";
import RIFooter from "../Components/RIFooter";
import TrustedByWeb from "../Components/HomeAndLandingPages/TrustedByWeb";
import WhyChooseRIWeb from "../Components/HomeAndLandingPages/WhyChooseRIWeb";

const HomePageWeb = () => {
  return (
    <div>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Best Remote work and freelance projects at RozgaarIndia.com via Times Ascent`}</title>
          <meta
            name="description"
            content={`Rozgaar India is one of India's Leading online service marketplace for remote work and freelance projects. You can find the best skilled online service providers at RozgaarIndia.com`}
          />
        </Helmet>

        <div className={classes.bannerImage}>
          <img
            src={process.env.PUBLIC_URL + "/assets/banners/DataEntryBanner_Web.jpg"}
            alt="Data_Entry_Baner_Web_Image"
            height={"400px"}
            width="100%"
          />
        </div>

        <TrustedByWeb />
        <div className={classes.skillSuggestion}>
          <SkillsSuggestion />
        </div>
        <WhyChooseRIWeb />
        <FreelancerProfileSnippet />
        <PARCallForAction />
        <RIFooter />
      </div>
    </div>
  );
};

export default HomePageWeb;
