
import classes from "./TrustedBy.module.css";

const TrustedByWeb = () => {
  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.mainLogoDiv}>
          <img
            src={process.env.PUBLIC_URL + "/assets/TrustedCompaniesLogo/Hero_Insurance.svg"}
            alt="Rozgaar_TrustedBy_Hero_Insurance"
            width={"90px"}
            height={"90px"}
            loading="lazy"
            className={classes.logoAreaWeb}
            title="Rozgaar_TrustedBy_Hero_Insurance"
          />
          <img
            src={process.env.PUBLIC_URL + "/assets/TrustedCompaniesLogo/Hyundai.svg"}
            alt="Rozgaar_TrustedBy_Hyundai"
            width={"90px"}
            height={"90px"}
            className={classes.logoAreaWeb}
            loading="lazy"
            title="Rozgaar_TrustedBy_Hyundai"
          />
          <img
            src={process.env.PUBLIC_URL + "/assets/TrustedCompaniesLogo/Hero.svg"}
            alt="Rozgaar_TrustedBy_Hero"
            width={"90px"}
            height={"90px"}
            className={classes.logoAreaWeb}
            loading="lazy"
            title="Rozgaar_TrustedBy_Hero"
          />
          <img
            src={process.env.PUBLIC_URL + "/assets/TrustedCompaniesLogo/Amazon_logo.svg"}
            alt="Rozgaar_TrustedBy_Amazon"
            width={"90px"}
            height={"90px"}
            className={classes.logoAreaWeb}
            loading="lazy"
            title="Rozgaar_TrustedBy_Amazon"
          />

          <img
            src={process.env.PUBLIC_URL + "/assets/TrustedCompaniesLogo/TimesAscent.svg"}
            alt="Rozgaar_TrustedBy_Times_Ascent"
            width={"90px"}
            height={"90px"}
            className={classes.logoAreaWeb}
            loading="lazy"
            title="Rozgaar_TrustedBy_Amazon"
          />
          <img
            src={process.env.PUBLIC_URL + "/assets/TrustedCompaniesLogo/Skill_India.svg"}
            alt="Rozgaar_TrustedBy_Skill_India"
            width={"85px"}
            height={"75px"}
            className={classes.logoAreaWeb}
            loading="lazy"
            title="Rozgaar_TrustedBy_Amazon"
          />
          <img
            src={process.env.PUBLIC_URL + "/assets/TrustedCompaniesLogo/Digital_India.svg"}
            alt="Rozgaar_TrustedBy_Digital_India"
            width={"90px"}
            height={"90px"}
            className={classes.logoAreaWeb}
            loading="lazy"
            title="Rozgaar_TrustedBy_Amazon"
          />
        </div>
      </div>
    </>
  );
};

export default TrustedByWeb;
