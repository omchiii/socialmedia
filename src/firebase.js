import * as firebase from 'firebase';

  var firebaseConfig = {
    apiKey: "AIzaSyD-FRa1vTm4c4KsmAPCw8oiIkjYw9UJR9I",
    authDomain: "socialmedia-1afb2.firebaseapp.com",
    databaseURL: "https://socialmedia-1afb2.firebaseio.com",
    projectId: "socialmedia-1afb2",
    storageBucket: "socialmedia-1afb2.appspot.com",
    messagingSenderId: "1091167850266",
    appId: "1:1091167850266:web:0b4b5f31ce863a37"
  };


  firebase.initializeApp(firebaseConfig);

  export const database = firebase.database().ref('/notes');
  export const auth = firebase.auth();
  export const googleProvider = new firebase.auth.GoogleAuthProvider();

