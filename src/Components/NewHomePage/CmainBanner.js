import { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import ActionButton from '../ActionButton';
import RiTextTransition from '../HomeAndLandingPages/RiTextTransition';
import RISkeletonLoading from '../RISkeletonLoading';
import classes from './CmainBanner.module.css'
const CmainBanner = () =>{
  const [loading, setLoading] = useState(true);

  const [bannerList, setBannerList] = useState([])

  useEffect(() => {
   
    Bannerlist()
  }, []);
  const Bannerlist = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "BannerType": "home"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api-preview.rozgaarindia.com/api/freelancerapp/rozgaarapi/BannerImageList", requestOptions)
      .then(response => response.json())
      .then((result) => {
        setBannerList(result.data[0].ImageURL)
      })

      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  }

    return(
      <>
    
        <div className={classes.headingPositionMain}>
         
          <h1 className={classes.headingMain}> HIRE REMOTE     <div className={classes.headingMainSecondPart}>FREELANCERS</div> </h1>
          <div className={classes.animationText}>
            {" "}
            <RiTextTransition />
            <div className={classes.ActionButton}>
              <a
                href={"/Step1PAR"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className={classes.PARBtn_Link}
              >
                {" "}
                <div className={classes.arrowAndButtonTextMain}>
                  <h2>Post a Job for free  </h2>
                  <IoIosArrowForward size={22} />
                </div>

              </a>
              <a
                href={"/freelance-job-posting"}

                className={classes.PARBtn_Link}
              >
                {" "}
                <div className={classes.arrowAndButtonText}>
                  <h2>Freelance Jobs & Projects  </h2>
                  <IoIosArrowForward size={22} />
                </div>

              </a>
            </div>
          </div>
        </div>
        {  loading ? <RISkeletonLoading loadingType={"Main_Banner"}/>:
        <img
          className={classes.MobviewBanner_image}
         src={process.env.PUBLIC_URL + "/assets/banners/CNewMobile.svg"}
          alt="Rozgaar_Service_MarketPlace" 
          loading="lazy"
          title="Rozgaar_Service_MarketPlace"
          width= "100%"
          
        />}
   
      
     
 <div className={classes.mainContainer}> 
<img className={classes.bannerImage} src={process.env.PUBLIC_URL + "/assets/banners/CNewMobile.svg"} />
<div className={classes.mainContent}> Hire Remote <span className={classes.freelancerContent}> Freelancer</span> 

</div>
<div className={classes.textAnimation}>

<RiTextTransition />
</div>
<div className={classes.ActionButton}>
              <a
                href={"/Step1PAR"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className={classes.PARBtn_Link}
              >
                {" "}
                <div className={classes.arrowAndButtonTextMain}>
                  <h2>Post a Job for free  </h2>
                  <IoIosArrowForward size={22} />
                </div>

              </a>
              <a
                href={"/freelance-job-posting"}

                className={classes.PARBtn_Link}
              >
                {" "}
                <div className={classes.arrowAndButtonText}>
                  <h2>Freelance Jobs & Projects  </h2>
                  <IoIosArrowForward size={22} />
                </div>

              </a>
            </div>



    </div> 
    </>
    )
}

export default CmainBanner;