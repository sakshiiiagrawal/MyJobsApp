import classes from "./StartingPageContent.module.css";
import { Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import displayImage from "../../assets/displayPicture.jpg";
import AuthContext from "../../store/auth-context";
import company1 from "../../assets/company1.png";
import company2 from "../../assets/company2.png";
import company3 from "../../assets/company3.png";
import company4 from "../../assets/company4.png";
import company5 from "../../assets/company5.png";
import company6 from "../../assets/company6.png";
import company7 from "../../assets/company7.png";
import company8 from "../../assets/company8.png";
import company9 from "../../assets/company9.png";

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
        <div className={classes.imageContainer}>
          <h2 className={classes.imageHeading}>Companies Who Trust Us</h2>
          <div className={classes.imageRow}>
            <img src={company1} alt="Solaytic" />
            <img src={company2} alt="Cognizant" />
            <img src={company3} alt="Squareboat" />
            <img src={company4} alt="Myntra" />
            <img src={company5} alt="Flipkart" />
          </div>
          <div className={classes.imageRow}>
            <img src={company6} alt="TCS" />
            <img src={company7} alt="Huawei" />
            <img src={company8} alt="Accenture" />
            <img src={company9} alt="Deloitte" />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default StartingPageContent;
