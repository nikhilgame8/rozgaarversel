import { useState, useEffect } from 'react';
import classes from './ProfileImage.module.css'
import { FaTwitter, FaLinkedin, FaGlobe } from "react-icons/fa";
import countryjsonwithflag from '../../JsonFiles/countryjsonwithflag.json';
const ProfileImage = (props) => {


    const [countryFlag, setCountryFlag] = useState('');
    const [website, setWebsite] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedIn, setLinkedIn] = useState('')

    useEffect(() => {
        countryjsonwithflag.forEach(item => {
            if (item.country === props.profileImageData.Country)
                setCountryFlag(item.flag);
        });
        {
            props.profileImageData.SocialMedia && props.profileImageData.SocialMedia.forEach(obj => {
                switch (obj.Name) {
                    case 'Website':
                        setWebsite(obj.URL)
                        break;
                    case 'Twitter':
                        setTwitter(obj.URL)
                        break;
                    case 'LinkedIn':
                        setLinkedIn(obj.URL)
                        break;
                    default:
                        break;
                }
            });
        }

    }, [props])


    return (
        <div className={classes.mainContainer}>


            <div className={classes.profilePictureNameContainer}>

                <div className={classes.profilePicture}>
                    {props.profileImageData.profilePicture === null|| props.profileImageData.profilePicture === "" ? <div className={classes.profilePictureName} >
                        {props.profileImageData.firstName.charAt(0).toUpperCase()}{" "}
                        {props.profileImageData.lastName.charAt(0).toUpperCase()}{" "}
                    </div>
                        :
                        <img src={process.env.PUBLIC_URL +props.profileImageData.profilePicture} alt={props.freelancerProfileImage} className={classes.profilePicture} 
                            title={props.freelancerProfileImage} loading='lazy' width={150} height={150}
                        />}

                </div>


                <div className={classes.nameAndSkillContainer}>
                    <div className={classes.freelancerName}> {props.profileImageData.firstName + ' ' + props.profileImageData.lastName} </div>
                    <div className={classes.skillCat}> {props.profileImageData.primarySkill} </div>
                    <div className={classes.skillCat}>
                        <img className={classes.flagImage} src={process.env.PUBLIC_URL +countryFlag} alt="Country_Flag" title='Country_Flag' loading='lazy' width={28} height={25}/>
                        {props.profileImageData.City}, {props.profileImageData.Country} </div>
                </div>
                <div className={classes.socialContainer}>
                    <div className={classes.mainHeading}>
                        Social Media
                    </div>
                    <div className={classes.iconContainer}>
                        <a target='_blank' href={website}><FaGlobe size={22} className={classes.socialIcon} color='#0e76a8' /></a>
                        <a target='_blank' href={twitter}><FaTwitter size={22} className={classes.socialIcon} color='#00acee ' /></a>
                        <a target='_blank' href={linkedIn}><FaLinkedin size={22} className={classes.socialIcon} color='#0e76a8' /></a>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default ProfileImage;