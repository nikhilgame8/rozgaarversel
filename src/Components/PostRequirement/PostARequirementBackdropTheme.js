import { MdOutlineArrowBack } from "react-icons/md";
import classes from "./PostARequirementBackdropTheme.module.css";
import RiProgreesBar from "./RiProgressBar";
import { useNavigate } from "react-router-dom";

const PostARequirementBackdropTheme = (props) => {
  let navigate = useNavigate();

  return (
    <div className={classes.webImageContainer}>
      <div className={classes.webImageArea}>
        <h1 className={classes.Heading_text_Web}>{props.headingsMain}</h1>
        <div className={classes.para_text_Web}>{props.subHeadingMain}</div>
      </div>
      <div className={classes.Maincontainer_border}>
        <RiProgreesBar step={props.step} />
        <div className={classes.webPadding}>
          <button className={classes.back_button} onClick={() => navigate(-1)}>
            {" "}
            <MdOutlineArrowBack size="30" className={classes.backIcon} />{" "}
          </button>

          <div className={classes.centerMain}>
            <div className={classes.Heading_text}>{props.headingsMain}</div>
            <div className={classes.para_text}>{props.subHeadingMain}</div>

            <div> {props.children} </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostARequirementBackdropTheme;
