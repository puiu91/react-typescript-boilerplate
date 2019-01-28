import api from "Utils/api";
import delay from "Utils/delay";
import constants from "./constants";

const defaultApiErrorMessage = "Could not communicate with server";

/**
 * action types
 */

const LOAD_PLANETS = `${constants.NAMESPACE}/LOAD_PLANETS`;
const LOAD_PLANETS_SUCCESS = `${constants.NAMESPACE}/LOAD_PLANETS_SUCCESS`;
const LOAD_PLANETS_FAIL = `${constants.NAMESPACE}/LOAD_PLANETS_FAIL`;

const UPLOAD_PLANET = `${constants.NAMESPACE}/UPLOAD_PLANET`;
const UPLOAD_PLANET_SUCCESS = `${constants.NAMESPACE}/UPLOAD_PLANET_SUCCESS`;
const UPLOAD_PLANET_FAIL = `${constants.NAMESPACE}/UPLOAD_PLANET_FAIL`;

const DELETE_PLANET = `${constants.NAMESPACE}/DELETE_PLANET`;
const DELETE_PLANET_SUCCESS = `${constants.NAMESPACE}/DELETE_PLANET_SUCCESS`;
const DELETE_PLANET_FAIL = `${constants.NAMESPACE}/DELETE_PLANET_FAIL`;

/**
 * action creators
 */

const loadPlanets = () => ({ type: LOAD_PLANETS });
const loadPlanetsSuccess = planets => ({
  type: LOAD_PLANETS_SUCCESS,
  payload: planets,
});
const loadPlanetsFail = () => ({ type: LOAD_PLANETS_FAIL });

const uploadPlanet = () => ({ type: UPLOAD_PLANET });
const uploadPlanetSuccess = planet => ({
  type: UPLOAD_PLANET_SUCCESS,
  payload: planet,
});
const uploadPlanetFail = () => ({ type: UPLOAD_PLANET_FAIL });

const deletePlanet = planetId => ({
  type: DELETE_PLANET,
  payload: planetId,
});
const deletePlanetSuccess = () => ({ type: DELETE_PLANET_SUCCESS });
const deletePlanetFail = () => ({ type: DELETE_PLANET_FAIL });

/**
 * async action creators that cause side effects (thunks, epics, etc.)
 */

/**
 *
 *
 * LOAD
 *
 *
 */

async function apiLoadPlanets() {
  const { swapi } = api.resources.external;
  const route = swapi.planets.all();
  const response = await fetch(route);
  return await response.json();
}

const loadPlanetsAsync = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadPlanets());

      const { results: planets } = await apiLoadPlanets();
      await delay(api.minimumDuration);

      // create own id prop using id from each object's `url` prop
      planets.forEach(planet => {
        planet.id = planet.url
          .split("/") // break url into string parts
          .filter(p => !!p) // remove empty elements
          .slice(-1) // take last element
          .shift(); // collapse array to sought after string
      });

      dispatch(loadPlanetsSuccess(planets));
    } catch (e) {
      throw e;
      dispatch(loadPlanetsFail());
    }
  };
};

/**
 *
 *
 * UPLOAD
 *
 *
 */

async function apiLoadPlanet(planetId) {
  const route = api.resources.planets.get(planetId);
  const response = await fetch(route);
  return await response.json();
}

/**
 * @param planetId
 * @return {Function}
 */
function uploadPlanetAsync(planetId) {
  return async function(dispatch, getState) {
    try {
      dispatch(uploadPlanet());
      const planet = await apiLoadPlanet(planetId);
      dispatch(uploadPlanetSuccess(planet));
    } catch (e) {
      dispatch(uploadPlanetFail());
    }
  };
}

/**
 *
 *
 * REMOVE
 *
 *
 */

function deletePlanetAsync(planetId) {
  return async function(dispatch, getState) {
    try {
      dispatch(deletePlanet(planetId));
      dispatch(deletePlanetSuccess());
    } catch (e) {
      dispatch(deletePlanetFail());
    }
  };
}

/**
 * expose internals
 */

const types = {
  LOAD_PLANETS,
  LOAD_PLANETS_SUCCESS,
  LOAD_PLANETS_FAIL,
  UPLOAD_PLANET,
  UPLOAD_PLANET_SUCCESS,
  UPLOAD_PLANET_FAIL,
  DELETE_PLANET,
  DELETE_PLANET_SUCCESS,
  DELETE_PLANET_FAIL,
};

const actions = {
  loadPlanetsAsync,
  uploadPlanetAsync,
  deletePlanetAsync,
};

export { types, actions };
