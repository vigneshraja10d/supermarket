import { Component } from "react";
import AppleIcon from "@material-ui/icons/Apple";
import AirplayIcon from "@material-ui/icons/Airplay";
import Box from "@material-ui/core/Box";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import { withStyles } from "@material-ui/core/styles";
// import { Redirect } from "react-router-dom";

class Home extends Component {
  handleApplicationA = () => {
    window.location.href = "http://localhost:3001/";
  };

  handleApplicationB = () => {
    alert("Application B");
    window.location.href = "/super-market";
  };

  handleApplicationC = () => {
    alert("Application C");
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h1>Welcome Home</h1>
        <Box flexWrap="wrap" display="flex" justifyContent="center" m={1}>
          <Box p={5}>
            <AppleIcon
              fontSize="large"
              color="primary"
              className={classes.root}
              onClick={this.handleApplicationA}
            />
          </Box>
          <Box p={5}>
            <AirplayIcon
              fontSize="large"
              color="primary"
              className={classes.root}
              onClick={this.handleApplicationB}
            />
          </Box>
          <Box p={5}>
            <TabletMacIcon
              fontSize="large"
              color="primary"
              className={classes.root}
              onClick={this.handleApplicationC}
            />
          </Box>
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

const HomeWithStyles = withStyles(useStyles, { withTheme: true })(Home);
export default HomeWithStyles;
