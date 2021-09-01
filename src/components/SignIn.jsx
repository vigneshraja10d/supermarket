import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import {
  Button,
  Typography,
  Container,
  Grid,
  Link,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import CookiesHelper from "../helper/CookiesHelper";

class SignIn extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  state = {
    name: "",
    password: "",
    open: false,
    errors: false,
    msg: "",
    user: this.props.cookies.get("user") || "",
  };

  onInput = ({ target: { name, value } }) => {
    const { open } = this.state;
    if (open) {
      this.setState((prevState) => ({
        open: !prevState.open,
      }));
    }
    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { user, error } = this.state;

    axios
      .get("http://127.0.0.1:5005/user/verify", { params: this.state })
      .then((res) => {
        if (res.data.fine) {
          const { cookies } = this.props;
          cookies.set("user", this.state.name, { path: "/" }); // set the cookie
          this.setState({ user: cookies.get("user") });
          window.location.href = "/super-market";
        } else {
          this.setState({ msg: res.data.msg });
        }
      })
      .catch((err) => console.log("errror", err));

    if (user) {
      CookiesHelper.CollectiveCookies.setAll([{ key: "user", value: user }]);
    } else if (error) {
      this.setState({
        msg: error,
        progress: false,
        open: true,
      });
    }
  };

  // handleSetCookie = () => {
  //   const { cookies } = this.props;
  //   cookies.set("user", this.state.name, { path: "/" }); // set the cookie
  //   this.setState({ user: cookies.get("user") });
  // };

  render() {
    const { name, password } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <div>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="name"
                  name="name"
                  value={name}
                  onInput={this.onInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onInput={this.onInput}
                />
              </Grid>
            </Grid>
            {this.state.msg && this.state.msg !== "" && (
              <Typography>{this.state.msg}</Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={this.handleSetCookie}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withCookies(SignIn);
