import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

  var firebaseConfig = {
    apiKey: "AIzaSyCOz2lONWmWvGn38gGUX0cgooNWrJQBOc4",
    authDomain: "financial-portfolio-trac-fc62c.firebaseapp.com",
    databaseURL: "https://financial-portfolio-trac-fc62c.firebaseio.com",
    projectId: "financial-portfolio-trac-fc62c",
    storageBucket: "financial-portfolio-trac-fc62c.appspot.com",
    messagingSenderId: "59111256013",
    appId: "1:59111256013:web:ff6298901867d1d0bd1e84",
    measurementId: "G-TCTSWYG0M9"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const database = firebase.database();

export default firebase;
