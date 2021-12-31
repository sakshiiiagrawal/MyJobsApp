import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Dropdown.module.css";
import AuthContext from "../../store/auth-context";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Dropdown = () => {
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const dropdownHandler = () => {
    setIsActive(!isActive);
  };

  const logoutHandler = () => {
    setIsActive(false);
    authCtx.setToken(null);
    localStorage.clear();
    history.replace("/");
  };

  return (
    <div>
      <div className={classes.dropdownBtn} onClick={dropdownHandler}>
        <ArrowDropDownIcon className={classes.iconStyle} />
      </div>
      {isActive && (
        <div className={classes.bubble}>
          <div className={classes.items} onClick={logoutHandler}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
