import React, { Component, Fragment } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { SignIn, SignUp, SuperMarket } from "../src/components";
import { History } from "../src/util";
import PrivateRoute from "./PrivateRoutes";
// import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
// import { oktaAuthConfig, oktaSignInConfig } from "./Config";
import { OktaAuth } from "@okta/okta-auth-js";

function onAuthRequired({ history }) {
  history.push("/login");
}

class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Router history={History}>
          <Security
            oktaAuth={OktaAuth}
            {...oktaAuthConfig}
            onAuthRequired={onAuthRequired}
          >
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp} />
              <PrivateRoute
                exact
                path="/super-market"
                component={SuperMarket}
              />
           

              {/* <Route
                path="/login"
                render={() => <Login config={oktaSignInConfig} />}
              /> */}
              <Route path="/login/callback" component={LoginCallback} />
            </Switch>
          </Security>
        </Router>
      </Fragment>
    );
  }
}

export default Routes;
