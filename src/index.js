import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import VirtualScroller from "./VirtualScroller";

/**
 * @amount - Defines the number of items we want to be visible in the viewport
 * @tolerance - Determines the viewport’s outlets, which contains additional items that will be rendered but invisible to the user
 */
const SETTINGS = {
  itemHeight: 20,
  amount: 15, //
  tolerance: 5,
  minIndex: 1,
  maxIndex: 500000,
  startIndex: 1,
};

/**
 * Provides a portion of our dataset to VirtualScroller
 * @param {Number} offset - starting index
 * @param {Number} limit - amount of items to retrieve
 * @returns an array with the data
 */
const getData = (offset, limit) => {
  const data = [];
  const start = Math.max(SETTINGS.minIndex, offset);
  const end = Math.min(offset + limit - 1, SETTINGS.maxIndex);
  if (start <= end) {
    for (let i = start; i <= end; i++) {
      data.push({ index: i, text: `item ${i}` });
    }
  }
  return data;
};

const rowTemplate = (item) => (
  <div className="item" key={item.index}>
    {item.text}
  </div>
);

ReactDOM.render(
  <VirtualScroller
    className="viewport"
    get={getData}
    settings={SETTINGS}
    row={rowTemplate}
  />,
  document.getElementById("root")
);
