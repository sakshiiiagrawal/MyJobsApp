import classes from "./NoJobsFound.module.css";
import postJob from "../../assets/postJob.png";
import { Link } from "react-router-dom";

const NoJobsFound = () => {
  return (
    <div className={classes.job}>
      <img src={postJob} alt="Post Jobs Here" />
      <h2>Your posted jobs will show here!</h2>
      <button>
        <Link to="/newJob">Post a Job</Link>
      </button>
    </div>
  );
};

export default NoJobsFound;
