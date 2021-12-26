import classes from "./ApplicantCard.module.css";
import applicantIcon from "../../assets/applicant.png";

const ApplicantCard = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardAvatar}>
        <img src={applicantIcon} alt="Applicant Card" />
      </div>
      <div className={classes.cardDetails}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.email}>{props.email}</div>

        <div className={classes.skills}>
          <label>Skills</label>
          <span className={classes.value}>{props.skills}</span>
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;
