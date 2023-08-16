import React from "react";
import classes from "./WriteForUs.module.css";
import { FiUpload } from "react-icons/fi";
import ActionButton from "../../Components/ActionButton";
import RiTextInputs from "../../Components/PostRequirement/RiTextInputs";

const WriteForUs = () => {
  return (
    <div>
      <div className={classes.writeforusFormBox}>
        <div className={classes.writeforusForm}>
          <div className={classes.topHeaderBox}>
            <div className={classes.headerText}>Write For Us</div>
            <div className={classes.headerUnderline}></div>
            <div className={classes.headerPara}>
              Welcome! We appreciate your interest in writing for
              RozgaarIndia.com. We welcome you to share your knowledge and
              experiences for the benefits of job seekers and/or job providers.
            </div>
          </div>

          <div className={classes.inputBoxes}>
            <RiTextInputs
              input={"SingleLineInput"}
              label={"Full name:"}
              placeHolder={"e.g. John Doe"}
            />
            <RiTextInputs
              input={"SingleLineInput"}
              label={"Email:"}
              placeHolder={"e.g. johndoe24@gmail.com"}
            />
            <RiTextInputs
              input={"SingleLineInput"}
              label={"Phone:"}
              placeHolder={"e.g. 941238****"}
            />
            <RiTextInputs
              input={"SingleLineInput"}
              label={"Title of article:"}
              placeHolder={"enter your title here"}
            />
            <RiTextInputs
              input={"MultiLineInput"}
              label={"Title description:"}
              placeholder={"enter your title description here"}
            />
            <RiTextInputs
              input={"file"}
              label={"Profile photo:"}
              icon={<FiUpload />}
            />
            <RiTextInputs
              input={"file"}
              label={" Upload relevant creative for the article:"}
              icon={<FiUpload />}
            />
            <div className={classes.subtitle}>*Max size 5 MB</div>
            <RiTextInputs
              input={"SingleLineInput"}
              label={"References:"}
              placeHolder={"sources"}
            />
            <div className={classes.centerBtn}>
              <ActionButton buttonType={"medium"} buttonText={"Submit"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteForUs;
