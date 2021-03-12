import locationReducer from "./locationReducer";
import errorReducer from "./errorReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  locationRed: locationReducer,
  errorRed: errorReducer,
});

export default allReducers;
