const { getBtcRate } = require('./binance');
const { getBlueRate } = require('./bluelytics');
const { parseSatsOrBtc } = require('./utils');

async function parseDataIntoTweet(data) {
  const tweet = {
    id: data.id_str,
    text: data.text,
    parent_id: data.in_reply_to_status_id_str,
    source: data.source,
    user: {
      id: data.user.id_str,
      name: data.user.name,
      screen_name: data.user.screen_name,
      followers_count: data.user.followers_count,
      followers_count: data.user.followers_count,
      profile_picture: data.user.profile_image_url_https,
    },
    type: 'tweet',
    user_name: data.user.id_str,
    timestamp: data.timestamp_ms,
  };

  if (data.retweeted_status) {
    tweet.retweeted = data.retweeted_status.id_str;
    tweet.type = 'retweet';
  } else if (data.quoted_status_id_str) {
    tweet.quoted = data.quoted_status_id_str;
    tweet.type = 'quote';
  } else if (data.in_reply_to_status_id_str) {
    tweet.reply_to = data.in_reply_to_status_id_str;
    tweet.type = 'reply';
  } else {
    tweet.type = 'tweet';
  }

  tweet.transaction = await generateRateData(tweet.text);
  return tweet;
}

async function generateRateData(text) {
  const sats = parseSatsOrBtc(text);
  const blueRate = await getBlueRate();
  const btcRate = await getBtcRate();
  const totalArs = (sats / 100000000) * blueRate * btcRate;

  const res = {
    sats: sats,
    blueRate,
    btcRate,
    totalArs,
  };
  return res;
}

module.exports = { parseDataIntoTweet, generateRateData };
