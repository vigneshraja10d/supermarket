import React, { Component } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { breakfast, Hamburger, mobile_user } from "../assets";
import Box from "@material-ui/core/Box";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { withOktaAuth } from "@okta/okta-react";

class SuperMarket extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  state = {
    data: {},
    rows: [],
    checked: false,
  };

  constructor(props) {
    super(props);
    // const { cookies } = this.props;

    // this.handleRemoveCookie.bind(cookies);
    this.logout = this.logout.bind(this);
  }

  columns = [
    { field: "company_name", headerName: "CompanyName", width: 230 },
    { field: "product_name", headerName: "ProductName", width: 230 },
    { field: "quantity", headerName: "Quantity", width: 230 },
    {
      field: "description",
      headerName: "Description",
      width: 230,
    },
  ];

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5005/product")
      .then((res) =>
        this.setState({
          rows: res.data.product,
        })
      )
      .catch((err) => console.log("errror", err));
  }

  onRowSelected = ({ data }) => {
    if (data["name"] !== this.state.data["name"]) {
      this.setState({ data });
    } else {
      this.setState({ data: {} });
    }
  };

  // handleRemoveCookie = () => {

  //   const { cookies } = this.props;
  //   console.log("remove", cookies);
  //   cookies.remove("user"); // remove the cookie
  //   this.setState({ user: cookies.get("user") });
  //   window.location.href = "/";
  // };
  async logout() {
    this.props.oktaAuth.tokenManager.clear();
    window.location.href = "/";
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Box display="flex" flexDirection="row" flexWrap="wrap" p={2}>
          {this.state.rows.map((row) => (
            <>
              {row.company_name === "nokia" && (
                <Box p={4}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={mobile_user}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Nokia
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          The Nokia mobile is the best phone of antroid now a
                          days its very good looking and nice features
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              )}

              {row.company_name === "burger" && (
                <Box p={4}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={Hamburger}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Hamburger
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          The Burger in this Restaurants is the very good in
                          taste and quality ever
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              )}

              {row.company_name === "food" && (
                <Box p={4}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={breakfast}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          BreakFast
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          The best breakfast with high quality of food to be
                          serverd here
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              )}
            </>
          ))}
        </Box>
        <Box>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            onClick={this.logout}
          >
            LOGOUT
          </Button>
        </Box>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    maxWidth: 385,
  },
  media: {
    height: 140,
  },
});

const SuperMarketWithStyles = withStyles(useStyles, { withTheme: true })(
  SuperMarket
);

const SuperMarketWithCookies = withCookies(SuperMarketWithStyles);

const Logout = withOktaAuth(SuperMarketWithCookies);

export default Logout;
