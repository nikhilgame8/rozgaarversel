import React, { useState, useEffect } from "react";
import classes from "./FrequentlyAskedQuestions.module.css";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import Faqdropdown from "../FrequentlyAskedQuestions/Faqdropdown";
import { pageViewTracker } from "../../Components/GoogleTracking";
import RISkeletonLoading from "../../Components/RISkeletonLoading";
const ActionButton = React.lazy(() => import("../../Components/ActionButton"));

const FrequentlyAskedQuestions = () => {
  const [show, setShow] = useState();
  const [Data, setData] = useState([]);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    FrequentlyAskedQuestions();
    pageViewTracker();
  }, []);

  const FrequentlyAskedQuestions = () => {
    setIsLoading(true)
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Question: question,
      Answer: answer,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/GetFaq", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false)
      });
  };


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Frequently Asked Questions about Freelance Jobs  | Rozgaar India`}</title>
        <meta
          name="description"
          content={`Read the Freelancer FAQ's to learn everything about Freelancing, freelance projects, remote work, contract work and gigs.`}

        />
        <link rel="canonical" href="https://www.rozgaarindia.com/employer-faq" />
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

            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How to signup?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To find the best freelancers for your work, signup and post a requirement Simply, Click on,www.rozgaarindia.com/signup Click on sign-up button on top right corner.  Fill in your basic details and click on Submit Button.Or You can signup via gmail or facebook account."
                }
              },
              {
                "@type": "Question",
                "name": "How to post a hiring requirement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Simply,  Click on Post a Requirement, follow the steps and get Quotes from Freelancers within hours Receive prioritised batches of top freelancer profiles and stop wasting your time sorting hundreds of applicants.  Connect, Collaborate, Pay and Get work done in a secure environment.We recommend to take most suited add-ons to attract more Quotes from top quality Freelancers and get up to 50% more Quotes. For more details please go to http://rozgaarindia.com/HowToHire"
                }
              },
              {
                "@type": "Question",
                "name": "What is Rozgaar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We simplify remote hiring providing most aligned freelancers for a day, month or a year fulfilling your professional needs.  Post a Requirement and receive prioritised batches of profiles so that you can stop wasting your time sorting hundreds of applicants and connect, collaborate, pay and get work done in a secure environment.Our easy-to-use platform enables you to manage off-balance sheet talented workers in a single click with confidence and trust so you can save time and focus on your success."
                }
              },
              {
                "@type": "Question",
                "name": "I want to Hire freelancers in bulk?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Simply, Click on Post a Requirement and follow the steps.  Be as descriptive as possible so we can understand your requirement and connect you with the relevant team  For details visit http://rozgaarindia.com/bulkhiring"
                }
              },
              {
                "@type": "Question",
                "name": "How to contact the freelancer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can contact the freelancers who have applied on your requirement through Rozgaar india Chat. You can also connect with the freelancer via call, if the freelancer has provided his details.   Please Note: We suggest to connect,pay and hire the freelancer(s) on the platform so we can assist you in case you need assistance. Any hiring related proceedures shared or done outside the rozgaarindia platform, in such cases, our team wont be able to help you."
                }
              },
              {
                "@type": "Question",
                "name": "How to hire the selected freelancer to start the work ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Review proposals, compare and hire the best Freelancers. Evaluate proposals that you receive from Freelancers and review their Profile for their performance, feedback, portfolio and earnings. Mutually establish the the Payment terms, scope of work and job deliverables. Pay & Hire in One Click  We encourage you to pay your freelancers on our platform in order to assure maximum safety of your payments. "
                }
              },
              {
                "@type": "Question",
                "name": "How do I pay the freelancer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Review proposal and make payments securely on rozgaarindia platform We encourage you to pay your freelancers on our platform in order to assure maximum safety of your payments.  We release payment to the freelancer within 7 days of payment and Premium freelancers get payments within 24 hours of the payment is made. Note: Any work or payment you do outside rozgaarindia is at your own risk. We do not recommend making upfront payments to Freelancers."
                }
              },
              {
                "@type": "Question",
                "name": "What payment methods are accepted while paying the freelancers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We accept all major  Credit Cards Debit Cards  Net Banking Wallets  If you're outside India, please use Credit Card while making the payment to freelancer    Note: Any work or payment you do outside rozgaarindia is at your own risk.We do not recommend making upfront payments to Freelancers."
                }
              },
              {
                "@type": "Question",
                "name": "Can I pay the freelancer in installments?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In order to pay the freelancer in parts, please speak to the freelancer agree to mutual understanding for payments.  You can pay the freelancer as and whenrequired or when freelancer requests for payment.   For hiring confirmation, we recommend paying some upfront amount to the freelancer so he can start the work."
                }
              },
              {
                "@type": "Question",
                "name": "What are add-ons?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We recommend opting for add-ons while posting a requirement as it increase the post reach and serves deeper benefits. Featured your post - You can feature your post on top of the page in order to highlight it and attract most relevant and finer freelancers.  Urgent - You can mark a project as urgent in order to let your freelancer know that the project is urgent so only those freelancers who can fulfil your work urgently will apply. NDA - Non Disclosure Agreement(NDA) is an agreement between Client and Freelancer in which freelancer agrees not to disclose the details of the project to anyone accept the client for a specific period of time mention in the agreement. It is a must add-on to take. Project Manager - Hire a Project Manager who will assist you in hiring process and help you communicate with the freelancer."
                }
              },
              {
                "@type": "Question",
                "name": "How can i hire an assistant and what are its benefits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Rozgaar personal assistant can be hired for performing certain task for you including understanding your hiring requirement, posting a requirement,  selecting top freelancer for the task and stay in touch with you with regular work update.  Signup and take benefit of this feature"
                }
              },
              {
                "@type": "Question",
                "name": "What is an NDA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Non Disclosure Agreement(NDA) is an agreement between Client and Freelancer in which freelancer agrees not to disclose the details of the project to anyone accept the client for a specific period of time mention in the agreement.  We highly recommend choosing NDA while posting a requirement so your business idea and work is secure."
                }
              },
              {
                "@type": "Question",
                "name": "What type of freelancers you can find here?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You Can Hire Freelancers for  One Time Task Hire Freelancers for one-time gig work Example-  Looking for a graphic designer to create a logo for my startup I want a product demo video of beauty products for youtube Monthly Basis Hire freelancers continuous monthly term Example-  I want a graphic designer to design social media posts everyday for 2 months I want a data entry expert to work for a insurance company Contract Work Hire for a short-term or a long-term project Example- Need a react website developer to work on an e-commerce project Looking for customer service agents to provide call support to clients On Commission Hire freelancer for commission basis Example-  We are looking for a POS agents for providing verified leads Hiring sales agents to promote app downloads with KYC"
                }
              }
            ]


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
        <div className={classes.faq_question_mainhead}>
          <div className={classes.faq_head}>
            <h1 className={classes.faq_firstheading}>
              Frequently asked questions
            </h1>
            <div className={classes.faq_secondheading}>
              Everything you need to know on posting requirement and hiring,
              signup, selecting the right freelancer, and releasing your
              payments.
            </div>
            {isLoading ? <div className={classes.faq_SkeletonLoading}>
              <RISkeletonLoading loadingType={"FAQ"} />
            </div> :
              <div className={classes.faq_padding}>
                {Data.slice(0, show ? show.length : 5).map((item, value) => {
                  return (
                    <Faqdropdown question={item.Question} answer={item.Answer} />
                  );
                })}
              </div>}

            <div className={classes.faq_ActionButton}>
              {!show ? (
                <ActionButton
                  buttonText={"View More"}
                  buttonType={"small"}
                  onClick={() => setShow(true)}
                />
              ) : (
                <ActionButton
                  buttonText={"View less"}
                  buttonType={"small"}
                  onClick={() => setShow(false)}
                />
              )}
            </div>
          </div>
        </div>

      </React.Suspense>
    </>
  );
};
export default FrequentlyAskedQuestions;
