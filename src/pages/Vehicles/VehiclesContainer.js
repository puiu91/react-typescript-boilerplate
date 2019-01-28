import React, { Component } from "react";
import PropTypes from "prop-types";
import className from "classnames";
import { Button, Callout, Intent } from "@blueprintjs/core";

// redux
import { connect } from "react-redux";
import vehiclesModule, { ConnectedVehicleItem } from "Modules/vehicles";

class VehiclesContainer extends Component {
  static propTypes = {
    // data
    vehicles: PropTypes.array.isRequired,
    // functions
    loadVehicles: PropTypes.func.isRequired,
    // ui
    isLoading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    vehicles: [],
    isLoading: false,
  };

  onClickLoad = () => this.props.loadVehicles();

  render() {
    const { vehicles } = this.props;
    const doVehiclesExist = !!vehicles.length;

    return (
      <main>
        <section className="bg-gold">
          <div className="grid-x grid-padding-x grid-padding-y">
            <div className="cell">
              <h1 className="pv3">Vehicles</h1>
            </div>
          </div>
        </section>

        <section className="grid-x grid-padding-x grid-padding-y">
          <div className="cell">
            <div className="flex items-center mb3">
              <h2 className="ma0">Table</h2>&nbsp;
              <Button
                intent={Intent.PRIMARY}
                onClick={this.onClickLoad}
                text="Load Vehicles"
                loading={this.props.isLoading}
              />
            </div>

            <section
              className={className("grid-x", "grid-padding-x", "grid-padding-y", {
                "small-up-2": doVehiclesExist,
                "medium-up-2": doVehiclesExist,
                "large-up-3": doVehiclesExist,
              })}
            >
              {doVehiclesExist ? (
                vehicles.map((vehicle, k) => {
                  return (
                    <div className="cell" key={k}>
                      <ConnectedVehicleItem {...vehicle} />
                    </div>
                  );
                })
              ) : (
                <div className="cell bb b--light-gray">
                  <Callout>No vehicles to display.</Callout>
                </div>
              )}
            </section>
          </div>
        </section>


      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  vehicles: vehiclesModule.selectors.all(state),
});

export default connect(mapStateToProps, {
  loadVehicles: vehiclesModule.operations.loadVehiclesOperation,
})(VehiclesContainer);
