import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBcD1KpOBnO_xNnN1rgqVMCL1kjL_Wligg",
    authDomain: "pyritesinfo.firebaseapp.com",
    databaseURL: "https://pyritesinfo.firebaseio.com",
    projectId: "pyritesinfo",
    storageBucket: "pyritesinfo.appspot.com",
    messagingSenderId: "215874549772",
    appId: "1:215874549772:web:e473eecd827233b1e91629",
    measurementId: "G-KPLB2DG1SC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;