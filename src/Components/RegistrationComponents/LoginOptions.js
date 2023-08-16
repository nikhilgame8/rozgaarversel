import React, { useState } from "react";
import classes from "./LoginOptions.module.css";
import { FcGoogle } from "react-icons/fc";

import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

const LoginOptions = (props) => {

  const [googleLogin, setGoogleLogin] = useState(false);

  let navigate = useNavigate();

 
  const responseGoogle = (response) => {

    if (response.accessToken) {
      setGoogleLogin(true);
      navigate("/SocialLoing/" + props.id);
    }
  };

  return (
    <div>

      <div className={classes.icons}>
        <div className={classes.partnerLoginButtonContainer}>
          <FcGoogle size="25" className={classes.partnerIcon} />
          <div className={classes.partnerFBLogin}>
            <GoogleLogin
              clientId="148730292611-q449eq3pm3tokgp1fgntkn0jf6ebuvpt.apps.googleusercontent.com"
              //clientId="1019171565423-9bvlrsepu6vc1qggbbjou5002bstgik9.apps.googleusercontent.com"

              // Live clientId
              //clientId="723774834549-1mtc4v6e9359qihs5spvpli8nkl7qq4u.apps.googleusercontent.com"
              // Live clientId
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className={classes.GoogleBtn}
                >
                  Google
                </button>
              )}
              buttonText="Login"
              onSuccess={props.OnSuccess}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>

        {/* <div className={classes.partnerLoginButtonContainer}>
          <BsFacebook size="25" className={classes.partnerIcon} />
          <div className={classes.partnerFBLogin}>
            <FacebookLogin
              appId="612358006684925"
              fields="name,email,picture"
              onClick={props.faceBookClicked}
              callback={props.responseFacebook}
              autoLoad={false}
              cssClass={classes.facebookBtn}
              textButton={"Facebook"}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginOptions;
