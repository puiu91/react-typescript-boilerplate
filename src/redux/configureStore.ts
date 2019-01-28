import { applyMiddleware, createStore } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

function configureStore(initialState: object = {}): object {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    thunk,
    sagaMiddleware,
    createLogger(),
    reduxImmutableStateInvariant(),
  ];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export { configureStore };
