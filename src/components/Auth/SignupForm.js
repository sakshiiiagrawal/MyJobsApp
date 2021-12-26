import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import useInput from "../../hooks/use-input";
import classes from "./SignupForm.module.css";

const SignupForm = () => {
  // const [isRecruiter, setIsRecruiter] = useState(true);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPwdInputRef = useRef();
  const skillsInputRef = useRef();

  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@") && value.trim() !== "";

  const {
    value: enteredFullName,
    isValid: enteredFullNameIsValid,
    hasError: fullNameInputIsInvalid,
    valueChangeHandler: fullNameInputChangeHandler,
    inputBlurHandler: fullNameInputBlurHandler,
    reset: resetFullNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputIsInvalid,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputIsInvalid,
    valueChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredConfirmPwd,
    isValid: enteredConfirmPwdIsValid,
    hasError: confirmPwdInputIsInvalid,
    valueChangeHandler: confirmPwdInputChangeHandler,
    inputBlurHandler: confirmPwdInputBlurHandler,
    reset: resetConfirmPwdInput,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    enteredFullNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPwdIsValid
  ) {
    formIsValid = true;
  }

  // const recruiterSelectHandler = () => {
  //   setIsRecruiter(true);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const enteredSkills = skillsInputRef.current.value;

    axios
      .post("https://jobs-api.squareboat.info/api/v1/auth/register", {
        email: enteredEmail,
        userRole: 0,
        password: enteredPassword,
        confirmPassword: enteredConfirmPwd,
        name: enteredFullName,
        skills: enteredSkills,
      })
      .then((response) => {
        console.log(response);
      });

    resetFullNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetConfirmPwdInput();
  };

  return (
    <section className={classes.signup}>
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="recruiter">I'm a*</label>
          <span>
            <button>Recruiter</button>
          </span>
          <span>
            <button>Candidate</button>
          </span>
        </div>
        <div
          className={fullNameInputIsInvalid ? classes.invalid : classes.control}
        >
          <label htmlFor="name">Full Name*</label>
          <input
            type="text"
            ref={nameInputRef}
            id="fullName"
            placeholder="Enter your full name"
            required
            value={enteredFullName}
            onChange={fullNameInputChangeHandler}
            onBlur={fullNameInputBlurHandler}
          />
          {fullNameInputIsInvalid && (
            <p className={classes.errorText}>This field is mandatory.</p>
          )}
        </div>
        <div
          className={emailInputIsInvalid ? classes.invalid : classes.control}
        >
          <label htmlFor="email">Email address*</label>
          <input
            type="email"
            ref={emailInputRef}
            id="email"
            placeholder="Enter your email"
            required
            value={enteredEmail}
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
          />
          {emailInputIsInvalid && (
            <p className={classes.errorText}>Invalid email address.</p>
          )}
        </div>
        <div
          className={passwordInputIsInvalid ? classes.invalid : classes.control}
        >
          <label htmlFor="password">Create Password*</label>
          <input
            type="password"
            ref={passwordInputRef}
            id="password"
            placeholder="Enter your password"
            required
            value={enteredPassword}
            onChange={passwordInputChangeHandler}
            onBlur={passwordInputBlurHandler}
          />
          <br></br>
          {passwordInputIsInvalid && (
            <p className={classes.errorText}>This field is mandatory.</p>
          )}
        </div>
        <div
          className={
            confirmPwdInputIsInvalid ? classes.invalid : classes.control
          }
        >
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            type="password"
            ref={confirmPwdInputRef}
            id="confirmPassword"
            placeholder="Enter your password"
            required
            value={enteredConfirmPwd}
            onChange={confirmPwdInputChangeHandler}
            onBlur={confirmPwdInputBlurHandler}
          />
          {confirmPwdInputIsInvalid && (
            <p className={classes.errorText}>This field is mandatory.</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            ref={skillsInputRef}
            id="skills"
            placeholder="Enter comma separated skills"
          />
        </div>
        <div className={classes.actions}>
          <button disabled={!formIsValid}>Signup</button>
          <span className={classes.toggle}>
            Have an account?
            <Link className={classes.navLink} to={"/sign-up"}>
              Login
            </Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
