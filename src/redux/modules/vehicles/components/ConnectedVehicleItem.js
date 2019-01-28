import React from "react";
import { connect } from "react-redux";

// module
import constants from "../constants";
import operations from "../operations";
import VehicleItem from "./VehicleItem";

const ConnectedVehicleItem = connect(
  (state, ownProps) => ({
    // an item is `deleting` if its id is in the delete queue
    isDeleting: state.ui[constants.NAMESPACE].remove.queuedIds.includes(
      ownProps.id
    ),
  }),
  {
    onDelete: operations.deleteVehicleOperation,
  }
)(VehicleItem);

export default ConnectedVehicleItem;
