import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider as ReduxProvider } from "react-redux";

/**
 * Application Core
 */

import "Assets/stylesheets/main.scss";
import Application from "Containers/Application";
import Startup from "Containers/Startup";

const NODE_ENV = process.env.NODE_ENV;

/**
 * Configurators
 */

import { configureStore } from "Redux/configureStore";
import createRouter from "./router/createRouter.js";

const MOUNT_NODE = document.getElementById("root");
const GenerateApplication = (store, router) => {
  ReactDOM.render(
    <AppContainer>
      <ReduxProvider store={store}>
        <Startup>
          {router}
        </Startup>
      </ReduxProvider>
    </AppContainer>,
    MOUNT_NODE
  );
};

/**
 * Create application with redux store and router
 */

const store = configureStore();
const router = createRouter(Application);
GenerateApplication(store, router);

// expose internals when debugging
if (NODE_ENV === "development" || NODE_ENV === "staging") {
    (window as any).store = store;
}

/**
 * HMR setup
 */

declare let module: { hot: any };

if (NODE_ENV === "development") {
  // Hot Module Replacement API fires whenever a specific resource is updated
  // and instructs how to handle changes to specific dependencies.
  if (module.hot) {
    module.hot.accept("Containers/Application", () => {
      GenerateApplication(store, router);
    });
  }
}


