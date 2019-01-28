import React from "react";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const servedPath = process.env.ACME_SERVED_PATH

export default function(App) {
  return (
    <BrowserRouter basename={servedPath}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  );
}
