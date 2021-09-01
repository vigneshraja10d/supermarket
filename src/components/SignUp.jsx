import React, { Component } from "react";
import {
  Button,
  Container,
  Typography,
  Link,
  Grid,
  TextField,
} from "@material-ui/core";
import axios from "axios";

class SignUp extends Component {
  state = {
    name: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    msg: "",
    open: false,
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

    axios
      .post("http://127.0.0.1:5005/user", null, { params: this.state })
      .then((res) => {
        if (!res.data.fine) {
          this.setState({ msg: res.data.msg });
        } else {
          this.setState({ msg: "registered sucessfully" });
          window.location.href = "/";
        }
      })
      .catch((err) => console.log("errror", err));
  };

  render() {
    const { name, firstname, lastname, email, password } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <div>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                  value={name}
                  onInput={this.onInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="firstname"
                  name="firstname"
                  value={firstname}
                  onInput={this.onInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="lastname"
                  label="lastname"
                  value={lastname}
                  onInput={this.onInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="email"
                  name="email"
                  value={email}
                  onInput={this.onInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  value={password}
                  onInput={this.onInput}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained">
              Sign Up
            </Button>
            {this.state.msg && this.state.msg !== "" && (
              <Typography>{this.state.msg}</Typography>
            )}
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default SignUp;
