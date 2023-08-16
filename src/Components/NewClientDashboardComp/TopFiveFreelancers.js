import { HiOutlineSpeakerphone } from 'react-icons/hi'
import classes from './TopFiveFreelancer.module.css'
import ProfileIcon from '../HomeAndLandingPages/ProfileIcon';
import { encodeAndSendToChat } from "./ProposalDetails";
import RISkeletonLoading from '../RISkeletonLoading';

const TopFiveFreelancer = (props) => {

    return (
        <div className={classes.mainContainer}>
            {props.isLoading ? <RISkeletonLoading loadingType={"TopFiveFreelancer"} /> :
            <div>
            <div className={classes.mainHeading}>
                Top five freelancers
            </div>
            <div>Find the right freelancer for any scope of work by communicating directly</div>

            <div className={classes.profilesContainer}>
                {!props.requirementApplication.length && <div className={classes.contentAndIcon}> <HiOutlineSpeakerphone className={classes.iconArea} /> <div className={classes.noApplication}> You don't have any application yet !  </div> </div>}
                {props.requirementApplication.slice(0, 3).map((item) => {
                    return (

                        <div className={classes.eachProfileSet}>
                            <div className={classes.profileImageDisplay}>
                                <ProfileIcon appliedUser={item.RequirementApplication} FirstName={item.FirstName} LastName={item.LastName} ProfilePicture={item.ProfilePicture} type={"topFiveFreelaners"} FreelancerId={item.FreelancerId}  />
                             
                            </div>
                            <div className={classes.name}>{item.UserName} </div>
                        \
                            <div className={classes.connectButton} onClick={() => { encodeAndSendToChat(localStorage.getItem("Client_userID"), item.FreelancerId) }}>CHAT </div>
                        </div>

                    )
                })}
            </div>
            <div className={classes.profilesContainer}>
                {props.requirementApplication.slice(3, 5).map((item) => {
                    return (

                        <div className={classes.eachProfileSet}>
                            <div className={classes.profileImageDisplay}>
                            <ProfileIcon appliedUser={item.RequirementApplication} FirstName={item.FirstName} LastName={item.LastName} ProfilePicture={item.ProfilePicture} type={"topFiveFreelaners"} FreelancerId={item.FreelancerId}  />
                            </div>
                            <div className={classes.name}>{item.UserName}</div>
                       
                            <div className={classes.connectButton} onClick={() => { encodeAndSendToChat(localStorage.getItem("Client_userID"), item.FreelancerId) }}>CHAT  </div>
                            
                        </div>

                    )
                })}
            </div>
            </div>}

        </div>
        
    )
}

export default TopFiveFreelancer;