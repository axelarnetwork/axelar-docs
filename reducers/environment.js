import { ENVIRONMENT } from "./types";

export default (
  state = {
    [`${ENVIRONMENT}`]: "mainnet",
  },
  action,
) => {
  switch (action.type) {
    case ENVIRONMENT:
      return {
        ...state,
        [`${ENVIRONMENT}`]: action.value,
      };
    default:
      return state;
  }
};