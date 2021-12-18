// Import the functions you need from the SDKs you need
const admin = require('firebase-admin');

// Your web app's Firebase configuration
const firebaseConfig = {
  type: 'service_account',
  project_id: 'bitfantasma',
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_UI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT,
  client_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URI,
};

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const tweetsCollection = admin.firestore().collection('tweets');

async function tweetExists(id) {
  const querySnapshot = await tweetsCollection.where('id', '==', id).get();
  return querySnapshot.size > 0;
}

async function saveTweet(tweet) {
  if (await tweetExists(tweet.id)) {
    console.info('Tweet already exists');
    return false;
  }

  return await tweetsCollection.doc().create(tweet);
}

module.exports = { saveTweet, tweetExists };
