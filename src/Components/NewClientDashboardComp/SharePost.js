import React, { useRef, useState } from "react";
import CustomModalTheme from "../CustomModalTheme";
import classes from "./SharePost.module.css";
import {FaClone,FaEnvelope,FaFacebookF,FaLinkedinIn,FaTwitter,FaWhatsapp} from "react-icons/fa";

const SharePost = (props) => {
  const share = [
    {
      fa: (
        <a className={classes.iconHref} 
          target="_blank"
          rel="noreferrer"
          href={process.env.PUBLIC_URL + "https://twitter.com/intent/tweet?url=" + props.url}
        >
          {console.log(process.env.PUBLIC_URL)}
          <FaTwitter className={classes.iconColor} />
        </a>
      ),
      faName: "Twitter",
    },
    {
      fa: (
        <a className={classes.iconHref}
          target="_blank"
          rel="noreferrer"
          href={process.env.PUBLIC_URL + "https://facebook.com/sharer/sharer.php?u=" + props.url}
        >
          <FaFacebookF className={classes.iconColor} />
        </a>
      ),
      faName: "Facebook",
    },
    {
      fa: (
        <a className={classes.iconHrefSmall}
          target="_blank"
          rel="noreferrer"
          href={
            props.device === "Mobile"
              ?process.env.PUBLIC_URL +  "whatsapp://send?text=" + props.url
              : process.env.PUBLIC_URL + "https://web.whatsapp.com/send?text=" + props.url
          }
        >
          <FaWhatsapp className={classes.iconColor} />
        </a>
      ),
      faName: "Whatsapp",
    },

    {
      fa: (
        <a className={classes.iconHrefSmall}
          target="_blank"
          rel="noreferrer"
          href={
            process.env.PUBLIC_URL + "https://www.linkedin.com/shareArticle?mini=true&url=" + props.url
          }
        >
          <FaLinkedinIn className={classes.iconColor} />
        </a>
      ),
      faName: "LinkedIn",
    },
    {
      fa: (
        <a className={classes.iconHref} target="_blank" rel="noreferrer" href={process.env.PUBLIC_URL + "mailto:?body=" + props.url}>
          <FaEnvelope className={classes.iconColor} />
        </a>
      ),
      faName: "Email",
    },
  ];

  const textAreaRef = useRef(null);
  const [success, setSuccess] = useState(false);

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    setSuccess(true);
  };
  return (
    <div>
      <CustomModalTheme onClose={props.closeModal}>
        <div className={classes.shareIconContainer}>
          {share.map((item, index) => {
            return (
              <>
                <div className={classes.ShareIcon}>
                  <div className={`${classes.iconBg} ${classes[item.faName]}`}>
                    {item.fa}
                  </div>
                  <span>{item.faName}</span>
                </div>
              </>
            );
          })}
        </div>
        {success && (
          <div className={classes.error_message}>Link copied to clipboard</div>
        )}
        <div className={classes.textInputLabel}>
          <input
            type="url"
            ref={textAreaRef}
            value={props.url}
            className={classes.textInput}
          />
          <button
            className={classes.copyIcon}
            onClick={() => {
              copyToClipboard();
              setTimeout(() => {
                setSuccess(false);
              }, 1000);
            }}
          >
            <FaClone />
          </button>
        </div>
      </CustomModalTheme>
    </div>
  );
};

export default SharePost;
