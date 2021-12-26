import React, { useState, useEffect, useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./ApplicantsModal.module.css";
import ApplicantCard from "./ApplicantCard";
import NoApplicantsFound from "./NoApplicantsFound";
import AuthContext from "../../store/auth-context";

const ApplicantsModal = (props) => {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchApplicant = async () => {
      const response = await fetch(
        `https://jobs-api.squareboat.info/api/v1//recruiters/jobs/${props.jobId}/candidates`,
        {
          method: "GET",
          headers: {
            Authorization: authCtx.token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const resData = responseData.data;
      const loadedApplicants = [];

      for (const key in resData) {
        loadedApplicants.push({
          key: key,
          id: resData[key].id,
          name: resData[key].name,
          email: resData[key].email,
          skills: resData[key].skills,
        });
      }

      setApplicants(loadedApplicants);
      setIsLoading(false);
    };

    fetchApplicant().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [props.jobId]);

  if (isLoading) {
    return (
      <section className={styles.loadingApplicant}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.applicantError}>
        <p>{httpError}</p>
      </section>
    );
  }

  let showContent, countText;

  if (applicants.length > 0) {
    showContent = applicants.map((applicant) => (
      <ApplicantCard
        key={applicant.key}
        id={applicant.id}
        name={applicant.name}
        email={applicant.email}
        skills={applicant.skills}
      />
    ));
    countText = `Total ${applicants.length} applicants`;
  } else {
    showContent = <NoApplicantsFound />;
    countText = "0 applicants";
  }

  return (
    <Modal onClose={props.onClose}>
      <React.Fragment>
        <section className={styles.applicants}>
          <h2>Applicants for this job</h2>
          <button onClick={props.onClose}>X</button>
          <h3>{countText}</h3>
          <ul>{showContent}</ul>
        </section>
      </React.Fragment>
    </Modal>
  );
};

export default ApplicantsModal;
