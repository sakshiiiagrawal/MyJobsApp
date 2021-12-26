import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Link to="/">
          <div className={classes.logo}>MyJobs</div>
        </Link>
        <nav>
          <ul>
            {!isLoggedIn && (
              <li>
                <button>
                  <Link to="/login">Login/Signup</Link>
                </button>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/newjob">Post a Job</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default MainNavigation;
