import React from "react";
import { Route, Redirect } from "react-router-dom";
import CookiesHelper from "./helper/CookiesHelper"

function isLoggedIn() {
  const user = CookiesHelper.Cookies.get("user");
  return user !== null && user !== "undefined" && !!user;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
