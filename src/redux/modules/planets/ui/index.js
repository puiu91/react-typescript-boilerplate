import { combineReducers } from "redux";
import add from "./add";
import load from "./load";
import remove from "./remove";

export default combineReducers({
  [add.constants.NAMESPACE]: add.reducer,
  [load.constants.NAMESPACE]: load.reducer,
  [remove.constants.NAMESPACE]: remove.reducer,
});
