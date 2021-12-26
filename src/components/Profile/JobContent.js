import classes from "./JobContent.module.css";
import React, { useState } from "react";
import ApplicantsModal from "./ApplicantsModal";

const JobContent = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const veiwApplicationHandler = () => {
    setModalIsOpen(true);
  };

  return (
    <div className={classes.card}>
      <li className={classes.job}>
        <div>
          <h3>{props.title}</h3>
          <div className={classes.description}>{props.description}</div>
        </div>
        <div className={classes.splitButton}>
          <div className={classes.location}>{props.location}</div>
          <button onClick={veiwApplicationHandler}>View Application</button>
        </div>
      </li>
      {modalIsOpen && <ApplicantsModal jobId={props.id} />}
    </div>
  );
};

export default JobContent;
