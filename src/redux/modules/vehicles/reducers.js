import { combineReducers } from "redux";
import { handleAction, handleActions, combineActions } from "redux-actions";
import { actions as a } from "./actions";
import { toHashmap, immutablyRemoveProp } from "../../utils";

const entity = combineReducers({
  byId: handleActions(
    {
      // extracts ids of each object in the payload
      [a.loadSuccess]: (state, { type, payload }) => {
        return payload.map(item => item.id);
      },

      // add the id
      [a.addSuccess]: (state, { payload: { id, vehicle } }) => [...state, id],

      // do nothing for id's on update
      [a.updateSuccess]: state => state,

      // remove the id
      [a.removeSuccess]: (state, { payload }) => {
        return state.filter(id => id !== payload);
      },
    },
    []
  ),
  byHash: handleActions(
    {
      // create a hashmap of each object in the payload
      [a.loadSuccess]: (state, { payload }) => {
        return {
          ...state,
          ...toHashmap(payload),
        };
      },

      // prettier-ignore
      // create a hash <k> for the item or replace existing hash <k>
      // with updated data
      [combineActions(
        a.addSuccess,
        a.updateSuccess
      )]: (state, { paylaod: { id, vehicle } }) => ({
        ...state,
        [id]: vehicle,
      }),

      // removes the <k> from the hashmap <k,v>
      [a.removeSuccess]: (state, { payload: { id } }) => {
        return immutablyRemoveProp(state, id);
      },
    },
    {}
  ),
});

const ui = combineReducers({
  load: handleActions(
    {
      [a.loadBegin]: (state, action) => ({
        ...state,
        hasFailed: false,
        isLoading: true,
      }),
      [a.loadSuccess]: (state, action) => ({
        ...state,
        hasFailed: false,
        isLoading: false,
      }),
      [a.loadFail]: (state, action) => ({
        ...state,
        hasFailed: true,
        isLoading: false,
      }),
    },
    {
      hasFailed: false,
      isLoading: false,
    }
  ),
  add: handleActions(
    {
      [a.addBegin]: (state, action) => ({ ...state, isLoading: true }),
      [a.addFail]: (state, action) => ({ ...state, hasFailed: true }),

      // prettier-ignore
      [combineActions(
        a.addBegin,
        a.addSuccess
      )]: (state, action) => ({
        ...state,
        hasFailed: false,
      }),

      // prettier-ignore
      [combineActions(
        a.addSuccess,
        a.addFail
      )]: state => ({
        ...state,
        isLoading: false,
      })
    },
    {
      hasFailed: false,
      isLoading: false,
    }
  ),
  update: handleActions(
    {
      [a.updateBegin]: (state, action) => ({
        ...state,
        hasFailed: false,
        isLoading: true,
      }),
      [a.updateSuccess]: (state, action) => ({
        ...state,
        hasFailed: false,
        isLoading: false,
      }),
      [a.updateFail]: (state, action) => ({
        ...state,
        hasFailed: true,
        isLoading: false,
      }),
    },
    {
      hasFailed: false,
      isLoading: false,
    }
  ),
  remove: handleActions(
    {
      // append id to the queue
      [a.removeBegin]: (state, { payload: id }) => ({
        ...state,
        hasFailed: false,
        queuedIds: [...state.queuedIds, id],
      }),

      [a.removeSuccess]: (state, { payload: id }) => ({
        ...state,
        hasFailed: false,
      }),

      [a.removeFail]: (state, action) => ({
        ...state,
        hasFailed: true,
      }),

      // prettier-ignore
      // remove the id from the delete queue on success or failure
      [combineActions(
        a.removeSuccess,
        a.removeFail
      )]: (state, { payload: id }) => ({
        ...state,
        queuedIds: [...state.queuedIds].filter(currId => currId !== id),
      })
    },
    {
      hasFailed: false,
      queuedIds: [],
    }
  ),
});

export default { entity, ui };
