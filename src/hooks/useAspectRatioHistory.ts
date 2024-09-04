import { useReducer } from "preact/hooks";
import type { AspectRatioWithFormats } from "../types";

type State = {
  history: AspectRatioWithFormats[];
};

type Action =
  | { type: "ADD_RATIO"; payload: AspectRatioWithFormats }
  | { type: "CLEAR_HISTORY" };

function ratioHistoryReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_RATIO":
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    case "CLEAR_HISTORY":
      return {
        ...state,
        history: [],
      };
    default:
      return state;
  }
}

export default function useAspectRatioHistory() {
  const [state, dispatch] = useReducer(ratioHistoryReducer, { history: [] });

  const addRatio = (ratio: AspectRatioWithFormats) => {
    dispatch({ type: "ADD_RATIO", payload: ratio });
  };

  const clearHistory = () => {
    dispatch({ type: "CLEAR_HISTORY" });
  };

  return {
    history: state.history,
    addRatio,
    clearHistory,
  };
}
