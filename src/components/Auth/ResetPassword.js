import axios from "axios";

import { useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const history = useHistory();
  const passwordInputRef = useRef();
  const confirmPwdInputRef = useRef();

  const { enteredEmail } = useParams();

  const [errorMsg, setErrorMsg] = useState("");
  const [gotError, setGotError] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPwd = confirmPwdInputRef.current.value;

    if (enteredPassword.trim() === "" && enteredConfirmPwd.trim() === "") {
      return;
    }

    axios
      .get(
        `https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email=${enteredEmail}`
      )
      .then((response) => {
        console.log(response);
        const newToken = response.data.data.token;
        console.log(newToken);

        axios
          .post("https://jobs-api.squareboat.info/api/v1/auth/resetpassword", {
            password: enteredPassword,
            confirmPassword: enteredConfirmPwd,
            token: newToken,
          })
          .then((response) => {
            history.replace("/login");
            console.log(response);
          })
          .catch((error) => {
            let errorMessage = "Invalid credentials.";
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
      });
  };

  return (
    <section className={classes.resetPassword}>
      <h1>Reset your Password?</h1>
      <p>Enter your new password below.</p>
      <form onSubmit={submitHandler}>
        <div className={gotError ? classes.invalid : classes.control}>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            ref={passwordInputRef}
            id="newPassword"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className={gotError ? classes.invalid : classes.control}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            ref={confirmPwdInputRef}
            id="confirmPassword"
            placeholder="Enter your password"
            required
          />
          {gotError && <p className={classes.errorText}>{errorMsg}</p>}
        </div>
        <div className={classes.actions}>
          <button>Reset</button>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;
