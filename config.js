import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyC8MLqpI8Oji4pFE-SV4usp_-9i3Wp3n7w",
    authDomain: "time-management-32e70.firebaseapp.com",
    projectId: "time-management-32e70",
    storageBucket: "time-management-32e70.appspot.com",
    messagingSenderId: "858545186545",
    appId: "1:858545186545:web:8aa564d0712feba07beb50"
};
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();