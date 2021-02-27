const config = {
  apiKey: 'AIzaSyDvOR0DEczGAscdG9BQAzcDeN_6VLv56ZA',
  authDomain: 'instagram-jpm-c864f.firebaseapp.com',
  projectId: 'instagram-jpm-c864f',
  storageBucket: 'instagram-jpm-c864f.appspot.com',
  messagingSenderId: '1081687010918',
  appId: '1:1081687010918:web:3387a9baffb5f5ccb407a7',
};

const firebase = window.firebase.initializeApp(config);
const { FieldValue } = window.firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
