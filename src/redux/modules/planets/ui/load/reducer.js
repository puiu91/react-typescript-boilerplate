import { types as t } from "Modules/planets/actions";

const initialState = {
  hasFailed: false,
  isLoading: false,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case t.LOAD_PLANETS: {
      return {
        hasFailed: false,
        isLoading: true,
      };
    }
    case t.LOAD_PLANETS_SUCCESS: {
      return {
        hasFailed: false,
        isLoading: false,
      };
    }
    case t.LOAD_PLANETS_FAIL: {
      return {
        hasFailed: true,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
