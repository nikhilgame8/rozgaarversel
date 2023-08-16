import React, { useEffect, useState, useRef } from "react";

import classes from "./AboutUs.module.css";
import { Helmet } from "react-helmet";
import Loader from "react-loader-spinner";
import { pageViewTracker } from "../Components/GoogleTracking";
import ActionButton from "../Components/ActionButton";
import RIModal from "../Components/RIModal";




const AboutUs = () => {

  const [modal, setModal] = useState(false);
  useEffect(() => {
    pageViewTracker()

  }, []);



  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`About Us | Rozgaar`}</title>
        <meta
          name="description"
          content={`Our easy-to-use freelancing platform enables you to hire off-balance sheet talented freelancers in a single click with confidence and trust`}

        />
        <link rel="canonical" href="https://www.rozgaarindia.com/about" />
      </Helmet>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({


          }
          )
        }}
      />
      <script type="application/ld+json"

        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Person",
            "name": "Swapnil Chaturvedi",
            "url": "https://www.rozgaarindia.com/",
            "image": "https://www.rozgaarindia.com/ChiefOffier.svg",
            "sameAs": "https://www.linkedin.com/in/swapnil-13835052",
            "jobTitle": "chief operating officer",
            "worksFor": {
              "@type": "Organization",
              "name": "rozgaarindia"
            }

          }
          )
        }}

      />
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
        {modal && (
              <RIModal RIModalType={"RedirectFreelancer"} onClick={() => setModal(false)} href={process.env.PUBLIC_URL +"https://freelancer.rozgaarindia.com/signup"} onHrefClick={()=>setModal(false)}/>
            )}
        <div className={classes.mainTopContainer}>
          <div className={classes.headBg}>
            <div className={classes.colorBoxBg}>
              <div className={classes.bluehead}></div>
              <div className={classes.greyhead}></div>
            </div>
            <div className={classes.headImg}>
              <img src={process.env.PUBLIC_URL +"/ChiefOffier.svg"} className={classes.headImgphotoWeb} alt="Chief_Operating_Officer_RozgaarIndia" title="Chief_Operating_Officer_RozgaarIndia" loading="lazy" width={"100%"} height={"140%"}
              />
              <img src={process.env.PUBLIC_URL +"/ChiefOffier.svg"} className={classes.headImgphotoMob} alt="Chief_Operating_Officer_RozgaarIndia" title="Chief_Operating_Officer_RozgaarIndia" loading="lazy" width={"100%"} height={520}
              />
              <div className={classes.swptextBox}>
                <img src={process.env.PUBLIC_URL +"/assets/AboutUs/entrepreneurLogo.png"} className={classes.logoweb} alt="entrepreneur_Logo" title="entrepreneur_Logo" loading="lazy" width={160} height={60} />
                <div className={classes.swpname}>SWAPNIL CHATURVEDI</div>
                <div className={classes.swpdetailhead}>
                  FOUNDER AND CHIEF OPERATING OFFICER, ROZGAARINDIA.COM &
                  PARTNER, TIMESASCENT.COM
                </div>
                <img src={process.env.PUBLIC_URL +"/assets/AboutUs/entrepreneurLogo.png"} className={classes.logo} alt="entrepreneur_Logo" title="entrepreneur_Logo" loading="lazy" width={160} height={60} />


                <div className={classes.bnnrDetailsHead}>

                  <div className={classes.bnnrparaDetails}>
                    Swapnil completed her Bachelor's degree in International
                    Business from the University of Greenwich - London. She
                    is an accomplished Founder with an established history
                    of working in the digital sector. Currently, Swapnil
                    leads two enterprises: Rozgaarindia and Times Ascent.
                  </div>
                  <div className={classes.redstripeBoxOuter}>
                    <div className={classes.redstripeBox}>
                      <div className={classes.redStripe}></div>
                      <div className={classes.redstripeText}>
                        ENTERPRENEURSHIP DOES NOT REQUIRE A LARGE
                        VOCABULARY; RATHER IT REQUIRES A SIGNIFICANT VISION
                        AND PURPOSE
                      </div>
                    </div>
                    <div className={classes.redstripeBox}>
                      <div className={classes.redStripe}></div>
                      <div className={classes.redstripeText}>
                        THE FUTURE IS FREELANCE. WOMEN THAT GAVE A RELIABLE
                        & SECURE PLATFORM TO EVERY FREELANCER OF THE WORLD!
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className={classes.para_text_container}>
            <h1>
              About Us <br />{" "}
              <span className={classes.theFutureOfWork}>
                {" "}
                The future of work
              </span>
            </h1>
            <h2 className={classes.para_text}>
              Rozgaarindia.com is revolutionizing the way people work. We
              connect the world with talented verified freelancers faster than
              ever before to collaborate, and get work done in a safe and secure
              online environment. Our mission is to simplify freelancers and
              remote hiring providing most aligned freelancers for a day, month
              or a year fulfilling your professional needs. Our easy-to-use
              platform enables you to manage off-balance sheet talented workers
              in a single click with confidence and trust so you can save time
              and focus on your success. We match professional freelancers with
              the top freelancing requirements, making freelance remote work
              more efficient than ever before.
            </h2>
            <h2 className={classes.para_text}>
              In the aftermath of COVID-19, the indian economy is on the verge
              of a radical shift, with unemployment, discontent among employees,
              job switching and new ventures all on the rise. As a result of its
              global adaptability and self-reliant way of life, freelancing has
              progressively become the new work culture in india. A big number
              of job-seeking, self-employed proffessionals in India are already
              embracing freelancing as a way to dicover new ideas and try out
              new work genres. A decade ago, freelancing was considered
              something people did in between jobs or as a way to gain
              qualifications to be hired for a full-time position.This is no
              longer the case. Freelancing today is a career choice and a
              lifestyle preference.This trend is already one of the
              fastest-growing sectors of the economy. However, finding the right
              employer has become a significant challenge for freelancers today.
              To assisst such freelancers and offer them a positive experience
              when seeking work prospects. Swapnil Chaturvedi founded
              Rozgaarindia in 2019, while she is also a Partner at Times Ascent.
              Swapnil is driven by a vision to link th world's talent with
              skilled freelancers more quickly than ever before, enabling
              collaboration and work to be accomplished in a safe and secure
              online environment. Swapnil described her entrepreneurial journey
              and the obstacles she overcome on her route to success in an
              exclusive interaction with Women Entrepreneur.
            </h2>
            <div className={classes.yellowbar}>
              <div className={classes.yellowtitle}>
                Apply to the best freelance projects
              </div>
              <div className={classes.actionBtnContainer}>
                {" "}
                <ActionButton buttonText={"APPLY NOW"} buttonType={"small"} onClick={() =>  setModal(true)} />
              </div>
            </div>
            <ul className={classes.paraContainer}>
              <div>
                <li className={classes.midques}>
                  GIVE US A BRIEF OVERVIEW OF ROZGAARINDIA. WHAT ARE SOME
                  IMPORTANT FEATURES OF YOUR EXPERTISE AS AN ENTERPRENEUR?
                </li>
                <div className={classes.para_text_mid}>
                  Our goal is to make the process of hiring remote workers
                  easier by connecting emplyoers with the best freelancers who
                  can work with them for as little as a day, a month, or a year.
                  Our user-friendly platform enables customers to manage
                  off-balance-sheet talented individuals with confidence and
                  trust with a single click, saving them time and allowing them
                  to concentrate on their success. Furthur, enterpreneurship is
                  a way of life; you must work without regard for the time. It
                  is the ability and willingness to take risks, and because it
                  is not a natural attribute for anyone, I needed to learn to
                  trust myself and simply go for it.Also, for an entreprenur,
                  its important to understand that you will make several errors
                  while establishing your own business, but its also critical to
                  be resolute and not be afraid of making them. With every
                  stride you go ahead in your company, You take one step
                  backward.
                </div>
              </div>
              <div className={classes.imgContainer}>
                <div className={classes.imgParaContainer}>
                  <li className={classes.midques}>
                    WHAT MOTIVATED YOU TO ESTABLISH A COMPANY THAT IS FOCUSED ON
                    REMOTE HIRING, GIG ECONOMY, AND FREELANCE OPPORTUNITES?
                  </li>

                  <div className={classes.para_text_mid}>
                    As a student in London, I never considered launching my own
                    company.Though,I knew,that I needed adaptibilty and
                    independence to be in control of my destiny. For me, Luv
                    Kalra provided the inspiration I needed to begin my
                    enterpreneurial path. When I and MY co-founder Luv worked as
                    freelancers during our undergraduates term in London, we
                    came up with the concept to develop a remote work platform
                    in India. As soon as we arrived back in India, we had one
                    goal in mind: simplifying the work lives.In addition to my
                    dedication and ability to drive innovation, encourage and
                    nurture relationships in the firm, Luv's years of expertise
                    in digital technology and the gig economy lend momentum to
                    the organization
                  </div>
                </div>
                <img
                  src={process.env.PUBLIC_URL + "/assets/AboutUs/girl.jpg"}
                  className={classes.subImg}
                  alt="GIVE_US_A_BRIEF_OVERVIEW_OF_ROZGAARINDIA"
                  title="GIVE_US_A_BRIEF_OVERVIEW_OF_ROZGAARINDIA"
                  loading="lazy"
                  width={270}
                  height={200}
                />
              </div>
            </ul>
            <h2 className={classes.futurecharter}>
              For more on the future of work, sign up for the free Charter
              newsletter.
            </h2>

            <ul className={classes.paraContainer}>
              <div>
                <li className={classes.midques}>
                  TELL US ABOUT THE VARIED EXPERTISE THAT YOU POSSESS IN THE
                  DIGITAL INDUSTRY.HOW HAS YOUR PAST INDUSTRIAL EXPERIENCE
                  HELPED YOU IN YOUR CURRENT ROLE AS THE FOUNDER AT ROZGAARINDIA
                  AND PARTNER AT TIMES ASCENT?
                </li>
                <div className={classes.para_text_mid}>
                  Digital Skills empowered me to launch my own business, and I
                  am now the proud owner of Rozgaarindia, a freelancing
                  platform. Throughout my early years, I worked at organizations
                  that assisted me in developing experience in business growth,
                  human cloud management, business planning and strategic
                  decision-making. Entrepreneurship needs more than being a
                  clever businessperson; it also demands an understanding of the
                  broader technological ecosystem. You must be able to discern
                  where possibilities exist and how you might make a small
                  difference in people's lives. As much as I've worked hard to
                  grow Rozgaarindia, being a member of Times Ascent has helped
                  me become a better business person overall. I've expanded my
                  horizons so that I can take both of my babies to new heights.
                </div>
              </div>
            </ul>

            <div className={classes.bluebar}>
              <div className={classes.bluetitle}>
                Post a requirement for free
              </div>
              <a href={process.env.PUBLIC_URL + "/Step1PAR"} className={classes.actionBtnContainer}
               onClick={() => {
                sessionStorage.setItem("afterAuthRedirectUrl", "/Step1PAR");
                sessionStorage.setItem("goBackRedirectUrl", "/");
              }}
              >
                {" "}
                <ActionButton buttonText={"APPLY NOW"} buttonType={"small"} />
              </a>
            </div>

            <ul className={classes.paraContainer}>
              <div>
                <li className={classes.midques}>
                  WHAT ARE THE VARIOUS ROLES & RESPONSIBILITIES THAT YOU
                  CURRENTLY SHOULDER AT ROZGAARINDIA AND TIMES ASCENT? WHAT ARE
                  SOME OF THE MOST CHALLENGING ASPECTS OF YOUR ROLE AND HOW DO
                  YOU OVERCOME THEM?
                </li>
                <div className={classes.para_text_mid}>
                  As a COO of RozgaarIndia, I am more directly inlvolved in the
                  company's overall strategy and visio. And my responsibilities
                  include identifying new opportunities for expansion,
                  developing comprehensive growth strategies for the firm, and
                  promoting the company's vision. Then, as a Partner at
                  TimesAscent, I am responsible for offering a specialized
                  service in the areas of technology development, product
                  conceptualization, assessment and management of new
                  initiatives that strengthen the market position and support
                  growth.
                </div>
              </div>
              <div className={classes.imgContainer}>
                <div className={classes.imgParaContainer}>
                  <li className={classes.midques}>
                    WHAT HAVE BEEN THE MOST SIGNIFICANT MILESTONES THAT YOU HAVE
                    ACHIEVED SO FAR IN YOUR PROFFESSIONAL JOURNEY? WHAT IS YOUR
                    GUIDING LEADERSHIP PHILOSOPHY?
                  </li>

                  <div className={classes.para_text_mid}>
                    For me, it's always me versus me; I measure my
                    accomplishments by how much better I am doing than I was
                    last year. With so many years of experience, I've developed
                    into an aspirational enterpreneur who is determined not to
                    fail. Regarding the guiding philospher until you have
                    achieved success in your desired career. Enterpreneurship
                    does not require a large vocabulary; rather, it requires a
                    significant vision and purpose. To lead a business, all you
                    need is a brilliant team and a strong drive.
                  </div>
                </div>
                <img
                  src={process.env.PUBLIC_URL + "/assets/AboutUs/meet.jpg"}
                  className={classes.subImg}
                  alt="GIVE_US_A_BRIEF_OVERVIEW_OF_ROZGAARINDIA"
                  title="GIVE_US_A_BRIEF_OVERVIEW_OF_ROZGAARINDIA"
                  loading="lazy"
                  width={270}
                  height={200}
                />
              </div>
              <div className={classes.lastParaContainer}>
                <li className={classes.midques}>
                  AS A SUCCESSFUL ENTERPRENEUR, WHAT WOULD YOUR ADVICE BE TO
                  YOUNG WOMEN AND GIRLS ASPIRING TO BECOME BUSINESS LEADERS AND
                  ENTERPRENEURS IN THE FUTURE?
                </li>

                <div className={classes.para_text_mid}>
                  You must remove the old frameworks that have been set up by
                  society, the ones that are impeding your growth. And if your
                  growth. And if your goal is to succeed; hustle, fail, continue
                  but never stop. Because these are the experiences and memories
                  that you will appreciate for the rest of your life. Also, it
                  is important to know that one can start an enterpreneurial
                  journey whenever they want to acquire skills, and try to
                  improve comprehension. Everything is possible; cultivate this
                  growth mindset - it is what will propel individuals forward in
                  business and life
                </div>
              </div>
            </ul>
          </div>
        </div>


      </React.Suspense>
    </div>
  );
};

export default AboutUs;
