import firebase from 'firebase/app';
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC2r2FUMm9FrAaq5bNRgAxn2pyccB3_-U0",
  authDomain: "mitt-self-directed.firebaseapp.com",
  projectId: "mitt-self-directed",
  storageBucket: "mitt-self-directed.appspot.com",
  messagingSenderId: "865161084782",
  appId: "1:865161084782:web:a926a343a2db5515838b7f"
});

export const auth = app.auth();