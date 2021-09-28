import axios from "axios";

export default axios.create({
  baseURL: "http://45.147.179.160:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});