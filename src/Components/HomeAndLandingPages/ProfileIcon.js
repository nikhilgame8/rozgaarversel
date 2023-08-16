import classes from "./ProfileIcon.module.css";
import { useNavigate } from "react-router-dom";

const ProfileIcon = (props) => {
  const FirstName = props.FirstName
    ? props.FirstName.charAt(0).toUpperCase()
    : " ";
  const LastName = props.LastName
    ? props.LastName.charAt(0).toUpperCase()
    : " ";
  const ProfilePicture =
    props.ProfilePicture === "undefined" || !props.ProfilePicture
      ? false
      : true;

  const navigate = useNavigate();

  return (
    <>
      {props.type === "freelancerProfiles" ? (
        <div>
          {true ? (
            <div className={classes.logooverlaped}>
              {props.appliedUser &&
                props.appliedUser.map((item, index) => {
                  return (
                    index < 5 && (
                      <div className={classes.freelancerProfileContainer}>
                        {item.ProfilePicture !== "" ? (
                          <img
                            src={process.env.PUBLIC_URL + item.ProfilePicture}
                            alt="Freelancer_Profile_Picture"
                            className={classes.requirementcard_icons}
                            onClick={() =>
                              navigate(
                                "/FreelancerProfile/" + item.FreelancerId
                              )
                            }
                            loading="lazy"
                            title={item.FullName}
                            height={"100%;"}
                            width={"100%;"}
                          />
                        ) : (
                          <div
                            className={classes.profileImageDisplay}
                            onClick={() =>
                              navigate(process.env.PUBLIC_URL + 
                                "/FreelancerProfile/" + item.FreelancerId
                              )
                            }
                          >
                            {props.ProfilePicture ? (
                              <img
                                src={process.env.PUBLIC_URL + props.ProfilePicture}
                                className={classes.profilePicture}
                                alt={item.FullName}
                                loading="lazy"
                                title={item.FullName}
                                height={"100%;"}
                                width={"100%;"}
                              />
                            ) : (
                              <div className={classes.nameAlign}>
                                {" "}
                                {item.FullName.charAt(0).toUpperCase()}{" "}
                                {item.LastName.charAt(0).toUpperCase()}{" "}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  );
                })}
            </div>
          ) : (
            <div className={classes.smalliconContainer}>
              <div className={classes.smallinnerInitial}>
                {FirstName}
                {LastName}
              </div>
            </div>
          )}
        </div>
      ) : props.type === "topFiveFreelaners" ? (
        <>
          <div
            className={classes.profileImageDisplay}
            onClick={() => navigate(process.env.PUBLIC_URL + "/FreelancerProfile/" + props.FreelancerId)}
          >
            {props.ProfilePicture ? (
              <img
                src={process.env.PUBLIC_URL + props.ProfilePicture}
                className={classes.topProfilePicture}
                alt={props.FirstName + " " + props.LastName}
                loading="lazy"
                title={props.FirstName + " " + props.LastName}
                height={"100%;"}
                width={"100%;"}
              />
            ) : (
              <div className={classes.nameAlign}>
                {" "}
                {FirstName}
                {LastName}{" "}
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          className={
            props.leftMenu
              ? classes.iconContainerLeftMenu
              : classes.iconContainer
          }
        >
          {ProfilePicture ? (
            <div
              className={
                props.leftMenu
                  ? classes.profileImageLeftMenu
                  : classes.profileImage
              }
            >
              <img
                src={process.env.PUBLIC_URL + props.ProfilePicture}
                className={classes.profilePicture}
                alt="Freelancer_Profile_Picture"
                loading="lazy"
                title={props.FirstName + " " + props.LastName}
                height={"100%;"}
                width={"100%;"}
              />
            </div>
          ) : (
            <div
              className={
                props.leftMenu
                  ? classes.innerInitialLeftMenu
                  : classes.innerInitial
              }
            >
              {FirstName}
              {LastName}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileIcon;
