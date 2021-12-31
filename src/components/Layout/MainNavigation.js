import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Dropdown from "./Dropdown";
import InitialIcon from "./InitialIcon";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [isSignupPage, setIsSignupPage] = useState(false);

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.token || null;

  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    console.log(pathName);
    if (pathName.includes("/signup")) {
      setIsSignupPage(true);
    }
    console.log(isSignupPage);
  }, [pathName]);
  console.log(isSignupPage);

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <NavLink to="/">
          <div className={classes.logo}>MyJobs</div>
        </NavLink>
        <nav>
          <ul>
            {!isLoggedIn && !isSignupPage && (
              <li>
                <button>
                  <NavLink to="/login">Login/Signup</NavLink>
                </button>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/newjob" activeClassName={classes.active}>
                  Post a Job
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/profile">
                  <InitialIcon />
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li className={classes.dropdown}>
                <Dropdown />
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default MainNavigation;
