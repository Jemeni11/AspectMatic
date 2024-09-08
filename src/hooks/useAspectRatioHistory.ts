import { useReducer } from "preact/hooks";
import type { HistoryAspectRatio } from "../types";

type State = {
  history: HistoryAspectRatio[];
};

type Action =
  | { type: "ADD_RATIO"; payload: HistoryAspectRatio }
  | { type: "CLEAR_HISTORY" };

function ratioHistoryReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_RATIO": {
      const payload = action.payload;

      // Create a key for the new ratio to check for duplicates
      const newRatioKey = `${payload.nodeName}-${payload.aspectRatio}`;

      // Check if the new ratio already exists in the history
      const exists = state.history.some(
        (item) => `${item.nodeName}-${item.aspectRatio}` === newRatioKey,
      );

      if (exists) return state;

      return {
        history: [...state.history, payload],
      };
    }

    case "CLEAR_HISTORY":
      return {
        history: [],
      };

    default:
      return state;
  }
}

export default function useAspectRatioHistory() {
  const [state, dispatch] = useReducer(ratioHistoryReducer, { history: [] });

  const addRatio = (ratio: HistoryAspectRatio) => {
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
