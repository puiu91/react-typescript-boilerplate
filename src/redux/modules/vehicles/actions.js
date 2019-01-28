import { createAction, createActions } from "redux-actions";
import constants from "./constants";

/**
 *
 * actions
 *
 */

// prettier-ignore
const {
  vehicles: {
    load: {
      begin: loadBegin,
      success: loadSuccess,
      fail: loadFail
    },
    add: {
      begin: addBegin,
      success: addSuccess,
      fail: addFail,
    },
    update: {
      begin: updateBegin,
      success: updateSuccess,
      fail: updateFail
    },
    remove: {
      begin: removeBegin,
      success: removeSuccess,
      fail: removeFail
    },
  },
} = createActions({
  VEHICLES: {
    LOAD: {
      BEGIN: undefined,
      SUCCESS: vehicles => vehicles,
      FAIL: undefined,
    },
    ADD: {
      BEGIN: undefined,
      SUCCESS: (id, vehicle) => ({ id, vehicle }),
      FAIL: undefined,
    },
    UPDATE: {
      BEGIN: undefined,
      SUCCESS: (id, vehicle) => ({ id, vehicle }),
      FAIL: undefined,
    },
    REMOVE: {
      BEGIN: id => id,
      SUCCESS: id => id,
      FAIL: id => id,
    },
  },
});

/**
 *
 * action creators
 *
 */

/**
 *
 * export api
 *
 */

const types = {};

const actions = {
  loadBegin,
  loadSuccess,
  addBegin,
  addSuccess,
  addFail,
  loadFail,
  updateBegin,
  updateSuccess,
  updateFail,
  removeBegin,
  removeSuccess,
  removeFail,
};

export { types, actions };
