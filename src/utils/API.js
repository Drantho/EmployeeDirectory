import axios from "axios";

export default {
  list: () => {
    return axios.get(`https://randomuser.me/api/?results=50`);
  }
};
