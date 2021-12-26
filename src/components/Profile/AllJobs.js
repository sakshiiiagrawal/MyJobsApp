import { useState, useEffect } from "react";
import styles from "./AllJobs.module.css";
import JobContent from "./JobContent";
import NoJobsFound from "./NoJobsFound";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(
        "https://jobs-api.squareboat.info/api/v1/jobs"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const resData = responseData.data;
      const loadedJobs = [];

      for (const key in resData) {
        loadedJobs.push({
          key: key,
          id: resData[key].id,
          title: resData[key].title,
          description: resData[key].description,
          location: resData[key].location,
        });
      }

      console.log(loadedJobs);

      setJobs(loadedJobs);
      setIsLoading(false);
    };

    fetchJobs().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.loadingJobs}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.jobsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  let showContent;

  if (jobs.length > 0) {
    showContent = jobs.map((job) => (
      <JobContent
        key={job.key}
        id={job.id}
        title={job.title}
        description={job.description}
        location={job.location}
      />
    ));
  } else {
    showContent = <NoJobsFound />;
  }

  return (
    <section className={styles.jobs}>
      <h2>Jobs posted by you</h2>
      <ul>{showContent}</ul>
    </section>
  );
};

export default AllJobs;
