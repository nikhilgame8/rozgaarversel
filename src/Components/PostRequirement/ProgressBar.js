import React from "react";
import { BsCheck } from "react-icons/bs";
import { ImRadioChecked2 } from "react-icons/im";
import classes from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  const progressbar = (step) => {
    switch (step) {
      case "stepone":
        return (
          <div>
            <div className={classes.progressbar}>
              <div className={classes.progressbar_li}>
                <ImRadioChecked2 className={classes.progressbar_faicon} />
                <div className={classes.progressbar_border}></div>
              </div>
              <div className={classes.progressbar_li}>
                <ImRadioChecked2 className={classes.progressbar_faicon} />
                <div className={classes.progressbar_border}></div>
              </div>
              <div className={classes.progressbar_li}>
                <ImRadioChecked2 className={classes.progressbar_faicon} />
                <div className={classes.progressbar_border}></div>
              </div>
              <div className={classes.progressbar_last}>
                <ImRadioChecked2 className={classes.progressbar_faicon} />
              </div>
            </div>
          </div>
        );
      case "steptwo":
        return (
          <div>
            <div className={classes.progressbar}>
              <div className={classes.progressbar_li}>
                <BsCheck className={classes.progressbar_bscheck} />
                <div className={classes.progressbar_bordebold}></div>
              </div>
              <div className={classes.progressbar_li}>
                <ImRadioChecked2 className={classes.progressbar_faicon} />
                <div className={classes.progressbar_border}></div>
              </div>
              <div className={classes.progressbar_li}>
                <ImRadioChecked2 className={classes.progressbar_faicon} />
                <div className={classes.progressbar_border}></div>
              </div>
              <div className={classes.progressbar_last}>
                <ImRadioChecked2 className={classes.progressbar_faicon} />
              </div>
            </div>
          </div>
        );
      case "stepthree":
        return (
          <div>
            <div className={classes.progressbar}>
              <div className={classes.progressbar_li}>
                <BsCheck className={classes.progressbar_bscheck} />
                <div className={classes.progressbar_bordebold}></div>
              </div>
              <div className={classes.progressbar_li}>
                <BsCheck className={classes.progressbar_bscheck} />
                <div className={classes.progressbar_bordebold}></div>
              </div>
              <div className={classes.progressbar_li}>
                <ImRadioChecked2 className={classes.progressbar_faicon} />
                <div className={classes.progressbar_border}></div>
              </div>
              <div className={classes.progressbar_last}>
                <ImRadioChecked2 className={classes.progressbar_faicon} />
              </div>
            </div>
          </div>
        );
      case "stepfour":
        return (
          <div>
            <div className={classes.progressbar}>
              <div className={classes.progressbar_li}>
                <BsCheck className={classes.progressbar_bscheck} />
                <div className={classes.progressbar_bordebold}></div>
              </div>
              <div className={classes.progressbar_li}>
                <BsCheck className={classes.progressbar_bscheck} />
                <div className={classes.progressbar_bordebold}></div>
              </div>
              <div className={classes.progressbar_li}>
                <BsCheck className={classes.progressbar_bscheck} />
                <div className={classes.progressbar_bordebold}></div>
              </div>
              <div className={classes.progressbar_last}>
                <ImRadioChecked2 className={classes.progressbar_faicon} />
              </div>
            </div>
          </div>
        );
      case "stepfive":
        return (
          <div>
            <div className={classes.progressbar}>
              <div className={classes.progressbar_li}>
                <BsCheck className={classes.progressbar_bscheck} />
                <div className={classes.progressbar_bordebold}></div>
              </div>
              <div className={classes.progressbar_li}>
                <BsCheck className={classes.progressbar_bscheck} />
                <div className={classes.progressbar_bordebold}></div>
              </div>
              <div className={classes.progressbar_li}>
                <BsCheck className={classes.progressbar_bscheck} />
                <div className={classes.progressbar_bordebold}></div>
              </div>
              <div className={classes.progressbar_last}>
                <BsCheck className={classes.progressbar_bscheck} />
              </div>
            </div>
          </div>
        );
      default:
        console.log("Invalid Input");
        break;
    }
  };
  return <div>{progressbar(props.input)}</div>;
};

export default ProgressBar;
