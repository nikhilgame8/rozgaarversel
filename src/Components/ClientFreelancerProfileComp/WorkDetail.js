import classes from "./WorkDetail.module.css";

const WorkDetail = (props) => {
  const policy = props.workDetailData.isAvailable.split(",");

  return (
    <div className={classes.mainContainer}>
      <div className={classes.sectionContainer}>
        <div className={classes.mainHeading}>Available to work</div>
      </div>
      <div className={classes.workAvailability}>
        <div>
          {policy.map((item) => (
            <div>{item}</div>
          ))}
        </div>
      </div>

      <div className={classes.sectionContainer}>
        <div className={classes.mainHeading}>Interested In</div>
        {props.workDetailData.isMonthly === "1" && <>Monthly</>}
        {props.workDetailData.isOnCommision === "1" && <>, On Commision</>}
        {props.workDetailData.isContractual === "1" && <>, Contractual</>}
        {props.workDetailData.isOneTime === "1" && <>, One Time</>}
      </div>
      <div className={classes.sectionContainer}>
        <div className={classes.mainHeading}>Languages</div>
        <div className={classes.workAvailability}>
          {props.workDetailData.languages.map((item) => {
            return <div>{item.Name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
