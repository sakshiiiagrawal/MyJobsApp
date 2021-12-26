import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NewJobPage from "./pages/NewJobPage";
import AllJobsPage from "./pages/AllJobsPage";
// import { useContext } from "react";
// import AuthContext from "./store/auth-context";

function App() {
  // const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPasswordPage />
        </Route>
        <Route path="/resetpassword/:enteredEmail">
          <ResetPasswordPage />
        </Route>
        {/* {authCtx.isLoggedIn && ( */}
        <Route path="/newjob">
          <NewJobPage />
        </Route>
        {/* )} */}
        {/* {authCtx.isLoggedIn && ( */}
        <Route path="/profile">
          <AllJobsPage />
        </Route>
        {/* )} */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
