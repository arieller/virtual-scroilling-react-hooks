import React, { useState, useEffect, useRef, useCallback } from "react";
import _ from "lodash";

const setInitialState = (settings) => {
  const {
    itemHeight,
    amount,
    tolerance,
    minIndex,
    maxIndex,
    startIndex,
  } = settings;

  const viewportHeight = amount * itemHeight;
  const totalHeight = (maxIndex - minIndex + 1) * itemHeight;
  const toleranceHeight = tolerance * itemHeight;
  const bufferHeight = viewportHeight + 2 * toleranceHeight;
  const bufferedItems = amount + 2 * tolerance;
  const itemsAbove = startIndex - tolerance - minIndex;
  const topPaddingHeight = itemsAbove * itemHeight;
  const bottomPaddingHeight = totalHeight - topPaddingHeight;
  const initialPosition = topPaddingHeight + toleranceHeight;

  return {
    settings,
    viewportHeight,
    totalHeight,
    toleranceHeight,
    bufferHeight,
    bufferedItems,
    topPaddingHeight,
    bottomPaddingHeight,
    initialPosition,
    data: [],
  };
};

export default (props) => {
  const [state, setState] = useState(setInitialState(props.settings));

  const {
    viewportHeight,
    topPaddingHeight,
    bottomPaddingHeight,
    data,
    initialPosition,
  } = state;

  const viewportElement = useRef();

  const runScroller = useCallback(
    ({ target: { scrollTop } }) => {
      const {
        totalHeight,
        toleranceHeight,
        bufferedItems,
        settings: { itemHeight, minIndex },
      } = state;

      const index =
        minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
      const data = props.get(index, bufferedItems);
      const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0);
      const bottomPaddingHeight = Math.max(
        totalHeight - topPaddingHeight - data.length * itemHeight,
        0
      );

      if (
        !_.isEqual(state, {
          ...state,
          topPaddingHeight,
          bottomPaddingHeight,
          data,
        })
      ) {
        setState({ ...state, topPaddingHeight, bottomPaddingHeight, data });
      }
    }, // eslint-disable-next-line
    [props]
  );

  useEffect(() => {
    viewportElement.current.scrollTop = initialPosition;
  }, [initialPosition]);

  useEffect(() => {
    if (initialPosition === 0) {
      runScroller({ target: { scrollTop: 0 } });
    }
  }, [runScroller, initialPosition]);

  return (
    <div
      className="viewport"
      ref={viewportElement}
      onScroll={runScroller}
      style={{ height: viewportHeight }}
    >
      <div style={{ height: topPaddingHeight }} />
      {data.map(props.row)}
      <div style={{ height: bottomPaddingHeight }} />
    </div>
  );
};
