//Utilizo los sistemas de OAuth de Firebase para crear login
import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyDi1B8eYb-_ZUqaXLNIHtkEFY49a7k8K9c",
  authDomain: "cmcp-62724.firebaseapp.com",
  databaseURL: "https://cmcp-62724.firebaseio.com",
  projectId: "cmcp-62724",
  storageBucket: "cmcp-62724.appspot.com",
  messagingSenderId: "1058559755515",
  appId: "1:1058559755515:web:dc1e24812fd3d36f339c5e"
};
// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth()

export {db, auth}
