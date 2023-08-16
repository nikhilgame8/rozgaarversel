import React from 'react'
import {  useNavigate } from 'react-router-dom'
import classes from "./ErrorPage.module.css"
import { IoIosArrowBack } from "react-icons/io";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";

const ErrorPage = () => {

  let navigate = useNavigate();


  return (
    <>
     <Helmet>
     <meta name="prerender-status-code" content="404"/>
        <meta charSet="utf-8" />
        <title>{`404 error, This page doesn't exist.`}</title>
        
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
       <div className={classes.MainContainer}>
           <img src={process.env.PUBLIC_URL + "/assets/404ErrorImage.png"} className={classes.BgBox_Image} alt="404_Page_Not_Found_Rozgaar"/>
           <div className={classes.Front_Box}>
             <h1 className={classes.ErrorHeadingMain}>404</h1>
             <h2 className={classes.ErrorHeading}>Page not found</h2>
               <h2 className={classes.Message}>THE PAGE YOU REQUESTED COULD NOT BE FOUND</h2>
               <div className={classes.Btn_Box}>
               <a href={process.env.PUBLIC_URL +"/Step1PAR"}  onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }} className={classes.LinkUrl_Btn}><div className={classes.Btn_SearchJobs} >POST A REQUIREMENT</div></a>
               <div className={classes.Btn_Home} onClick={() => navigate("/")}><IoIosArrowBack /> GO TO HOME</div>
               </div>
           </div>
       </div>
       </React.Suspense>
       </>
  )
}

export default ErrorPage