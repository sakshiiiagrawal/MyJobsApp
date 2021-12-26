import { useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const history = useHistory();
  const emailInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    history.push(`/resetpassword/${enteredEmail}`);
  };

  return (
    <section className={classes.forgotPassword}>
      <h1>Forgot your Password?</h1>
      <p>
        Enter the email associated with your account and we'll send you
        instructions to reset your password.
      </p>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            ref={emailInputRef}
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
