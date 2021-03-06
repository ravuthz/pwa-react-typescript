import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};

firebase.initializeApp(config);

firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

firebase.firestore().enablePersistence().then((res) => {
  console.log('firestore().enablePersistence(): ', res);
});

firebase.firestore().disableNetwork().then((res) => {
  console.log('firestore().disableNetwork(): ', res);
});

firebase.firestore().enableNetwork().then((res) => {
  console.log('firestore().enableNetwork(): ', res);
});

export const todos = firebase.firestore().collection("todos");

export default firebase;