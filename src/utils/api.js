import qs from "querystring";
import { API_ENDPOINTS, ASYNC_MINIMUM_DELAY } from "Source/config";

let api = {
  /**
   * Fetch settings for CORS get requests.
   * @type {{mode: string, method: string, credentials: string}}
   */
  cors: {
    get: {
      mode: "cors",
      method: "get",
      credentials: "include",
    },
    post: {
      mode: "cors",
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    patch: {
      mode: "cors",
      method: "patch",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    put: {
      mode: "cors",
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  },

  /**
   * @type {{ endpoint: string }}
   */
  endpoint: API_ENDPOINTS,
  minimumDuration: ASYNC_MINIMUM_DELAY,
  resources: {
    external: {
      swapi: {
        planets: {
          all() {
            return `${API_ENDPOINTS.SWAPI}/planets`;
          },
          get(planetId) {
            return `${API_ENDPOINTS.SWAPI}/planets/${planetId}`;
          },
        },
        vehicles: {
          all() {
            return `${API_ENDPOINTS.SWAPI}/vehicles`;
          },
          get(vehicleId) {
            return `${API_ENDPOINTS.SWAPI}/vehicles/${vehicleId}`;
          },
        },
      },
    },
    internal: {
      comments: {
        all() {
          return `${API_ENDPOINTS.APPLICATION}/comments`;
        },
        get(commentId) {
          return `${API_ENDPOINTS.APPLICATION}/comments/${commentId}`;
        },
      },
    },
  },
};

export default api;
