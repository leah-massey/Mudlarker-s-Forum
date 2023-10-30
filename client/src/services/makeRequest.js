// helper function that does all of the request for us (makes all other files more simple)
//cleans up code and perfroms task we'd otherwise have to do everywhere in application
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // this will give the cookie to the server
  withCredentials: true,
});

export function makeRequest(url, options) {
  return api(url, options)
    .then((res) => res.data)
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? "Error")
    );
}
