const ASYNC_MINIMUM_DELAY = 1000;
const API_ENDPOINTS = {
  /**
   * internal
   */

  APPLICATION: process.env.ACME_APPLICATION_API,

  /**
   * external
   */
  SWAPI: "https://swapi.co/api",
};

export { ASYNC_MINIMUM_DELAY, API_ENDPOINTS };
