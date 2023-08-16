import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./PrivacyPolicy.module.css";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { pageViewTracker } from "../../Components/GoogleTracking";


const PrivacyPolicy = () => {
  useEffect(() => {
    pageViewTracker()

}, []);
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>{`Privacy Policy | Rozgaar India`}</title>
        <meta
          name="description"
          content={`Rozgaar India is committed to respect and protect your privacy. We value you as a customer and take your personal privacy very seriously.`}
       
       />

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
        <div className={classes.privacy_container}>
          <div className={classes.top_link}>
            <a href={process.env.PUBLIC_URL +"/"} className={classes.home_link}>
              Home
            </a>{" "}
            /{" "}
            <span className={classes.home_linkTerm}>
              Privacy Policy
            </span>
            
          </div>
          <h1 className={classes.privacy_heading}>Privacy Policy</h1>
          <div className={classes.privacy_para}>
            Rozgaar India provides this Privacy Policy to let you know our
            policies and procedures regarding the collection, use and disclosure
            of information through www.rozgaarindia.com(the Site), and any other
            websites, features, applications, widgets or online services that
            are owned or controlled by Rozgaar India and that post a link to
            this Privacy Policy (together with the Site, the Service), as well
            as any information Rozgaar India collects offline in connection with
            the Service. It also describes the choices available to you
            regarding the use of, your access to, and how to update and correct
            your personal information. Note that we combine the information we
            collect from you from the Site, through the Service generally, or
            offline.
          </div>
          <div className={classes.privacy_para}>
            Rozgaar India is committed to respect and protect your privacy. We
            value you as a customer and take your personal privacy very
            seriously. In the course of registration with us, we may collect
            certain personal information that we understand may be considered
            confidential. We are therefore providing this Privacy Policy to
            explain our practices & policies for collecting, using & sharing
            information collected about us from you.
          </div>
          <h2 className={classes.boldText}>1.INFORMATION COLLECTION</h2>
          <div className={classes.privacy_para}>
            Users of the Service may be Clients, Companies or Agencies(as each
            is defined in the User Agreement).
          </div>

          <h3 className={classes.boldText}>Information You Provide to Us</h3>
          <ul>
            <li className={classes.ordered_li}>
              <span className={classes.boldText}>Personal Information:</span> In
              the course of using the Service (whether as a Seller or Buyer), we
              may require or otherwise collect information that identifies you
              as a specific individual and can be used to contact or identify
              you("Personal Information"). Examples of Personal Information
              include your name, email address, company address, billing address
              and phone number.
            </li>
            <li className={classes.ordered_li}>
              <span className={classes.boldText}>Payment Information:</span> If
              you use the Service to make or receive payments, we will also
              collect certain payment information, such as credit card, debit
              card or other financial account information, and billing address.
              The information is collected via authorized payment gateways and
              e-wallets.
            </li>
            <li className={classes.ordered_li}>
              <span className={classes.boldText}>Identity Verification:</span>{" "}
              We may collect Personal Information, such as your date of birth or
              taxpayer permanent account number (PAN), Aadhar card number and/or
              any other photo id or address proof, to validate your identity or
              as may be required by law. We may request documents to verify this
              information, such as a copy of your government-issued
              identification or photo or a billing statement, bank statement or
              a cancelled cheque.
            </li>
            <li className={classes.ordered_li}>
              <span className={classes.boldText}>Payment Information:</span> If
              you use the Service to make or receive payments, we will also
              collect certain payment information, such as credit card, debit
              card or other financial account information, and billing address.
              The information is collected via authorized payment gateways and
              e-wallets.
            </li>
            <li className={classes.ordered_li}>
              <span className={classes.boldText}>
                Non-Identifying Information/Usernames:{" "}
              </span>
              We also may collect other information, such as zip codes,
              demographic data, information regarding your use of the Service,
              and general project-related data
              <span className={classes.boldText}>
                {" "}
                ("Non-Identifying Information").
              </span>{" "}
              We may aggregate information collected from Rozgaar India
              registered and non-registered users (Rozgaar India Users). We
              consider usernames to be Non-Identifying Information. Usernames
              are made public through the Service and are viewable by other
              Rozgaar India Users.
            </li>
            <li className={classes.ordered_li}>
              In some cases, we may render Personal Information (generally,
              email address) into a form of Non-Identifying Information referred
              to in this Privacy Policy as Hashed Information. This is typically
              accomplished using a mathematical process{" "}
              <span className={classes.boldText}>
                (commonly known as a hash function){" "}
              </span>
              to convert information into a code. The code does not identify you
              directly, but it may be used to connect your activity and
              interests.
            </li>
            <li className={classes.ordered_li}>
              <span className={classes.boldText}>Social networks- </span>When
              you register through your social network account (Facebook or
              Google), we access to basic information from your social network
              account, such as your name, birthdate, profile picture and
              friends' list, as well as information you made publicly available
              on such account. In addition, when using the Services, you may be
              able via your social network to "Invite a Friend" to use the
              Services. Should the person accept your invitation, we may obtain
              Personal Information from him/her such as: name, email address,
              phone number and date of birth. We will use the Personal
              Information for the purposes set out herein and disclose such
              information only to third parties as detailed in this Privacy
              Policy.
            </li>
            <li className={classes.ordered_li}>
              <span className={classes.boldText}>
                Combination of Personal and Non-Identifying Information:
              </span>{" "}
              Certain Non-Identifying Information would be considered a part of
              your Personal Information if it were combined with other
              identifiers in a way that enables you to be identified (for
              example, combining information with your name). But the same
              pieces of information are considered Non-Identifying Information
              when they are taken alone or combined only with other
              non-identifying information (for example, your viewing
              preferences). We may combine your Personal Information with
              Non-Identifying Information, but Rozgaar India will treat the
              combined information as Personal Information.
            </li>
            <li className={classes.ordered_li}>
              <span className={classes.boldText}>
                Collection of the Third Party Personal Information:
              </span>{" "}
              We collect the following personal information from you about your
              contacts or friends: First name, last name, and email address when
              you provide it to us for the purpose of adding your contacts to a
              message room.
            </li>
          </ul>

          <div className={classes.privacy_para}>
            You do not have a statutory obligation to provide us with any
            information, but you may have a contractual obligation to do so, and
            if we do not receive certain information from you, then we will not
            be able to provide our Service to you. If you have any questions
            regarding whether provision of information is mandatory and the
            consequences for withholding such information, please contact us
            using the contact information.
          </div>
          <h2 className={classes.boldText}>User Profiles</h2>
          <div className={classes.privacy_para}>
            Sellers may create a profile, with certain or all information
            publicly available. Clients and Agencies may also create
            organization profiles.
          </div>
          <div className={classes.privacy_para}>
            The User is bound to disclose correct credentials and provide
            correct information and details to the Company. In Case any false
            information or data is provided by the User, the Company shall be at
            liberty to initiate appropriate actions against the User.
          </div>
          <div className={classes.privacy_para}>
            You may have the opportunity to create a profile, which consists of
            information about you, and may include Personal Information,
            photographs, examples of your work, information on work previously
            performed via the Service and outside the Service, skills, tests
            taken, test scores, pay rates, feedback/rating information and other
            information, including your username{" "}
            <span className={classes.boldText}>(Profile)</span> . The
            information in your Profile may be visible to all Rozgaar India
            Users and the general public subject to the privacy choices you make
            within your Rozgaar India Profile. You may edit certain information
            in your Profile via your account and may choose to limit who is able
            to view certain content you post to your Profile. Clients and
            Agencies of associated individual users or companies may also have
            the opportunity to create an organization Profile. If, in any case,
            you believe that an unauthorized profile has been created about you,
            you can request for it to be removed by contacting us.
          </div>
          <h2 className={classes.boldText}>Testimonials</h2>
          <div className={classes.privacy_para}>
            We display personal testimonials of satisfied customers on our
            Service, in addition to other endorsements. With your consent we may
            post your testimonial along with your name. If you wish to update or
            delete your testimonial, you can contact us.
          </div>
          <h2 className={classes.boldText}>
            Job Listings through Rozgaar India
          </h2>
          <div className={classes.privacy_para}>
            If you choose to post a work listing via the Service as a Client,
            the contents of such listing will be viewable publicly, unless you
            designate the listing as only viewable through the Service or as
            private using the settings available on the applicable website. Work
            listings include information such as budget, location, history of
            work listing(s) by the Client, the names of other Freelancers
            performing work for the Client, Client feedback and rating
            information and timing of project performance.
          </div>
          <h2 className={classes.boldText}>Feedback</h2>
          <div className={classes.privacy_para}>
            We collect feedback from Rozgaar India Users about their experience
            with other Rozgaar India Users of our Service. Please note that any
            feedback you provide via the Service or feedback provided about you
            is publicly viewable via the Service. On very rare occasions, we may
            remove feedback pursuant to the relevant provisions of our Terms of
            Service,
          </div>
          <h2 className={classes.boldText}>2. USE OF INFORMATION</h2>
          <div className={classes.privacy_para}>
            We use information collected through the Service to provide and
            improve the Service, process your requests, prevent fraud, provide
            you with information and advertising that may interest you, comply
            with the law, and as otherwise permitted with your consent.
          </div>

          <h2 className={classes.boldText}>We use information we collect:</h2>
          <ul>
            <li className={classes.ordered_li}>
              To provide and improve the Service, complete your transactions,
              and address your inquiries, process your registration, verify the
              information you provide is valid, and for compliance and internal
              business purposes.
            </li>
            <li className={classes.ordered_li}>
              To contact you with administrative communications and Rozgaar
              India newsletters, marketing or promotional materials (on behalf
              of Rozgaar India or third parties) and other information that may
              be of interest to you. If you decide at any time that you no
              longer wish to receive such communications from us, please contact
              us.
            </li>
            <li className={classes.ordered_li}>
              For all marketing and advertising purposes on our website/social
              pages/agencies/affiliates/ or on any other mediums related to
              Rozgaar India.
            </li>
            <li className={classes.ordered_li}>
              To administer and develop our business relationship with you and,
              if applicable, the corporation or other legal entity you
              represent.
            </li>
            <li className={classes.ordered_li}>
              To assess your proposal to perform a project for Rozgaar India and
              prepare related governmental and internal statistics reports.
            </li>
            <li className={classes.ordered_li}>
              To enforce and comply with the law, including conducting an
              investigation, to protect the property and rights of Rozgaar India
              or a third party, to protect the safety of the public or any
              person, or to prevent or stop activity we may consider to be, or
              to pose a risk of being, illegal, fraudulent, unethical or legally
              actionable activity. We may also use Device Identifiers to
              identify Rozgaar India Users.
            </li>
            <li className={classes.ordered_li}>
              The User is bound to disclose correct credentials and provide
              correct information and details to the Company. In Case any false
              information or data is provided by the User, the Company shall be
              at liberty to initiate appropriate actions against the User.
            </li>
            <li className={classes.ordered_li}>
              For the purposes disclosed at the time you provide your
              information, with your consent, and as further described in this
              Privacy Policy.
            </li>
          </ul>

          <h2 className={classes.boldText}>Your Responsibilities</h2>
          <ul>
            <li className={classes.ordered_li}>
              When you register your email address and mobile number with us,
              you agree to receive email and mobile communications. You also
              agree and acknowledge that when you use our referral program for
              referring someone, Rozgaar India will send emails to that person
              on your behalf and the email headers will carry your email address
              as the address from which such emails are sent.
            </li>
            <li className={classes.ordered_li}>
              The data that is transmitted over the Internet is intrinsically
              exposed to security risks or threats. For instance, information
              transmitted via chat or email can be compromised and used by
              others. Therefore, Rozgaar India cannot guarantee any security for
              such information.
            </li>
            <li className={classes.ordered_li}>
              When you signup, your account is protected by means of login
              information, which includes a username and a password that is
              known only to you. Therefore, you are responsible for maintaining
              the confidentiality of your login information including your
              username and password. We are not responsible for any activity,
              which is undertaken when your password is used. We suggest you not
              to disclose your password to anyone. If you become aware of or
              reasonably suspect any breach of security, including compromise of
              your login information, it is your responsibility to immediately
              notify rozgaarindia.com
            </li>
            <li className={classes.ordered_li}>
              We may contain links to other websites and such websites are
              governed by their own privacy policies and Rozgaar India does not
              exercise any control over them. It is your responsibility to read
              and understand the privacy policy of such websites when you follow
              a link outside rozgaarindia.com
            </li>
          </ul>

          <h2 className={classes.boldText}>Data Security</h2>
          <div className={classes.privacy_para}>
            Rozgaar India takes reasonable steps to safeguard Personal
            Information in its ownership from loss, misuse and unauthorized
            access, disclosure, alteration and destruction. We have put in place
            appropriate physical, electronic and managerial procedures to
            safeguard and secure the information, prevent unauthorized access,
            to maintain data security, and to use correctly the information we
            collect online. These safeguards vary based on the sensitivity of
            the information that we collect and store.
          </div>
          <div className={classes.privacy_para}>
            While rozgaarindia.com takes all the necessary measures to ensure
            that your personal information remains secured on the Internet, it
            should be noted that World Wide Web couldn't be completely safe.
            Error in transmission, illegal access by third party or any other
            reason that are beyond our control, the site will not be held
            responsible for it.
          </div>

          <h2 className={classes.boldText}>Consent</h2>
          <ul>
            <li className={classes.ordered_li}>
              By using our website, it is understood that you have given your
              consent to the collection and use of this information by Rozgaar
              India and its partners and affiliates.
            </li>
            <li className={classes.ordered_li}>
              The USER hereby gives Consent to the Company to have all access to
              the Data, Statistics, Contents, Correspondences and materials
              shared by USER to any other person, in case, the Company
              apprehends or notice any breach or violation of any terms and
              condition or privacy policy or any activity in violation of any
              corresponding law.
            </li>
            <li className={classes.ordered_li}>
              We use third party payment gateway and e-wallets to process
              deposit and withdrawals and related transactions. By accepting
              this Privacy Policy, You clearly agree to use your Personal
              Information where necessary for the processing of transactions
              being shared with ESPs. We take steps to ensure that our
              arrangements with PSP's safeguard your privacy.
            </li>
            <li className={classes.ordered_li}>
              By filling your details with us, you give us consent to use
              communicate with you via email and mobile at anytime for
              information, update on promotions, news & events conducting on at
              Rozgaar India and partners, group companies or affiliates.
            </li>
            <li className={classes.ordered_li}>
              We, at any point of time can review or authenticate your identity
              for security measures and conduct a validation check by using your
              personal information.
            </li>
          </ul>
          <div className={classes.privacy_para}>
            Rozgaar India may update this Privacy Policy at any time and any
            changes will be effective upon posting. Your use of our
            website/software constitutes that you accept the terms & conditions
            of our website & agree to the Privacy policy.
          </div>
        </div>
     
      </React.Suspense>
    </>
  );
};

export default PrivacyPolicy;
