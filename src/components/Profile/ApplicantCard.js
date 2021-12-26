import classes from "./ApplicantCard.module.css";

const ApplicantCard = (props) => {
  return (
    <div className={classes.card}>
      <li className={classes.applicant}>
        <div>
          <h3>{props.title}</h3>
          <div className={classes.description}>{props.description}</div>
        </div>
        <div className={classes.splitButton}>
          <div className={classes.location}>{props.location}</div>
        </div>
      </li>
    </div>
  );
};

export default ApplicantCard;
