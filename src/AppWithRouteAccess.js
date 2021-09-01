import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { oktaAuthConfig, oktaSignInConfig} from "./Config";
// isPortal
import { History } from "../src/util";
import { Login, SuperMarket,Home } from "../src/components";
import {Scss} from "../src/stylesheet"

const oktaAuth = new OktaAuth(oktaAuthConfig);


// oktaAuth.authStateManager.subscribe(async (authState) => {
//   if (isPortal.toLowerCase() === "false") {
//     console.log("Inside portal");
//     const session = await oktaAuth.session.get();
//     if (session) {
//       console.log("Inside Session");
//       if (authState.isAuthenticated === false && session.status === "ACTIVE") {
//         await oktaAuth.token.getWithRedirect({
//           responseType: ["token", "id_token"],
//           scopes: ["openid", "profile", "email"],
//         });
//       }
//     }
//   }
// });

const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  History.replace(toRelativeUrl(originalUri, window.location.origin));
};

class AppWithRouterAccess extends Component {
  render() {
    return (
      <Router history={History}>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
          <Route
            exact
            path="/"
            render={() => <Login config={oktaSignInConfig} />}
          />
          <Route path="/implicit/callback" component={LoginCallback} />

          <SecureRoute exact path="/home" component={Home} />

          <SecureRoute exact path="/super-market" component={SuperMarket} />
          <Route path="/scss" component={Scss} />

        </Security>

      </Router>
    );
  }
}

export default AppWithRouterAccess;
