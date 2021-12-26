import classes from "./NewJob.module.css";

import axios from "axios";
import { useContext, useRef } from "react";
import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";

const NewJob = () => {
  const jobTitleInputRef = useRef();
  const descriptionInputRef = useRef();
  const locationInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const isNotEmpty = (value) => value.trim() !== "";

  const {
    value: enteredJobTitle,
    isValid: enteredJobTitleIsValid,
    hasError: jobTitleInputIsInvalid,
    valueChangeHandler: jobTitleInputChangeHandler,
    inputBlurHandler: jobTitleInputBlurHandler,
    reset: resetJobTitleInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputIsInvalid,
    valueChangeHandler: descriptionInputChangeHandler,
    inputBlurHandler: descriptionInputBlurHandler,
    reset: resetDescriptionInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredLocation,
    isValid: enteredLocationIsValid,
    hasError: locationInputIsInvalid,
    valueChangeHandler: locationInputChangeHandler,
    inputBlurHandler: locationInputBlurHandler,
    reset: resetLocationInput,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    enteredJobTitleIsValid &&
    enteredDescriptionIsValid &&
    enteredLocationIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    var postData = {
      title: enteredJobTitle,
      description: enteredDescription,
      location: enteredLocation,
    };

    let axiosConfig = {
      headers: {
        Authorization: authCtx.token,
      },
    };

    axios
      .post(
        "https://jobs-api.squareboat.info/api/v1/jobs/",
        postData,
        axiosConfig
      )
      .then((response) => {
        console.log(response);
      });

    resetJobTitleInput();
    resetDescriptionInput();
    resetLocationInput();
  };

  const dataIsInvalid =
    jobTitleInputIsInvalid ||
    descriptionInputIsInvalid ||
    locationInputIsInvalid;

  return (
    <section className={classes.newJob}>
      <h1>Post a Job</h1>
      <form onSubmit={submitHandler}>
        <div className={dataIsInvalid ? classes.invalid : classes.control}>
          <label htmlFor="jobTitle">Job Title*</label>
          <input
            type="text"
            ref={jobTitleInputRef}
            id="jobTitle"
            placeholder="Enter job title"
            required
            value={enteredJobTitle}
            onChange={jobTitleInputChangeHandler}
            onBlur={jobTitleInputBlurHandler}
          />
        </div>
        <div className={dataIsInvalid ? classes.invalid : classes.control}>
          <label htmlFor="description">Description*</label>
          <input
            type="text"
            ref={descriptionInputRef}
            className={classes.description}
            id="description"
            placeholder="Enter job description"
            required
            value={enteredDescription}
            onChange={descriptionInputChangeHandler}
            onBlur={descriptionInputBlurHandler}
          />
        </div>
        <div className={dataIsInvalid ? classes.invalid : classes.control}>
          <label htmlFor="location">Location*</label>
          <input
            type="text"
            ref={locationInputRef}
            id="location"
            placeholder="Enter location"
            required
            value={enteredLocation}
            onChange={locationInputChangeHandler}
            onBlur={locationInputBlurHandler}
          />
          {dataIsInvalid && (
            <p className={classes.errorText}>All fields are mandatory.</p>
          )}
        </div>
        <div className={classes.actions}>
          <button disabled={!formIsValid}>Post</button>
        </div>
      </form>
    </section>
  );
};

export default NewJob;
