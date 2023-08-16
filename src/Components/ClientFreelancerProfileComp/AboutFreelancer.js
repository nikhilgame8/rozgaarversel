
import classes from './AboutFreelancer.module.css'

const AboutFreelancer = (props) => {

    return (
        <div className={classes.mainContainer}>

            <div className={classes.heading}>
                About me </div>
            <div>
                <b>{props.aboutFreelancerData.professionalTitle}</b><br />
                {props.aboutFreelancerData.description}

            </div>
            <div >
                <div className={classes.mainHeading}>
                    Skill
                </div>
                <div className={classes.tabContainer}>
                    {props.aboutFreelancerData.skills.map((item, i) => {
                        return i !== 0 && <div className={classes.SkillTab} key={item.Skills}> {item.Skills}
                        </div>
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default AboutFreelancer;