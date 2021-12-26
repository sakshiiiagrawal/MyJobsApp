import React, { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import styles from "./ApplicantsModal.module.css";
import ApplicantCard from "./ApplicantCard";
import NoApplicantsFound from "./NoApplicantsFound";

const ApplicantsModal = (props) => {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchApplicant = async () => {
      const response = await fetch(
        "https://jobs-api.squareboat.info/api/v1/jobs"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const resData = responseData.data;
      const loadedApplicant = [];

      for (const key in resData) {
        loadedApplicant.push({
          key: key,
          id: resData[key].id,
          title: resData[key].title,
          description: resData[key].description,
          location: resData[key].location,
        });
      }

      console.log(loadedApplicant);

      setApplicants(loadedApplicant);
      setIsLoading(false);
    };

    fetchApplicant().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

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
    showContent = applicants.map((job) => (
      <ApplicantCard
        key={job.key}
        id={job.id}
        title={job.title}
        description={job.description}
        location={job.location}
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
          <h3>{countText}</h3>
          <ul>{showContent}</ul>
        </section>
      </React.Fragment>
    </Modal>
  );
};

export default ApplicantsModal;
