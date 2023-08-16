import React, { useEffect } from "react";
import classes from "./FutureWork.module.css";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { pageViewTracker } from "../../Components/GoogleTracking";
const ActionButton = React.lazy(() => import("../../Components/ActionButton"));


const FutureWork = () => {
  useEffect(() => {
    
    pageViewTracker();
  }, []);

  return (
    <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>{`Freelance is The Future of Work | Rozgaar india `}</title>
        <meta
          name="description"
          content={`Connecting the world with talented verified freelancers faster than ever before to collaborate, and get work done in a safe and secure online environment.`}
       
       />
            <link rel="canonical" href="https://www.rozgaarindia.com/future-of-work" /> 
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
        <div>
          <div>
            
            <div className={classes.FutureWork_bannerovertext}>
              To connect the world with talented verified freelancers faster
              than ever before to collaborate, and get work done in a safe and
              secure online environment.
            </div>
            <img
              src={process.env.PUBLIC_URL + "/assets/Futureworkassets/bannerimagemob.jpg"}
              alt="Future_Of_Work_Rozgaar"
              className={classes.FutureWork_bannerimage}
              title="Future_Of_Work_Rozgaar"
              loading="lazy"
              width={"100%"}
              height={"500px"}
            />
            <img
              src={process.env.PUBLIC_URL + "/assets/Futureworkassets/bannerimageweb.jpg"}
              alt="Future_Of_Work_Rozgaar"
              className={classes.FutureWork_bannerimageweb}
              title="Future_Of_Work_Rozgaar"
              loading="lazy"
              width={"100%"}
              height={"450px"}
            />
          </div>
        
          <div className={classes.FutureWork_maindivsecond}>
            <div className={classes.FutureWork_maintext}>
            <h1> Freelancing is the future of work</h1>
              We are revolutionising the way people work and
              <br />
              debunk the archaic 9-to-5 work model
            </div>
            <div className={classes.FutureWork_borderbottomfirst}></div>
            <div className={classes.FutureWork_dflex}>
              <img
                src={process.env.PUBLIC_URL + "/assets/Futureworkassets/firstimagemob.jpg"}
                alt="Simplify_Remote_Hiring"
                className={classes.FutureWork_imagefirst}
                title="Simplify_Remote_Hiring"
                loading="lazy"
                width={"100%"}
                height={"300px"}
              />
              <div className={classes.FutureWork_text}>
                Our mission is to simplify remote hiring providing most aligned
                freelancers for a day, month or a year fulfilling your
                professional needs.
                <div className={classes.FutureWork_borderbottomsecond}></div>
              </div>
              <img
                src={process.env.PUBLIC_URL + "/assets/Futureworkassets/firstimageweb.jpg"}
                alt="Simplify_Remote_Hiring"
                className={classes.FutureWork_imagefirstweb}
                title="Simplify_Remote_Hiring"
                loading="lazy"
                width={"50%"}
                height={"400px"}
              />
            </div>
            <div className={classes.FutureWork_dflex}>
              <img
                src={process.env.PUBLIC_URL + "/assets/Futureworkassets/secondimagemob.jpg"}
                alt="Second_Image_Mob"
                className={classes.FutureWork_imagefirst}
                title="Simplify_Remote_Hiring"
                loading="lazy"
                width={"100%"}
                height={"300px"}
              />
              <img
                src={process.env.PUBLIC_URL + "/assets/Futureworkassets/secondimageweb.jpg"}
                alt="Second_Image_Web"
                className={classes.FutureWork_imagefirstweb}
                title="Simplify_Remote_Hiring"
                loading="lazy"
                width={"50%"}
                height={"400px"}
              />
              <div className={classes.FutureWork_text}>
                Our easy-to-use platform enables you to manage off-balance
                sheet talented workers in a single click with confidence and
                trust so you can save time and focus on your success.
                <div className={classes.FutureWork_borderbottomthird}></div>
              </div>
            </div>
            <div className={classes.FutureWork_bgcolor}>
              <div className={classes.FutureWork_bgcolorwebone}>
                <div className={classes.FutureWork_lastheadingfirst}>
                  Hire the most{" "}
                </div>
                <div className={classes.FutureWork_lastheadingsecond}>
                  Talented Freelancers
                </div>
              </div>
              <div className={classes.ActionButton}>
                {" "}
                <a href={process.env.PUBLIC_URL + "/Step1PAR"} className={classes.PARBtn_Link}>
                  <ActionButton
                    buttonText="Post a Requirement"
                    buttonType={"small"}
                  />
                </a>
              </div>
              <div className={classes.FutureWork_bgcolorwebtwo}>
                {" "}
                <a href={process.env.PUBLIC_URL + "/Step1PAR"} className={classes.PARBtn_Link}>
                  Post a Requirement
                </a>
                <div className={classes.FutureWork_border}> </div>
              </div>
            </div>
          </div>
        </div>
       
      </React.Suspense>
    </>
  );
};
export default FutureWork;
