import classes from './ChowCanWeHelp.module.css'

const ChowCanWeHelp = () =>{


    return(
<div className={classes.mainContainer}> 
<a
                href={"/Step1PAR"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className="linkTag"
              >
<h2 className={classes.heading}> See how we<div> can help you</div> </h2> 
</a>
<div className={classes.pointAndIcons}>
<img className={classes.icons} src={process.env.PUBLIC_URL + "/assets/HomePage/tellUs.svg"} />
<div>
<a
                href={"/Step1PAR"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className="linkTag"
              >
<div className={classes.pointHeading}> Tell us your requirement</div>
</a>

<div className={classes.pointDesc}> Answer a few questions and we’ll connect you with 
verified freelancers ready to work on your terms. </div>
</div> 
</div>



<div className={classes.pointAndIcons}>
<img className={classes.icons} src={process.env.PUBLIC_URL + "/assets/HomePage/smart.svg"} />
<div>
<a
                href={"/Step1PAR"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className="linkTag"
              >
<div className={classes.pointHeading}> Smart Freelancer Matching</div>
</a>

<div className={classes.pointDesc}> Receive top 5 trusted freelancers profiles.You can initiate a free chat to discuss your work. </div>
</div> 
</div>



<div className={classes.pointAndIcons}>
<img className={classes.icons} src={process.env.PUBLIC_URL + "/assets/HomePage/Secure.svg"} />
<div>
<a
                href={"/Step1PAR"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className="linkTag"
              >
<div className={classes.pointHeading}>Connect with the Freelancer
</div>
</a>

<div className={classes.pointDesc}> Select the Freelancer(s) you want to hire, e-sign the NDA, discuss payment terms and timeline.</div>
</div> 
</div>



<div className={classes.pointAndIcons}>
<img className={classes.icons} src={process.env.PUBLIC_URL + "/assets/HomePage/Connect.svg"} />
<div>
<a
                href={"/Step1PAR"}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
                className="linkTag"
              >
<div className={classes.pointHeading}>Secure Payment system
</div>
</a>

<div className={classes.pointDesc}> When you pay, the funds will remain secured for a certain time and released to freelancer automatically.</div>
</div> 
</div>
</div>
    )
}

export default ChowCanWeHelp;