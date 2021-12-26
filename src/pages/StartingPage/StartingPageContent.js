import classes from "./StartingPageContent.module.css";
import { Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import displayImage from "../../assets/displayPicture.jpg";
import companiesImage from "../../assets/companies.png";
import AuthContext from "../../store/auth-context";

const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <div className={classes.container}>
        <section className={classes.starting}>
          <div className={classes.column50}>
            <h1>
              <b>Welcome to</b>
            </h1>
            <h1>
              <b>
                My<span className={classes.colorBlue}>Jobs</span>
              </b>
            </h1>
            {!authCtx.token && (
              <button>
                <Link to="/signup">Get Started</Link>
              </button>
            )}
          </div>

          <div className={classes.column50}>
            <img src={displayImage} alt="MyJobs" />
          </div>
        </section>
      </div>

      <div className={classes.container}>
        <section className={classes.middle}>
          <div className={classes.row}>
            <h2 className={classes.rowHeading}>Why Us</h2>
            <div className={classes.columnA}>
              <h2 className={classes.heading}>Get More Visibility</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </div>

            <div className={classes.columnB}>
              <h2 className={classes.heading}>Organize Your Candidates</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut
              </p>
            </div>

            <div className={classes.columnC}>
              <h2 className={classes.heading}>Verify Thier Abilities</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore
              </p>
            </div>
          </div>
        </section>
      </div>
      <section className={classes.ending}>
        <div className={classes.row}>
          <h2 className={classes.rowHeading}>Companies Who Trust Us</h2>
          <span>
            <img src={companiesImage} alt="Companies Who Trust Us" />
          </span>
        </div>
      </section>
    </Fragment>
  );
};

export default StartingPageContent;
