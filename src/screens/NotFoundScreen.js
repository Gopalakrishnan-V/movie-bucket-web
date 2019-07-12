import React, { Component } from "react";

export class NotFoundScreen extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h2>Resource you are looking for is not found</h2>
      </div>
    );
  }
}

export default NotFoundScreen;
