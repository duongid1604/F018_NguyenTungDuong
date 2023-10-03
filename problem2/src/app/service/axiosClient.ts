import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "https://interview.switcheo.com/prices.json",
  responseType: "json",
  timeout: 50000,
});

export default AxiosClient;
