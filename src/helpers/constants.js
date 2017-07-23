import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyA6in0Fz61fteuRT5srYE7MLbxir7mSKIY",
    authDomain: "farmkart-bc12f.firebaseapp.com",
    databaseURL: "https://farmkart-bc12f.firebaseio.com",
    storageBucket: "farmkart-bc12f.appspot.com",
    messagingSenderId: "697252218280",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const db = firebase.database();
export const firebaseAuth = firebase.auth
