import * as firebase from 'firebase';

  var firebaseConfig = {

  };


  firebase.initializeApp(firebaseConfig);

  export const database = firebase.database().ref('/notes');
  export const auth = firebase.auth();
  export const googleProvider = new firebase.auth.GoogleAuthProvider();

