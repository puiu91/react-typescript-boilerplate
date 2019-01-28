import api from "Utils/api";
import delay from "../../../utils/delay";
import { actions as a } from "./actions";

/**
 *
 * local utils
 *
 */

const extractIdFromUrl = url =>
  url
    .split("/") // break url into string parts
    .filter(p => !!p) // remove empty elements
    .pop(); // take last el

const prepareSwapiData = data =>
  data.map(item => ({ ...item, id: extractIdFromUrl(item.url) }));

/**
 *
 * async operations
 *
 */

const { swapi } = api.resources.external;

async function fetchVehicles() {
  const route = swapi.vehicles.all();
  const response = await fetch(route);
  const { results } = await response.json();
  return results;
}

// prettier-ignore
const loadVehiclesOperation = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(a.loadBegin());
      dispatch(a.loadSuccess(
        prepareSwapiData(
          await fetchVehicles())
        )
      );
    } catch (e) {
      dispatch(a.loadFail());
      throw e;
      if (process.env.NODE_ENV === "development") {
        throw e;
      }
    }
  };
};

async function fetchDeleteVehicle(id) {
  // no local api so just return a delayed promise to simulate server api call
  return await delay(api.minimumDuration);
}

const deleteVehicleOperation = id => {
  return async (dispatch, getState) => {
    try {
      dispatch(a.removeBegin(id));
      await fetchDeleteVehicle(id);
      dispatch(a.removeSuccess(id)); // dispatch id only once http fetch completed without errors
    } catch (e) {
      dispatch(a.removeFail(id));
      throw e;
      if (process.env.NODE_ENV === "development") {
        throw e;
      }
    }
  };
};

export default {
  loadVehiclesOperation,
  deleteVehicleOperation,
};
