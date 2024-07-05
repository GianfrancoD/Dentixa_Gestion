import axios from "axios";
import PropTypes from "prop-types";

// eslint-disable-next-line no-undef
const API_URL = process.env.API_URL;

export const ServicesAll = (port, id, data, method) => {
  let url = `${API_URL}/${port}`;
  if (id) {
    url += `/${id}`;
  }
  return axios[method](url, data, {
    headers: {
      "content-type": "application/json",
      mode: "no-cache",
      Accept: "application/json",
    },
  });
};

ServicesAll.prototype = {
  method: PropTypes.oneOf(["get", "post", "put", "delete"]).isRequired,
  id: PropTypes.string,
  data: PropTypes.string,
  port: PropTypes.string.isRequired,
};
