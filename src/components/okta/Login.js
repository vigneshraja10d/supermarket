import React from "react";
import { Redirect } from "react-router-dom";
// import OktaSignInWidget from "./OktaSignInWidget";
import SignInWidget from "./SignInWidget";
import { useOktaAuth } from "@okta/okta-react";

import { Box } from "@material-ui/core";

const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("error logging in", err);
  };

  if (authState.isPending) return null;

  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    <Box m={5}>
      <SignInWidget
        config={config}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Box>
  );
};
export default Login;
