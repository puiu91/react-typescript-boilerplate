/**
 * Application
 *
 * This component is the application skeleton around the actual pages and
 * contains only code that should be displayed on all pages (e.g. a navigation bar).
 */

import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { Home, VehiclesContainer, NotFound } from "Pages";

import "./Application.scss";

export const Application = () => (
  <div className="grid-container">
    <div className="application-container">
      <header className="application-header">
        <div className="grid-x grid-padding-x grid-padding-y align-middle">
          <div className="auto cell">
            <Link to="/">
              <div className="logo" />
            </Link>
          </div>

          <div className="shrink cell">
            <div className="pt-button-group pt-large">
              <NavLink
                exact
                to="/"
                className="pt-button pt-intent-primary pt-icon-home"
              >
                home
              </NavLink>

              <NavLink
                exact
                to="/vehicles"
                className="pt-button pt-intent-primary pt-icon-drive-time"
              >
                vehicles
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/vehicles" component={VehiclesContainer} />
        <Route component={NotFound} />
      </Switch>

      <footer className="grid-x grid-padding-x grid-padding-y align-middle">
        <div className="cell auto">
          <span className="copyright">Acme Inc.</span>
        </div>
      </footer>
    </div>
  </div>
);

export default Application;
