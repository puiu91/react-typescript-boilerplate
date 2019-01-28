import { NAMESPACE } from "./constants";

/**
 * state accessors
 */

const retrieveIds = state => state.entities[NAMESPACE].byId;
const retrieveHashes = state => state.entities[NAMESPACE].byHash;

/**
 * higher order accessor functions
 */

const all = state => retrieveIds(state).map(id => retrieveHashes(state)[id]);

const byId = (state, id) =>
  all(state) // retrieve items from state
    .filter(item => item.id === id) // obtain item matching requested id
    .shift(); // extract first filtered item from array

export default {
  all,
  byId,
};
