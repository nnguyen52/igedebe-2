const axios = require('axios');
const apiConfig = async (endPoint, data) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${process.env.GAME_URL}${endPoint}/`,
      data: `${data}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/plain',
        'Client-ID': `${process.env.GAME_CLIENTID}`,
        Authorization: `Bearer ${process.env.GAME_ACCESSTOKEN}`,
      },
    });
    return { data: res.data };
  } catch (err) {
    return { err: err.message };
  }
};
module.exports = apiConfig;
