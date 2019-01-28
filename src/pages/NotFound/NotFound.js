import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NotFound = ({ location }) => (
  <main className="grid-x grid-padding-x">
    <h2>Page not found</h2>
    <div className="alert callout">
      <ul className="no-bullet">
        <li>
          Could not find specified page with pathname of{" "}
          <code>{location.pathname}</code> &ndash; go back or return to the{" "}
          <Link to="/">
            <strong>Home</strong>
          </Link>{" "}
          page.
        </li>
      </ul>
    </div>
  </main>
);

NotFound.propTypes = {
  location: PropTypes.object.isRequired,
};

export default NotFound;
