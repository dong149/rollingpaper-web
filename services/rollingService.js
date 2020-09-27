import axios from 'axios';

// let BASE_URL = "https://donghoon.tk";

let BASE_URL = 'https://apis.rollingpaper.site';

const baseAPI = axios.create({
  baseURL: BASE_URL,
});

const rollingService = {
  // getRolling: async () => {
  //   let res = await baseAPI.get(`/api/rolling`);
  //   return res.data || [];
  // },
  getRolling: async (rolling_id) => {
    let res = await baseAPI.get(`/api/v1/rolling/${rolling_id}`);
    return res.data || [];
  },
  getRollingContent: async (rolling_id) => {
    let res = await baseAPI.get(`/api/rollingcontent?rolling_id=${rolling_id}`);

    return res.data || [];
  },

  // getRollingByName: async (name, password) => {
  //   // const name = "ddd";
  //   // const password = "dd";

  //   let res = await baseAPI.get(
  //     `/api/rolling?name=${encodeURI(name)}&password=${encodeURI(password)}`
  //   );
  //   return res.data || [];
  // },
  getRolling: async () => {
    let res = await baseAPI.get(`/api/v1/count`);
    return res.data || [];
  },
  getRollingByName: async (name, password) => {
    let res = await baseAPI.get(
      `/api/v1/rolling?receiver=${encodeURI(name)}&password=${encodeURI(
        password
      )}`
    );
    return res.data || [];
  },
  getRollingSticker: async (rolling_id) => {
    let res = await baseAPI.get(`/api/v1/sticker?rollingpaperId=${rolling_id}`);
    return res.data || [];
  },
  postRollingSticker: async (rollingpaperId, x, y, url) => {
    const res = await baseAPI.post(`/api/v1/sticker/`, {
      rollingpaperId,
      x,
      y,
      url,
    });

    const { status, message } = res.data;

    if (status == 200) {
      return message;
    }

    throw Error(message);
  },
  deleteRollingSticker: async (stickerId) => {
    // const res = await baseAPI.delete(`/api/v1/sticker`, {
    //   stickerId,
    // });
    const res = await baseAPI({
      method: 'delete',
      url: '/api/v1/sticker',
      data: {
        stickerId,
      },
    });
    const { status, message } = res.data;

    if (status == 204) {
      return message;
    }

    throw new Error(message);
  },
  // postRolling: async (object) => {
  //   await baseAPI
  //     .post(`/api/rolling`, object)
  //     .then((res) => {
  //       return 1;
  //     })
  //     .catch((err) => {
  //       return 0;
  //     });
  // },
  postRolling: async (receiver, password) => {
    await baseAPI
      .post(`/api/v1/rolling`, {
        receiver,
        password,
      })
      .then((res) => {
        const { status, message } = res.data;

        return { status, message };
      })
      .catch((err) => {
        return 0;
      });
  },

  // postRollingContent: async (object) => {
  //   await baseAPI
  //     .post(`/api/rollingcontent`, object)
  //     .then((res) => {
  //       return 1;
  //     })
  //     .catch((err) => {
  //       return 0;
  //     });
  // },

  postRollingContent: async (
    rolling_id,
    content,
    author,
    font,
    sort,
    color,
    backgroundColor,
    backgroundImage
  ) => {
    // const res = await baseAPI.post(`/api/v1/rolling/${rolling_id}/content`, {
    //   content,
    //   author,
    //   font,
    //   sort,
    //   color,
    //   backgroundColor,
    //   backgroundImage,
    // });
    const formData = new FormData();

    formData.append('content', content);
    formData.append('author', author);
    formData.append('font', font);
    formData.append('sort', sort);
    formData.append('color', color);
    formData.append('backgroundColor', backgroundColor);
    if (backgroundImage !== undefined)
      formData.append('backgroundImage', backgroundImage);

    for (var value of formData.values()) {
    }
    const res = await baseAPI({
      method: 'post',
      url: `/api/v1/rolling/${rolling_id}/content`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      data: formData,
    });
    const { status, message } = res.data;

    if (status == 201) {
      return message;
    }

    throw Error(message);
  },

  deleteRollingContent: async (rolling_id) => {
    const res = await baseAPI.delete(`/api/v1/rolling/content/${rolling_id}`);

    const { status, message } = res.data;

    if (status == 204) {
      return message;
    }

    throw new Error(message);
  },
};

export default rollingService;
