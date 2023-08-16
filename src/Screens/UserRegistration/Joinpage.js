import React, { useState} from "react";
import classes from "./Joinpage.module.css"
import { useNavigate } from "react-router-dom";
import ActionButton from "../../Components/ActionButton";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import RIModal from "../../Components/RIModal";


const Joinpage = () => {

  const [disable, setDisable] = useState();
  const [modal, setModal] = useState(false);

  let navigate = useNavigate();
  const handleChange = e => {
    const target = e.target;
    if (target.checked) {
      setDisable(target.value);
    }
  };

 
  
  

  return (
    <> <Helmet>
      <meta charSet="utf-8" />
      <title>{`Join | Rozgaar India`}</title>
      <meta
        name="description"
        content={`Join freelance jobs and projects platform.Hire freelancer globally for short or long term work. Make your remote team and save full time employee cost`}

      />
      <link rel="canonical" href="https://www.rozgaarindia.com/join" />
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
        <div className={classes.mainContainer}>
        
          {modal && (
            <RIModal RIModalType={"RedirectFreelancer"} onClick={() => setModal(false)} href={process.env.PUBLIC_URL +"https://freelancer.rozgaarindia.com/signup"} onHrefClick={()=>setModal(false)}/>
          )}
          <div className={classes.Joinpage_header}>
            <h1 className={classes.heading}>Join as a Client or Freelancer</h1>
            <div className={classes.displey_flex}>
              <div className={disable === "client" ? classes.client_join : classes.client_joincolor} onClick={() => setDisable("client")}>
                <input
                  type="radio"
                  id="client"
                  name="check"
                  value="client"
                  checked={disable === 'client'}
                  onChange={handleChange}
                  className={classes.Joinpage_input}
                />
                <div className={classes.Joinpage_flex}>
                  <div> <img src={process.env.PUBLIC_URL + "/assets/Joinpage/Client.png"} alt="Hiring_freelancer_Rozgaar" className={classes.Joinpage_img} /> </div>
                  <div className={classes.Joinpage_text}>I'm a client,<br /> hiring a freelancer</div>
                </div>
              </div>
              <div className={disable === "freelancer" ? classes.client_join : classes.client_joincolor} onClick={() => setDisable("freelancer")}>
                <input
                  type="radio"
                  id="freelancer"
                  name="check"
                  value="freelancer"
                  checked={disable === 'freelancer'}
                  onChange={handleChange}
                  className={classes.Joinpage_input}
                />
                <div className={classes.Joinpage_flex}>
                  <div> <img src={process.env.PUBLIC_URL + "/assets/Joinpage/Freelancer.png"} alt="Looking_freelancer_forjob_Rozgaar" className={classes.Joinpage_imgfreelancer} /> </div>
                  <div className={classes.Joinpage_text}>I'm a freelancer looking for<br /> freelance job and project</div>
                </div>
              </div>
            </div>
            {disable === "freelancer" ?
              <div className={disable === "freelancer" ? classes.ActionButton : classes.ActionButton_disable}>

                <ActionButton
                  buttonText={"Signup as a Freelancer"}
                  buttonType={"small"} onClick={() =>  setModal(true)} />
              </div> :
              <div className={disable === "client" ? classes.ActionButton : classes.ActionButton_disable}>
                <ActionButton
                  buttonText={"Signup as a Client"}
                  buttonType={"small"}
                  onClick={() => navigate("/signup")} />
              </div>
            }

            <div className={classes.last_text}> Already have an account?<span onClick={() => navigate("/login")} className={classes.login}> Log In</span></div>
          </div>
        </div>
      </React.Suspense>
    </>
  );
};
export default Joinpage;