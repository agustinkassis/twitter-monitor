const axios = require('axios');

async function getBtcRate() {
  const { data } = await axios.get(
    'https://www.binance.com/api/v1/ticker/price?symbol=BTCUSDT'
  );
  return parseFloat(data.price);
}

module.exports = { getBtcRate };
