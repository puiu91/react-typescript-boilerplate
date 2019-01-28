import { types as t } from "Modules/planets/actions";

const initialState = {
  hasFailed: false,
  isLoading: false,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case t.UPLOAD_PLANET: {
      return {
        hasFailed: false,
        isLoading: true,
      };
    }
    case t.UPLOAD_PLANET_SUCCESS: {
      return {
        hasFailed: false,
        isLoading: false,
      };
    }
    case t.UPLOAD_PLANET_FAIL: {
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
