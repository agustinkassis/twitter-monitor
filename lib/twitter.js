var Twitter = require('twitter');
const config = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

var client = new Twitter(config);

function startTracking(keywords, cb) {
  console.info('Starting to track...', keywords);
  return client.stream(
    'statuses/filter',
    { track: keywords },
    function (stream) {
      stream.on('data', function (event) {
        cb(event);
      });

      stream.on('error', function (error) {
        console.dir(error);
        // throw error;
      });
    }
  );
}

function replyTweet(tweetId, text) {
  return client.post('statuses/update', {
    in_reply_to_status_id: tweetId,
    status: text,
  });
}

function likeTweet(tweetId) {
  return client.post('favorites/create', {
    id: tweetId,
  });
}

function retweetTweet(tweetId) {
  return client.post('statuses/retweet/' + tweetId, {});
}

module.exports = { startTracking, replyTweet, likeTweet, retweetTweet };
