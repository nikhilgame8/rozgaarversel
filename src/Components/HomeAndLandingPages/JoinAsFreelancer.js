
import React, { useState,useRef } from "react";
import ActionButton from '../ActionButton';
import classes from './JoinAsFreelancer.module.css'


const JoinAsFreelancer = (props) => {

    

    return (
      
         
       
        <div className={classes.mainContainer}>


            <div className={classes.bannerContent}>
                <div className={classes.firstHeading}> Becoming a freelancer takes only a few clicks</div>
                <h2 className={classes.secondHeading}> Work as a Freelancer</h2>

                <div className={classes.ActionButton}>
                    <div onClick={props.onClick} className={classes.PARBtn_Link} target="_blank"> <ActionButton buttonText="Join Now" /></div>
                </div>
            </div>
            <img src={process.env.PUBLIC_URL +  "/assets/banners/Client_Web_banner _Rozgaar.webp"} alt="Work_As_A_Freelancer_Rozgaar" className={classes.imageBanner} title="Work_As_A_Freelancer_Rozgaar" loading='lazy' width={"100%"} height={"415px"}/>
            <img src={process.env.PUBLIC_URL +  "/assets/banners/FreelancerBanner_mob.jpg"} alt="Work_As_A_Freelancer_Rozgaar" className={classes.imageBannermob} title="Work_As_A_Freelancer_Rozgaar" loading='lazy' width={"100%"} height={"350px"}/>
        </div>


    )

}

export default JoinAsFreelancer;