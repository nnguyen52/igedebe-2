const axios = require('axios');
// workflow:
// to fetch data from IDGB, it requires accessToken
// try fetch data with newAccessToken
//  => if !newAccessToken =>  fetch accessToken and assign newAccessToken=accessToken. then refetch data
let newAccessToken = '';
const fetchDataWithToken = async (endPoint, data) => {
  try {
    const accessToken = await axios({
      method: 'POST',
      url: `https://id.twitch.tv/oauth2/token?client_id=${process.env.GAME_CLIENTID}&client_secret=${process.env.GAME_CLIENT_SECRET}&grant_type=client_credentials`,
    });
    newAccessToken = accessToken.data.access_token;
    const response = await apiConfig(endPoint, data, newAccessToken);
    return response;
  } catch (e) {
    return console.log('error in fetchDataWithToken', e.message);
  }
};
const apiConfig = async (endPoint, data, newToken) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${process.env.GAME_URL}${endPoint}/`,
      data: `${data}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/plain',
        'Client-ID': `${process.env.GAME_CLIENTID}`,
        Authorization: `Bearer ${newToken ? newToken.trim() : newAccessToken.trim()}`,
      },
    });
    return res.data;
  } catch (err) {
    // catch error as initially there accessToken is not available
    // perform an API call to get accessToken then perform apiConfig 1 more time
    const newData = await fetchDataWithToken(endPoint, data);
    return newData;
  }
};
module.exports = apiConfig;
