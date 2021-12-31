import classes from "./InitialIcon.module.css";
import { useEffect, useState } from "react";

const InitialIcon = (props) => {
  const [initial, setInitial] = useState("");

  useEffect(() => {
    const fullName = "Sakshi";
    const initials = fullName.substring(0, 1).toUpperCase();
    setInitial(initials);
  }, []);

  return (
    <div className={classes.background}>
      <p>{initial}</p>
    </div>
  );
};

export default InitialIcon;
