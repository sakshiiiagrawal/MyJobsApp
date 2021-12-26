import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NewJobPage from "./pages/NewJobPage";
import AllJobsPage from "./pages/AllJobsPage";
import { useState } from "react";
import AuthContext from "./store/auth-context";

function App() {
  let initToken = localStorage.getItem("token");
  const [token, setToken] = useState(initToken);

  return (
    <Switch>
      <AuthContext.Provider value={{ token, setToken }}>
        <Layout>
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
          <Route path="/newjob">
            <NewJobPage />
          </Route>
          <Route path="/profile">
            <AllJobsPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Layout>
      </AuthContext.Provider>
    </Switch>
  );
}

export default App;
