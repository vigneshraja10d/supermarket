import { Component } from "react";
import Box from "@material-ui/core/Box";
import * as sass from "./style.module.scss"

class Scss extends Component {
  render() {
    return (
      <div>
        <h1 className={sass.App}>Welcome Scss</h1>
        <Box>working on scss</Box>
      </div>
    );
  }
}


export default Scss;
