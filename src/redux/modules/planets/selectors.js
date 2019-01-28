import { NAMESPACE } from "./constants";

/**
 * state accessors
 */

const getAllIds = state => state.entities[NAMESPACE].byId;
const getAllHashes = state => state.entities[NAMESPACE].byHash;

/**
 * higher order accessor functions
 */

const getPlanets = state => getAllIds(state)
  .map(id => getAllHashes(state)[id]);

const getPlanetById = (state, id) =>
  getPlanets(state) // retrieve planets from state
    .filter(item => item.id === id) // obtain planet matching requested id
    .shift(); // extract first filtered planet from array

export default {
  getPlanets,
  getPlanetById,
};
