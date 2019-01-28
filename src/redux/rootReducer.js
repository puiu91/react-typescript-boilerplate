import { combineReducers } from "redux";

import planets from "./modules/planets";
import vehicles from "./modules/vehicles";

const entities = combineReducers({
  [planets.constants.NAMESPACE]: planets.reducer.entity,
  [vehicles.constants.NAMESPACE]: vehicles.reducers.entity,
});

const ui = combineReducers({
  [planets.constants.NAMESPACE]: planets.reducer.ui,
  [vehicles.constants.NAMESPACE]: vehicles.reducers.ui,
});

const rootReducer = combineReducers({
  entities,
  ui,
});

export default rootReducer;
