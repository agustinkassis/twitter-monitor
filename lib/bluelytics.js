const axios = require('axios');

async function getBlueRate() {
  const { data } = await axios.get('https://api.bluelytics.com.ar/v2/latest');
  return data.blue.value_avg;
}

module.exports = { getBlueRate };
