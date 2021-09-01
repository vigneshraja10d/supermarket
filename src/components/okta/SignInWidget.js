import React, { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import {
  Button,
  Typography,
  Container,
  Grid,
  // Link,
  TextField,
} from "@material-ui/core";
// import "./style.scss"
// import {btn} from "./btn.module.scss"


const SignInWidget = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    oktaAuth
      .signInWithCredentials({ username, password })
      .then((res) => {
        const sessionToken = res.sessionToken;
        setSessionToken(sessionToken);
        // sessionToken is a one-use token, so make sure this is only called once
        oktaAuth.signInWithRedirect({ sessionToken });
      })
      .catch((err) => console.log("Found an error", err));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <>
      {/* <Container component="main" maxWidth="xs">
        <div>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label>
                  Username:
                  <TextField
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </label>
              </Grid>
              <Grid item xs={12}>
                <label>
                  Password:
                  <TextField
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </label>
                <input id="submit" type="submit" value="Submit" />
              </Grid>
            </Grid>
          </form>
        </div>
      </Container> */}
      <Container component="main" maxWidth="xs">
        <div>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="UserName"
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>

            <Button
              // className={btn}
              fullWidth
              variant="contained"
              id="submit"
              type="submit"
              value="Submit"
              // onClick={this.handleSetCookie}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
export default SignInWidget;
