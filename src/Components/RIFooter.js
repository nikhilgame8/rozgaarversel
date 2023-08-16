import React, { useState } from "react";
import classes from "./RIFooter.module.css";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import {
  AiOutlineInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { GrLinkedinOption } from "react-icons/gr";
import { FaFacebookF } from "react-icons/fa";
import RIModal from "./RIModal";



const RIFooter = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <div className={classes.footer_container}>
    
            {modal && (
               <RIModal RIModalType={"RedirectFreelancer"} onClick={() => setModal(false)} href={process.env.PUBLIC_URL +"https://freelancer.rozgaarindia.com/signup"} onHrefClick={()=>setModal(false)}/>
            )}
           
      <div className={classes.mob_view}>
        {!showAbout ? (
          <div className={classes.footer_top}>
            <div className={classes.footer_contact}>
              <button
                onClick={() => setShowAbout(true)}
                className={classes.plus_iconText}
              >
                {" "}
                COMPANY
              </button>
              <button
                onClick={() => setShowAbout(true)}
                className={classes.plus_icon}
              >
                {" "}
                <BiPlus />
              </button>
            </div>
          </div>
          ) : (
          <>
            <div className={classes.footer_top}>
              <div className={classes.footer_contact}>
                <button
                  onClick={() => setShowAbout(false)}
                  className={classes.plus_iconText}
                >
                  {" "}
                  COMPANY
                </button>
                <button
                  onClick={() => setShowAbout(false)}
                  className={classes.plus_icon}
                >
                  {" "}
                  <BiMinus />
                </button>
              </div>
            </div>
            <div className={classes.aboutUs_list}>
              <a href={process.env.PUBLIC_URL +"/about"} className={classes.Footer_Link}>
                <div className={classes.list_open}>About</div>
              </a>
              <a href={process.env.PUBLIC_URL +"/freelance-job-posting"} className={classes.Footer_Link}>
                <div className={classes.list_open}>Freelance Jobs and Projects</div>
              </a>
              <a
                href={process.env.PUBLIC_URL +"/Step1PAR"}
                className={classes.Footer_Link}
                onClick={() => {
                  sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                  sessionStorage.setItem("goBackRedirectUrl", "/");
                }}
               
              >
               
                <div className={classes.list_open}>Hire a Freelancer</div>
              </a>
              <a href={process.env.PUBLIC_URL +"/how-to-hire-freelancer"} className={classes.Footer_Link}>
                <div className={classes.list_open}>How it Works</div>
              </a>
              <a href={process.env.PUBLIC_URL +"/skills"} className={classes.Footer_Link}>
                <div className={classes.list_open}>Explore Skills</div>
              </a>

              
              <a href={process.env.PUBLIC_URL +"/enterprise-freelancer-hiring-solution"} className={classes.Footer_Link}>
                <div className={classes.list_open}>Corporate Bulk Hire</div>
              </a>
             
              
              <div onClick={()=>setModal(true)} className={classes.Footer_Link} >
                <div className={classes.list_open}>Signup as a Freelancer</div>
              </div>
             
              <a href={process.env.PUBLIC_URL +"/free-job-alert"} className={classes.Footer_Link}>
                <div className={classes.list_open}>Free job Alert</div>
              </a>
              <a href={"https://www.sasone.in"} className={classes.Footer_Link} target={"_blank"}>
                <div className={classes.list_open}>SAS ONE</div>
              </a>
            </div>
            <div className={classes.BottomBorder}></div>
          </>
        )}
        {!showPolicies ? (
          <div className={classes.footer_top}>
            <div className={classes.footer_contact}>
              <button
                onClick={() => setShowPolicies(true)}
                className={classes.plus_iconText}
              >
                {" "}
                POLICIES
              </button>
              <button
                onClick={() => setShowPolicies(true)}
                className={classes.plus_icon}
              >
                {" "}
                <BiPlus />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={classes.footer_top}>
              <div className={classes.footer_contact}>
                <button
                  onClick={() => setShowPolicies(false)}
                  className={classes.plus_iconText}
                >
                  {" "}
                  POLICIES
                </button>
                <button
                  onClick={() => setShowPolicies(false)}
                  className={classes.plus_icon}
                >
                  {" "}
                  <BiMinus />
                </button>
              </div>
            </div>
            <div className={classes.aboutUs_list}>
              <a href={process.env.PUBLIC_URL +"/terms"} className={classes.Footer_Link}>
                <div className={classes.list_open}>Terms & Conditions</div>
              </a>

              <a href={process.env.PUBLIC_URL +"/privacy-policy"} className={classes.Footer_Link}>
                {" "}
                <div className={classes.list_open}>Privacy Policy</div>
              </a>
              <a href={process.env.PUBLIC_URL +"/employer-faq"} className={classes.Footer_Link}>
                <div className={classes.list_open}>FAQ's</div>
              </a>
              <a
              href={process.env.PUBLIC_URL +"/sitemap.xml"}
              target="_blank"
              className={classes.list_open}
            >
              Site Map
 </a>
          
              
            </div>
            <div className={classes.BottomBorder}></div>
          </>
        )}
        {!showContactUs ? (
          <div className={classes.footer_top}>
            <div className={classes.footer_contact}>
              <button
                onClick={() => setShowContactUs(true)}
                className={classes.plus_iconText}
              >
                {" "}
                CONTACT
              </button>
              <button
                onClick={() => setShowContactUs(true)}
                className={classes.plus_icon}
              >
                {" "}
                <BiPlus />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={classes.footer_top}>
              <div className={classes.footer_contact}>
                <button
                  onClick={() => setShowContactUs(false)}
                  className={classes.plus_iconText}
                >
                  {" "}
                  CONTACT
                </button>
                <button
                  onClick={() => setShowContactUs(false)}
                  className={classes.plus_icon}
                >
                  {" "}
                  <BiMinus />
                </button>
              </div>
            </div>
            <div className={classes.aboutUs_list}>
              <a href={process.env.PUBLIC_URL +"/customer-support"} className={classes.Footer_Link}>
                <div className={classes.list_open}>Help & Support</div>
              </a>

              <a href={process.env.PUBLIC_URL +"/customer-support"} className={classes.Footer_Link}>
                {" "}
                <div className={classes.list_open}>Career</div>
              </a>
              <a href={process.env.PUBLIC_URL +"/customer-support"} className={classes.Footer_Link}>
                {" "}
                <div className={classes.list_open}>Partners</div>
              </a>
              <a href={process.env.PUBLIC_URL +"/customer-support"} className={classes.Footer_Link}>
                {" "}
                <div className={classes.list_open}>Advertisement</div>
              </a>
              <a href={process.env.PUBLIC_URL +"/feedback-complaint"} className={classes.Footer_Link}>
                <div className={classes.list_open}>Report A Bug</div>
              </a>
              <a href={process.env.PUBLIC_URL +"/customer-support"} className={classes.Footer_Link}>
                <div className={classes.list_open}>Feedback</div>
              </a>
             
            </div>
            <div className={classes.BottomBorder}></div>
          </>
        )}
        <div className={classes.aboutUs_list}>
          <img
            src= {process.env.PUBLIC_URL + "/assets/IPassets/RozgaarWhiteLogo.svg"}
            alt="Rozgaar_India_Logo"
            className={classes.riLogo}
            width={"150px"}
            height={"80px"}
            title="Rozgaar_India_Logo"
            loading="lazy"
          />
          <div>
            <div>Follow Us</div>
          </div>
          <div className={classes.social_icons}>
            <a
              href={process.env.PUBLIC_URL +"https://www.facebook.com/HireFreelancersRemotely"}
              className={classes.icons_web_Link}
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              <FaFacebookF className={classes.icons_web} />
            </a>
            <a
              href={process.env.PUBLIC_URL +"https://www.instagram.com/accounts/login/?next=/rozgaar_india/"}
              className={classes.icons_web_Link}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              <AiOutlineInstagram className={classes.icons_web} />
            </a>
            <a
              href={process.env.PUBLIC_URL +"https://twitter.com/RozgaarI"}
              className={classes.icons_web_Link}
              target="_blank"
              rel="noopener"
              aria-label="Twitter"
            >
              <AiOutlineTwitter className={classes.icons_web} />
            </a>
            <a
              href={process.env.PUBLIC_URL +"https://www.youtube.com/channel/UCyeAcFCvAo4ZVdUfpBrn4hQ"}
              className={classes.icons_web_Link}
              target="_blank"
              rel="noopener"
              aria-label="Youtube"
            >
              <AiFillYoutube alt="" className={classes.icons_web} />
            </a>
            <a
              href={process.env.PUBLIC_URL +"https://www.linkedin.com/authwall?trk=gf&trkInfo=AQFYH0Ik6vc73wAAAX8_jAPY2W4EF1cWECFh7PsI0_N2J2C3-ks5Dqhi1D56w8w5YR9DBzZBXBU2y1nuJGdpfoKW_2GJ1e1l6Pb8FhU_F70xYAvLujfYFLsD5k1D9sKkcgYxeDc=&originalReferer=https://rozgaarindia.com/&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Frozgaar-india"}
              className={classes.icons_web_Link}
              target="_blank"
              rel="noopener"
              aria-label="Linkedin"
            >
              <GrLinkedinOption alt="" className={classes.icons_web} />
            </a>
          </div>
        </div>

        <div className={classes.all_rights}>
          © SAS One {new Date().getFullYear()}. All Rights Reserved
        </div>
      </div>
      <div className={classes.web_view_container}>
        <div className={classes.web_view}>
          <div className={classes.aboutUs_list_web}>
            <div className={classes.haedingName}>COMPANY</div>


            <a href={process.env.PUBLIC_URL +"/about"} className={classes.Footer_Link}>
              <div className={classes.list_open}>About Us</div>
            </a>
             <a href={process.env.PUBLIC_URL +"/freelance-job-posting"} className={classes.Footer_Link}>
                <div className={classes.list_open}>Freelance Jobs and Projects</div>
              </a>
            <a href={process.env.PUBLIC_URL +"/Step1PAR"} 
               onClick={() => {
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
              }} className={classes.Footer_Link}>
              <div className={classes.list_open}>Hire a Freelancer</div>
            </a>
            <a href={process.env.PUBLIC_URL +"/how-to-hire-freelancer"} className={classes.Footer_Link}>
              <div className={classes.list_open}>How it Works</div>
            </a>
           

            <a href={process.env.PUBLIC_URL +"/skills"} className={classes.Footer_Link}>
              <div className={classes.list_open}>Explore skills</div>
            </a>
            <a href={process.env.PUBLIC_URL +"/enterprise-freelancer-hiring-solution"} className={classes.Footer_Link}>
              <div className={classes.list_open}>Corporate Bulk Hire</div>
            </a>
            <div onClick={()=>setModal(true)} className={classes.Footer_Link} >
              <div className={classes.list_open}>Signup as a Freelancer</div>
            </div>
            <a href={process.env.PUBLIC_URL +"/free-job-alert"} className={classes.Footer_Link}>
                <div className={classes.list_open}>Free job Alert</div>
              </a>
              <a href={"https://www.sasone.in"} className={classes.Footer_Link} target="_blank">
                <div className={classes.list_open}>SAS ONE</div>
              </a>
          





          </div>
          <div className={classes.aboutUs_list_web}>
            <div className={classes.haedingName}>POLICIES</div>
            <a href={process.env.PUBLIC_URL +"/terms"} className={classes.Footer_Link}>
              <div className={classes.list_open}>Terms & Conditions</div>
            </a>

            <a href={process.env.PUBLIC_URL +"/privacy-policy"} className={classes.Footer_Link}>
              <div className={classes.list_open}>Privacy Policy</div>
            </a>
            <a href={process.env.PUBLIC_URL +"/employer-faq"} className={classes.Footer_Link}>
              <div className={classes.list_open}>FAQ's</div>
            </a>
            <a
              href={process.env.PUBLIC_URL +"/sitemap.xml"}
              target="_blank"
              className={classes.sitemapText}
            >
              Site Map
 </a>
          


          </div>

          <div className={classes.aboutUs_list_web}>
            <div className={classes.haedingName}>CONTACT</div>
            <a href={process.env.PUBLIC_URL +"/customer-support"} className={classes.Footer_Link}>
              <div className={classes.list_open} onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>Help & Support</div>
            </a>

            <a href={process.env.PUBLIC_URL +"/customer-support"} className={classes.Footer_Link}>
              {" "}
              <div className={classes.list_open} onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>Career</div>
            </a>
            <a href={process.env.PUBLIC_URL +"/feedback-complaint"} className={classes.Footer_Link}>
              <div className={classes.list_open}>Report A Bug</div>
            </a>
            <a href={process.env.PUBLIC_URL +"/customer-support"} className={classes.Footer_Link}>
              <div className={classes.list_open} onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>Partnership</div>
            </a>
            <a href={process.env.PUBLIC_URL +"/customer-support"} className={classes.Footer_Link}>
              <div className={classes.list_open} onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>Advertisement</div>
            </a>
            <a href={process.env.PUBLIC_URL +"/customer-support"} className={classes.Footer_Link}>
              <div className={classes.list_open} onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>Feedback</div>
            </a>
            <a href={process.env.PUBLIC_URL +"/writeforus"} className={classes.Footer_Link}>
              <div className={classes.list_open} onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>Write for us</div>
            </a>
            

          </div>
        </div>

        <div className={classes.footer_bottom}>
          <img
             src= {process.env.PUBLIC_URL + "/assets/IPassets/RozgaarWhiteLogo.svg"}
            alt="Rozgaar_India_Logo"
            className={classes.riLogo_web}
            width={"150px"}
            height={"70px"}
            loading="lazy"
            title="Rozgaar_India_Logo"
          />
          <div>© SAS One {new Date().getFullYear()}. All Rights Reserved</div>
          <div className={classes.social_icons_web}>
            <div className={classes.followUsText}>Follow us :&nbsp;</div>
            <a
              href={process.env.PUBLIC_URL +"https://www.facebook.com/HireFreelancersRemotely"}
              className={classes.icons_web_Link}
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              <FaFacebookF className={classes.icons_web} />
            </a>
            <a
              href={process.env.PUBLIC_URL +"https://www.instagram.com/accounts/login/?next=/rozgaar_india/"}
              className={classes.icons_web_Link}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              <AiOutlineInstagram className={classes.icons_web} />
            </a>
            <a
              href={process.env.PUBLIC_URL +"https://twitter.com/RozgaarI"}
              className={classes.icons_web_Link}
              target="_blank"
              rel="noopener"
              aria-label="Twitter"
            >
              <AiOutlineTwitter className={classes.icons_web} />
            </a>
            <a
              href={process.env.PUBLIC_URL +"https://www.youtube.com/channel/UCyeAcFCvAo4ZVdUfpBrn4hQ"}
              className={classes.icons_web_Link}
              target="_blank"
              rel="noopener"
              aria-label="Youtube"
            >
              <AiFillYoutube alt="" className={classes.icons_web} />
            </a>
            <a
              href={process.env.PUBLIC_URL +"https://www.linkedin.com/authwall?trk=gf&trkInfo=AQFYH0Ik6vc73wAAAX8_jAPY2W4EF1cWECFh7PsI0_N2J2C3-ks5Dqhi1D56w8w5YR9DBzZBXBU2y1nuJGdpfoKW_2GJ1e1l6Pb8FhU_F70xYAvLujfYFLsD5k1D9sKkcgYxeDc=&originalReferer=https://rozgaarindia.com/&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Frozgaar-india"}
              className={classes.icons_web_Link}
              target="_blank"
              rel="noopener"
              aria-label="Linkedin"
            >
              <GrLinkedinOption alt="" className={classes.icons_web} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RIFooter;
