import React, { Component } from "react";

import puzzleIcon from "Images/invoice.svg";
import listImage from "Images/clipboard.png";
import shippingBox from "Images/shippingBox.js";

/**
 * Responsible for main loading page.
 */
class Home extends Component {
  render() {
    return (
      <main>
        <section className="bg-lightest-blue">
          <div className="grid-x grid-padding-x grid-padding-y">
            <div className="cell">
              <div className="pv3">
                <h1>Home Splash</h1>
                <p className="pt-ui-text-large">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cell bb b--light-gray">
          <div className="grid-x grid-padding-x grid-padding-y">
            <div className="cell">
              <h2>Importing Media Files</h2>
            </div>
          </div>

          <div className="grid-x grid-padding-x grid-padding-y small-up-2 medium-up-3">
            <div className="cell">
              <div className="pt-card pt-elevation-1">
                <h5>Importing an SVG Icon</h5>
                <p>Should render inline as a base64 string</p>
                <img src={puzzleIcon} />
              </div>
            </div>
            <div className="cell">
              <div className="pt-card pt-elevation-1">
                <h5>Importing a base64 image</h5>
                <p>Importing a base64 image stored in a Javascript file</p>
                <img src={shippingBox} />
              </div>
            </div>
            <div className="cell">
              <div className="pt-card pt-elevation-1">
                <h5>Importing a PNG Image</h5>
                <p>Image will be loaded from path</p>
                <img src={listImage} />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Home;
