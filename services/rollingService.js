import axios from "axios";

let BASE_URL = "https://donghoon.tk";

const baseAPI = axios.create({
  baseURL: BASE_URL,
});

const rollingService = {
  getRolling: async () => {
    let res = await baseAPI.get(`/api/rolling`);
    return res.data || [];
  },
  getRollingContent: async (rolling_id) => {
    let res = await baseAPI.get(`/api/rollingcontent?rolling_id=${rolling_id}`);
    console.log(res);
    return res.data || [];
  },

  getRollingByName: async (name, password) => {
    // const name = "ddd";
    // const password = "dd";
    console.log(name, password);
    let res = await baseAPI.get(
      `/api/rolling?name=${encodeURI(name)}&password=${encodeURI(password)}`
    );
    return res.data || [];
  },
  postRolling: async (object) => {
    console.log("ddd");
    await baseAPI
      .post(`/api/rolling`, object)
      .then((res) => {
        console.log(res.data);
        return 1;
      })
      .catch((err) => {
        console.log(err);
        return 0;
      });
  },
  postRollingContent: async (object) => {
    console.log("ddd");
    await baseAPI
      .post(`/api/rollingcontent`, object)
      .then((res) => {
        console.log(res.data);
        return 1;
      })
      .catch((err) => {
        console.log(err);
        return 0;
      });
  },
};

export default rollingService;
