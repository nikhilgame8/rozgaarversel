import React from "react";
import classes from "./HowToHireSec.module.css";

const HowToHireSec = () => {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.firstContentDiv}>
        <div className={classes.firstSerial}>01</div>
        <div className={classes.contentInnerDiv}>
          <h3 className={classes.contentHeading}>
            Post a hiring requirement{" "}
          </h3>
          <div className={classes.firstParagraph}>
            {" "}
            Fill our quick and easy form to describe the hiring requirement
            you’ve got in mind. The more detail you can give, the more relevant
            freelancers you’ll attract. Best five freelancers will apply with
            their proposal. Review proposals, pick your freelancer and pay to
            hire the freelancer.
          </div>
        </div>
      </div>

      <div className={classes.firstContentDiv}>
        <div className={classes.contentInnerDiv}>
          <h3 className={classes.contentHeadingSecond}>
            Discover incredible freelancers
          </h3>
          <div className={classes.secondParagraph}>
            Once your requirement post is Live, our artificial intelligence
            system does the hard work- matching the best five freelancers for
            your requirement. Each freelancer then responds with their own
            proposal. Review and compare freelancers profile, work history,
            portfolio and If you do not like any out of the five, Unlock the
            ones in the waitlist.
          </div>
        </div>
        <div className={classes.secondSerial}>02</div>
      </div>

      <div className={classes.firstContentDiv}>
        <div className={classes.thirdSerial}>03</div>
        <div className={classes.contentInnerDiv}>
          <h3 className={classes.contentHeading}>Review proposals</h3>
          <div className={classes.firstParagraph}>
            {" "}
            Compare received proposals and connect with the freelancers to
            discuss your project details. Accept the proposal that best suits
            your project and begin collaborating instantly by paying on the
            platform. If you choose to pay outside rozgaarinaia, please make
            sure its at your own risk.
            <br />
            <br />
            Important! We highly recommend securing your work discussion with
            the freelancer with a Non Disclosure Agreement which binds the
            freelancer to not to share your project details with anyone.
          </div>
        </div>
      </div>

      <div className={classes.firstContentDiv}>
        <div className={classes.contentInnerDiv}>
          <h3 className={classes.contentHeadingSecond}>Communicate freely</h3>
          <div className={classes.secondParagraph}>
            Communicating with the freelancer on mails/calls/messages can be a
            full time job, that's why we built Rozgaar Chat — our secret tool to
            keep every project organised keeping all communications and details
            at one place. Receive proposals, share files, payments and feedback
            all from the same space. Receive real-time notifications, track
            freelancer progress and revisit your chat history. Managing a
            freelancer has never been easier.
          </div>
        </div>
        <div className={classes.fourthSerial}>04</div>
      </div>
      <div className={classes.firstContentDiv}>
        <div className={classes.thirdSerial}>05</div>
        <div className={classes.contentInnerDiv}>
          <h3 className={classes.contentHeading}>Pay freelancers securely</h3>
          <div className={classes.firstParagraph}>
            Review proposal and make payments through our secure payment system.
            You can pay the freelancer as and when required. In order to give
            hiring confirmation to the freelancer, we suggest paying some
            deposit to the freelancer so he can start the work. Any work or
            payment you do outside rozgaarindia is at your own risk.
          </div>
        </div>
      </div>
      <div className={classes.firstContentDiv}>
        <div className={classes.contentInnerDiv}>
          <h3 className={classes.contentHeadingSecond}>
            Rate your freelancer
          </h3>
          <div className={classes.secondParagraph}>
            We take the quality of our freelancers very seriously. That’s why
            leaving your feedback after a project is so important to us and the
            freelancer. Reward your freelancer for their hard work — give them a
            rating, write a review and share your experience. Your feedback
            makes a huge difference.
          </div>
        </div>
        <div className={classes.fourthSerial}>06</div>
      </div>
    </div>
  );
};

export default HowToHireSec;
