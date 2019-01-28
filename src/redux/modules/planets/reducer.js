import { combineReducers } from "redux";

import ui from "./ui";
import { types as t } from "./actions";
import { toHashmap, immutablyRemoveProp } from "../../utils";

// Maps array of attachment objects to a hashmap of attachment objects of the
// form  <k = id, v = attachment>
const loadPlanets = (state, { payload: planets }) => ({
  ...state,
  ...toHashmap(planets),
});

const addPlanet = (state, { payload }) => ({
  ...state,
  [payload.id]: payload,
});

/**
 * @typedef {Object} Action A Flux Standard Action (FSA), @see https://github.com/acdlite/flux-standard-action
 * @property {string} type - The action type that was dispatched
 * @property {any} payload - Data passed from an action creator
 */

/**
 * Delete the Planet with the id supplied in the payload.
 *
 * @param {Object} state
 * @param {Action} action
 * @param {string} attachmentId
 * @return {object}
 */
const deletePlanet = (state, { payload: attachmentId }) => {
  return immutablyRemoveProp(state, attachmentId);
};

/**
 *
 *
 * Reducer - Hashmap of attachments <k = id, v = attachment>
 *
 *
 */

function planetsByHash(state = {}, action) {
  switch (action.type) {
    case t.LOAD_PLANETS_SUCCESS:  return loadPlanets(state, action)
    case t.UPLOAD_PLANET_SUCCESS: return addPlanet(state, action)
    case t.DELETE_PLANET:         return deletePlanet(state, action)
    default: return state
  }
}

/**
 *
 *
 * Reducer - Array of attachment ids
 *
 *
 */

// extract all ids from the initial load dataset
const loadPlanetsIds = (state, action) => {
  const { payload } = action;
  return payload.map(item => item.id);
};

// append new id to list of all ids
const addPlanetId = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  return state.concat(id);
};

// remove an id from list of all ids
const deletePlanetId = (state, action) => {
  const { payload } = action;
  return state.filter(id => id !== payload); // return those ids not matching the payload id
};

function planetsById(state = [], action) {
  switch (action.type) {
    case t.LOAD_PLANETS_SUCCESS:  return loadPlanetsIds(state, action)
    case t.UPLOAD_PLANET_SUCCESS: return addPlanetId(state, action)
    case t.DELETE_PLANET:         return deletePlanetId(state, action)
    default: return state
  }
}

/**
 * Entity reducers
 */

const entity = combineReducers({
  byId: planetsById,
  byHash: planetsByHash,
});

/**
 * Root Reducer
 */

export default {
  entity,
  ui,
};
