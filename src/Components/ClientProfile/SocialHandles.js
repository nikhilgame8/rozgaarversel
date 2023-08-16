import React, { useState } from "react";
import classes from "./SocialHandles.module.css";
import ActionButton from "../ActionButton";
import CustomModalTheme from "../CustomModalTheme";
import RiTextInputs from "../PostRequirement/RiTextInputs";


const SocialHandles = (props) => {
  
  const [facebook, setFacebook] = useState(props.socialLinks.FacebookUrl);
  const [twitter, setTwitter] = useState(props.socialLinks.TwitterUrl);
  const [linkedin, setLinkedin] = useState(
    props.socialLinks.LinkedinUrl ? props.socialLinks.LinkedinUrl : ""
  );
  const [successMessage, setSuccessMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let userID = localStorage.getItem("Client_userID");
 

  const UpdateSocialLinks = (value) => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 52e6faf229b4c8d1f6832edd4dde9a9d60a8c0d3"
    );
    var formdata = new FormData();
    formdata.append("UserId", userID);
    formdata.append("LinkedinUrl ", linkedin);
    formdata.append("FacebookUrl ", facebook);
    formdata.append("TwitterUrl ", twitter);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(global.apiLink + "/api/rozgaarapi/ClientProfile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 200 && result.status === "Success") {
          setSuccessMessage("Link added successfully");
          window.location.reload()
        
        } else {
          console.log("Something went wrong, please contact support!");
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CustomModalTheme onClose={props.onClose}>
      <div className={classes.mainHeading}>Social Handles</div>

      <div className={classes.pageMainContainer}>
        <>
          <div className={classes.companyInfoInput}>
            <RiTextInputs
              input={"SingleLineInput"}
              placeHolder={"Enter facebook profile URL"}
              type={"text"}
              onInput={() => setSuccessMessage("")}
              onChange={(e) => setFacebook(e.target.value)}
              value={facebook}
            />
          </div>
          <div className={classes.companyInfoInput}>
            <RiTextInputs
              input={"SingleLineInput"}
              placeHolder={"Enter twitter profile URL"}
              onInput={() => setSuccessMessage("")}
              onChange={(e) => setTwitter(e.target.value)}
              value={twitter}
            />
          </div>
          <div className={classes.companyInfoInput}>
            <RiTextInputs
              input={"SingleLineInput"}
              placeHolder={"Enter linkedIn profile URL"}
              type={"text"}
              onInput={() => setSuccessMessage("")}
              onChange={(e) => setLinkedin(e.target.value)}
              value={linkedin}
            />
          </div>
          <div className={classes.successMessage}>{successMessage}</div>
          <div className={classes.submitbutton}>
            <ActionButton
              buttonType={"small"}
              isLoading={isLoading}
              buttonText={"Submit"}
              onClick={() => UpdateSocialLinks()}
            />
          </div>{" "}
        </>
      </div>
    </CustomModalTheme>
  );
};

export default SocialHandles;
