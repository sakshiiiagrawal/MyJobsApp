import axios from "axios";
import { useState, useRef, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [gotError, setGotError] = useState(false);
  const authCtx = useContext(AuthContext);
  // const history = useHistory();

  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@") && value.trim() !== "";

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

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    axios
      .post("https://jobs-api.squareboat.info/api/v1/auth/login", {
        email: enteredEmail,
        password: enteredPassword,
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        if (data.success) {
          authCtx.login(data.data.token);
          console.log(data.data.token);
          // console.log(authCtx.isLoggedIn);
          // history.replace("/profile");
        }

        resetEmailInput();
        resetPasswordInput();
      })
      .catch((error) => {
        let errorMessage = "Invalid email address or password.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }
        setErrorMsg(errorMessage);
        setGotError(true);
      });
  };

  return (
    <section className={classes.login}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div
          className={
            passwordInputIsInvalid || emailInputIsInvalid || gotError
              ? classes.invalid
              : classes.control
          }
        >
          <label htmlFor="email">Email address</label>
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
        </div>
        <div
          className={
            passwordInputIsInvalid || emailInputIsInvalid || gotError
              ? classes.invalid
              : classes.control
          }
        >
          <label htmlFor="password">Password</label>
          <Link to={"/forgotpassword"} className={classes.forgotPwd}>
            Forgot Password
          </Link>
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
          {(passwordInputIsInvalid || emailInputIsInvalid) && (
            <p className={classes.errorText}>These fields cannot be empty.</p>
          )}
          {gotError && <p className={classes.errorText}>{errorMsg}</p>}
        </div>
        <div className={classes.actions}>
          <button>Login</button>
          <span className={classes.toggle}>
            New to MyJobs?
            <Link className={classes.navLink} to={"/signup"}>
              Create an account
            </Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
