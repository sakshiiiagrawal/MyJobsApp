import { useState, useEffect, useContext } from "react";
import classes from "./AllJobs.module.css";
import JobContent from "./JobContent";
import NoJobsFound from "./NoJobsFound";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const AllJobs = () => {
  const [jobs, setJobsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!authCtx.token) {
      history.replace("/");
    }

    const fetchJobs = async () => {
      const response = await fetch(
        "https://jobs-api.squareboat.info/api/v1/recruiters/jobs",
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

      console.log(responseData);

      const loadedJobs = [];

      if (responseData?.data?.data) {
        const resData = responseData.data.data;
        for (const key in resData) {
          loadedJobs.push({
            key: key,
            id: resData[key].id,
            title: resData[key].title,
            description: resData[key].description,
            location: resData[key].location,
          });
        }
      }

      setJobsArr(loadedJobs);
      setIsLoading(false);

      console.log(jobs);
    };

    fetchJobs().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loadingJobs}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.jobsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  console.log(jobs);

  let showContent;

  const jobsPerPage = 3;
  const pagesVisited = pageNumber * jobsPerPage;
  const pageCount = Math.ceil(jobs.length / jobsPerPage);
  const changePageHander = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayJobs = jobs
    .slice(pagesVisited, pagesVisited + jobsPerPage)
    .map((job) => (
      <JobContent
        key={job.key}
        id={job.id}
        title={job.title}
        description={job.description}
        location={job.location}
      />
    ));

  if (jobs.length > 0) {
    showContent = displayJobs;
  } else {
    showContent = <NoJobsFound />;
  }

  return (
    <section className={classes.jobs}>
      <h2 className={classes.jobHeading}>Jobs posted by you</h2>
      <ul>{showContent}</ul>
      {jobs.length > 0 && (
        <ReactPaginate
          previousLabel={<ArrowLeftIcon />}
          nextLabel={<ArrowRightIcon />}
          pageCount={pageCount}
          onPageChange={changePageHander}
          containerClassName={classes.paginationBtns}
          previousLinkClassName={classes.previousBtn}
          nextLinkClassName={classes.nextBtn}
          disabledClassName={classes.paginationDisabled}
          activeClassName={classes.paginationActive}
        />
      )}
    </section>
  );
};

export default AllJobs;
