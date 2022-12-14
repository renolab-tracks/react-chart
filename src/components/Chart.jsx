import React from "react";
import Tooltip from "./Tooltip";
import withHover from "../hoc/WithHover";

import Overlay from "react-bootstrap/Overlay";

const SVG_WIDTH = 400;
const SVG_HEIGHT = 300;

function Chart({ hovering, data }) {
  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  const dataYMax = data.reduce(
    (currMax, [_, dataY]) => Math.max(currMax, dataY),
    -Infinity
  );
  const dataYMin = data.reduce(
    (currMin, [_, dataY]) => Math.min(currMin, dataY),
    Infinity
  );
  const dataYRange = dataYMax - dataYMin;

  const numYTicks = 5;

  const barPlotWidth = xAxisLength / data.length;

  return (
    <>
      <Tooltip
        content={"Performance Chart"}
        active={hovering}
        direction="top"
      ></Tooltip>
      <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        {/* X axis */}
        <line
          x1={x0}
          y1={xAxisY}
          x2={x0 + xAxisLength}
          y2={xAxisY}
          stroke="grey"
        />
        <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
          Day
        </text>

        {/* Y axis */}
        <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);

          const yValue = Math.round(
            dataYMax - index * (dataYRange / numYTicks)
          );

          return (
            <g key={index}>
              <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
              <text x={x0 - 5} y={y + 5} textAnchor="end">
                {yValue}
              </text>
            </g>
          );
        })}
        <text x={x0} y={y0 - 8} textAnchor="middle">
          $
        </text>

        {/* Bar plots */}
        {data.map(([day, dataY], index) => {
          const x = x0 + index * barPlotWidth;

          const yRatio = (dataY - dataYMin) / dataYRange;

          const y = y0 + (1 - yRatio) * yAxisLength;
          const height = yRatio * yAxisLength;

          const sidePadding = 10;
          const barDomRef = React.createRef();

          return (
            <g key={index} ref={barDomRef}>
              <rect
                x={x + sidePadding / 2}
                y={y}
                width={barPlotWidth - sidePadding}
                height={height}
              />
              <text
                x={x + barPlotWidth / 2}
                y={xAxisY + 16}
                textAnchor="middle"
              >
                {day}
              </text>
            </g>
          );
        })}
      </svg>
    </>
  );
}

export default Chart;
