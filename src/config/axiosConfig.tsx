import axios from "axios";

let csrfToken: string | null = null;

export const setCsrfToken = (token: string) => {
  csrfToken = token;
};

axios.interceptors.request.use(
  (config) => {
    if (["post", "delete", "patch", "put"].includes(config.method || "")) {
      if (csrfToken) {
        config.headers["X-CSRF-Token"] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
