import { types as t } from "Modules/planets/actions";

const initialState = {
  hasFailed: false,
  hasDeleted: false,
  isLoading: false,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case t.DELETE_PLANET: {
      return {
        hasFailed: false,
        hasDeleted: false,
        isLoading: true,
      };
    }
    case t.DELETE_PLANET_SUCCESS: {
      return {
        hasFailed: false,
        hasDeleted: true,
        isLoading: false,
      };
    }
    case t.DELETE_PLANET_FAIL: {
      return {
        hasFailed: true,
        hasDeleted: false,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
