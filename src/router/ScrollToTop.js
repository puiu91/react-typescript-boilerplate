import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  static propTypes = {
    // react-router props
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,

    // other
    children: PropTypes.node,
  };

  componentDidUpdate(prevProps) {
    const { location: currLocation } = this.props;
    const { location: prevLocation } = prevProps.location;

    if (currLocation !== prevLocation) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
