
import classes from './CfutureOfWork.module.css'

const CfutureOfWork = () => {


    return (
        <div className={classes.mainContainer}>
            <img className={classes.futureImage} src={process.env.PUBLIC_URL + "/assets/Futureworkassets/future-of-work.webp"} />
            <a href={process.env.PUBLIC_URL + "/future-of-work"} className="linkTag">
                <div className={classes.heading}> The Future <div> of work</div></div>
            </a>
            <div className={classes.contentDesc}>
                Our mission is to simplify remote hiring providing most
                aligned freelancers for a day, month or a year fulfilling
                your professional needs.
            </div>
            <div className={classes.contentDesc}>
                Our easy-to-use platform enables you to manage
                off-balance sheet talented workers in a single click with
                confidence and trust so you can save time and focus
                on your succes
            </div>
            <div className={classes.whiteBorder}> </div>

            <div className={classes.buttonContainer}> </div>
            <a href={process.env.PUBLIC_URL + "/future-of-work"} className="linkTag">
                <div className={classes.greenButton}> See More </div>
            </a>
        </div>


    )

}

export default CfutureOfWork;