import classes from "./WaitListUsers.module.css";

const WaitListUsers = () => {
  const proposalData = [
    {
      key: "1",
      name: "Luv kalra",
      skill: "Grapghic Designer",
      Budget: "$3000",
    },
    {
      key: "2",
      name: "Luv kalra",
      skill: "Grapghic Designer",
      Budget: "$3000",
    },
    {
      key: "3",
      name: "Luv kalra",
      skill: "Grapghic Designer",
      Budget: "$3000",
    },
    {
      key: "4",
      name: "Luv kalra",
      skill: "Grapghic Designer",
      Budget: "$3000",
    },
  ];

  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainHeading}>Wait List</div>
      <div>
        Didn’t find the perfect freelancer yet? Unlock the freelancers in the
        waitlist Now
      </div>
      {proposalData.map((item, i) => {
        return (
          <div className={classes.iconAndUsername}>
            <div className={classes.iconContainer}> LK </div>
            <div className={classes.nameAndSkillContainer}>
              <div className={classes.freelancerName}> Luv kalra</div>
              <div className={classes.freelacerSkill}> Grapghic Designer</div>
              <div className={classes.connnetOption}> CHAT</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WaitListUsers;
