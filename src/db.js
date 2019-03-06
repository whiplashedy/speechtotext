import Firebase from 'firebase'
 let config = {
    apiKey: "AIzaSyBgCJM_zeZSd0xVPol_nhqusLk_WhJFyW8",
    authDomain: "voiceextension-11e23.firebaseapp.com",
    databaseURL: "https://voiceextension-11e23.firebaseio.com",
    projectId: "voiceextension-11e23",
    storageBucket: "voiceextension-11e23.appspot.com",
    messagingSenderId: "238068696801"
  };
let app = Firebase.initializeApp(config)
export const db = app.database()