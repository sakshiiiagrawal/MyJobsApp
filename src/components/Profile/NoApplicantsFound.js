import classes from "./NoApplicantsFound.module.css";
import postJob from "../../assets/postJob.png";

const NoApplicantsFound = () => {
  return (
    <div className={classes.applicant}>
      <img src={postJob} alt="No Applications available!" />
      <h2>No Applications available!</h2>
    </div>
  );
};

export default NoApplicantsFound;
