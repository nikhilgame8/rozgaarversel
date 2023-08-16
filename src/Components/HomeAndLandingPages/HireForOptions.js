import { AiOutlineArrowRight } from "react-icons/ai";
import NewHeadingRI from "../NewHeadingRI";
import classes from "./HireForOptions.module.css";

const HireForOptions = () => {
  const dataHireFor = [
    {
      key: 1,
      image: "/assets/HireFor/HireFor1.jpg",
      heading: "One Time Task",
      subheading: "Hire Freelancers for one-time gig work",
      bulletA:
        " Looking for a graphic designer to create a logo for my startup",
      bulletB: "I want a product demo video of beauty products for youtube",
      bgColor: "blue",
    },
    {
      key: 2,
      image: "/assets/HireFor/HireFor2.jpg",
      heading: "Monthly Basis",
      subheading: "Hire freelancers continuous monthly term",
      bulletA:
        "I want a graphic designer to design social media posts everyday for 2 months",
      bulletB: "I want a data entry expert to work for a insurance company",
      bgColor: "green",
    },
    {
      key: 3,
      image: "/assets/HireFor/HireFor3.jpg",
      heading: "Contract Work",
      subheading: "Hire for a short-term or a long-term project",
      bulletA:
        "Need a react website developer to work on an e-commerce project ",
      bulletB:
        "Looking for customer service agents to provide call support to clients",
      bgColor: "brown",
    },
    {
      key: 4,
      image: "/assets/HireFor/HireFor4.jpg",
      heading: "On Commission",
      subheading: "Hire freelancer for commission basis",
      bulletA: "We are looking for a POS agents for providing verified leads",
      bulletB: "Hiring sales agents to promote app downloads with KYC",
      bgColor: "white",
    },
  ];

  return (
    <>
      <div className={classes.backGround}>
        <div className={classes.mainHeading}>
          <NewHeadingRI
            firstLine={"Hire Remote Hybrid Flexible Freelancers "}
          />
        </div>
        <div className={classes.mainContainer}>
          {dataHireFor.map((item, i) => (
            <>
              <div
                key={item.key}
                className={`${classes.rectangleBox} ${classes[item.bgColor]}`}
              >
                <div className={classes.hireforoptions_padding}>
                  <h2 className={classes.headingStyle}> {item.heading} </h2>
                  <div className={classes.subHeadingStyle}>
                    {" "}
                    {item.subheading}{" "}
                  </div>
                  <div className={classes.bulletSectionWithMargin}>
                    {" "}
                    {item.bulletA}
                  </div>
                  <div className={classes.bulletSection}> {item.bulletB}</div>
                </div>
              
                <a
                  href={process.env.PUBLIC_URL + "/Step1PAR"}
                  onClick={() => {
                    sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                    sessionStorage.setItem("goBackRedirectUrl", "/");
                  }}
                >
                  <div className={classes.knowMore}>
                    {" "}
                    <AiOutlineArrowRight className={classes.iconArrow} />{" "}
                  </div>
                </a>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default HireForOptions;
