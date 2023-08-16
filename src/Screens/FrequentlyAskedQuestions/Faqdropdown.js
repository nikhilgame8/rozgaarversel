import React, { useState } from "react";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import classes from "./Faqdropdown.module.css";
const Faqdropdown = (props) => {
  const [show, setshow] = useState(false);
  var html = props.answer;
  let result = html.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "");

  var Question = props.question;
  let Questionresult = Question.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "");

  return (
    <>
      <div className={classes.faq_border}>
        <div
          onClick={() => {
            show ? setshow(false) : setshow(true);
          }}
          className={classes.faq_borderclick}
        >
          <div className={classes.faq_questiondiv}>
            <h2 className={classes.faq_question}     dangerouslySetInnerHTML={{ __html: Questionresult }} />
            <div>
              {show ? (
                <RiArrowUpSLine className={classes.faq_icon} size={30} />
              ) : (
                <RiArrowDownSLine className={classes.faq_icon} size={30} />
              )}
            </div>
          </div>
        </div>
        {show ? (
          <div
            dangerouslySetInnerHTML={{ __html: result }}
            className={classes.faq_answer}
         />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Faqdropdown;
