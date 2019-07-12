import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button } from "semantic-ui-react";

export class HomeScreen extends Component {
  render() {
    return (
      <div>
        <h2>Home Screen is here</h2>
        <Button
          primary
          onClick={() => {
            this.props.history.push("/movie", { isValid: true });
          }}
        >
          Go to /movie
        </Button>
      </div>
    );
  }
}

export default withRouter(HomeScreen);
