require('dotenv').config();

const {
  startTracking,
  replyTweet,
  likeTweet,
  retweetTweet,
} = require('./lib/twitter.js');
const { saveTweet } = require('./lib/firebase.js');
const { parseDataIntoTweet } = require('./lib/utils.js');

async function onNewTweet(data) {
  console.info('New Tweet!');
  const tweet = parseDataIntoTweet(data);
  if (tweet.type !== 'tweet') {
    console.info('Skipping type', tweet.type);
  }
  console.dir(tweet);

  console.info('Adding to firebase');
  saveTweet(tweet);

  console.info('Reply tweet');
  replyTweet(tweet.id, generateReply(tweet));

  console.info('Like tweet');
  likeTweet(tweet.id);

  console.info('Retweet tweet');
  retweetTweet(tweet.id);
}

function generateReply(tweet) {
  const text = `Gracias por fantasmearla ${tweet.user.name}!\nPodes ver tu Tweet en https://bitfantasma.com.ar`;
  return text;
}

function start() {
  console.info('** Welcome to Twitter Monitor **');
  startTracking('#bitfantasma', onNewTweet);
}

// Start
start();
