import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Button,
  Card,
  Callout,
  Intent,
  Elevation,
  Tag,
} from "@blueprintjs/core";

const VehicleItem = ({
  id,
  name,
  model,
  manufacturer,
  created,
  isDeleting,
  onDelete,
}) => (
  <Card elevation={Elevation.ONE}>
    <div className="flex items-center justify-between mb2">
      <h6 className="ma0">{name}</h6>
      &nbsp;
      <Button
        className="pt-small"
        intent={Intent.DANGER}
        loading={isDeleting}
        onClick={e => onDelete(id)}
      >
        &#10006;
      </Button>
    </div>

    <Callout>
      <Tag>Model</Tag>&nbsp;{model}
    </Callout>

    <Callout>
      <Tag>Manufacturer</Tag>&nbsp;{manufacturer}
    </Callout>

    <Callout>
      <Tag>Created At</Tag>&nbsp;{moment(created).isValid()
        ? moment(created).format("MMM DD, YYYY [at] HH:MM")
        : "created on n/a"}
    </Callout>
  </Card>
);

VehicleItem.propTypes = {
  // data
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  manufacturer: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  // ui
  isDeleting: PropTypes.bool.isRequired,
  // functions
  onDelete: PropTypes.func.isRequired,
};

export default VehicleItem;
