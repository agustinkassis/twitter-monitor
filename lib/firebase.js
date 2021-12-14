// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} = require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const tweetsRef = collection(db, 'tweets');

async function tweetExists(id) {
  const q = query(tweetsRef, where('id', '==', id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
}

async function saveTweet(tweet) {
  if (await tweetExists(tweet.id)) {
    console.info('Tweet already exists');
    return false;
  }
  return await addDoc(tweetsRef, tweet);
}

module.exports = { saveTweet, tweetExists };
