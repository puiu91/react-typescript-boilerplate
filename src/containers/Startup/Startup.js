import React, { Component } from "react";
import PropTypes from "prop-types";

// redux
import { connect } from "react-redux";

// components
import { ProgressBar } from "@blueprintjs/core";

/**
 * Responsible for loading all necessary data required for the application on
 * initial load.
 */
class Startup extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    ui: PropTypes.shape({
      hasFailed: PropTypes.bool.isRequired,
      hasLoaded: PropTypes.bool.isRequired,
    }),
  };

  /**
   * Perform asynchronous operations here.
   */
  componentDidMount() {}

  /**
   * Compares current and next ui states to determine if component should
   * update itself.
   *
   * @param nextProps
   * @param nextState
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    const currUi = this.props.ui;
    const nextUi = nextProps.ui;

    if (currUi.hasFailed === nextUi.hasFailed) {
      if (currUi.hasLoaded === nextUi.hasLoaded) {
        return false;
      }
    }

    return true;
  }

  render() {
    const { hasFailed, hasLoaded } = this.props.ui;

    if (hasFailed) {
      this.loadingFailScreen();
    }

    return hasLoaded ? this.props.children : this.loadingScreen();
  }

  static loadingFailScreen() {
    return (
      <div className="grid-container">
        <div className="grid-x grid-padding-x grid-padding-y">
          <div className="cell auto">
            <div className="pt-card">
              <h3>{process.env.ACME_APPLICATION_NAME}</h3>
              <hr />
              <div className="pt-callout pt-intent-danger">
                <h5>Error</h5>
                Application failed to load.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  static loadingScreen() {
    return (
      <div className="grid-container">
        <div className="grid-x grid-padding-x grid-padding-y">
          <div className="cell auto">
            <div className="pt-card">
              <h3>Application Name</h3>
              <hr />
              <h5>Loading Application</h5>
              <ProgressBar value={1} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Merge different ui loading states into one object so that the Startup
// component is not completed until all ui loading states are completed.
const mapStateToProps = state => {

  /*

  uncomment this line when you need to merge multiple ui states into one

  const a = state.ui.loadUser
  const b = state.ui.loadMaps

  // merging ui properties from two different sections
  const hasFailed = a.hasFailed || b.hasFailed // whichever data slice fails to load
  const hasLoaded = a.hasLoaded && b.hasLoaded // both slices must be available in store

  const ui = {
    hasFailed,
    hasLoaded,
  }

  return { ui }

  */

  return {
    ui: {
      hasFailed: false,
      hasLoaded: true,
    },
  };
};

export default connect(mapStateToProps)(Startup);
