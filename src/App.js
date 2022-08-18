import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Chart from "./components/Chart";
import withHover from "./hoc/WithHover";
import Hover from "./components/Hover";
import Layout from "./layouts/Layout";

class App extends React.Component {
  constructor() {
    super();

    this.ChartWithHover = withHover(Chart, "hovering");
    this.state = {
      data: [
        ["Mon", 12],
        ["Tue", 14],
        ["Wed", 12],
        ["Thu", 4],
        ["Fri", 5],
        ["Sat", 18],
        ["Sun", 0],
      ],
    };
  }

  render() {
    const ChartWithHover = this.ChartWithHover;
    return (
      <>
        <Layout>
          <ChartWithHover data={this.state.data} />
          <Hover>
            {(hovering) => <Chart data={this.state.data} hovering={hovering} />}
          </Hover>
          <Hover>
            {(hovering) => <Chart data={this.state.data} hovering={hovering} />}
          </Hover>
        </Layout>
      </>
    );
  }
}

export default App;
