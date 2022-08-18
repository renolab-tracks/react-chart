import React from "react";
import Card from "./Card";

class Hello extends React.Component {
  componentDidMount() {
    // Invoked once the component is mounted to the DOM.
    // Good for making AJAX requests.
    console.log("Hello componentDidMount");
  }
  render() {
    return (
      <h1
        className={`test class ${this.props.authed ? "auth" : "unauth"}`}
        onClick={this.props.clickHandler}
      >
        Hello, {this.props.name}
      </h1>
    );
  }
}

export default Hello;
