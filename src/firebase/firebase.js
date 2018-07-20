/**
 * firebase.auth() — Authentication
 * firebase.storage() — Cloud Storage
 * firebase.database() — Realtime Database
 * firebase.firestore() — Cloud Firestore
 * firebase.messaging() — Cloud Messaging
 * firebase.functions() — Cloud Functions
 */
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDhHsLQLIDW3o_vUNXz4zVkcmTd029B6ag",
    authDomain: "expensify-55e99.firebaseapp.com",
    databaseURL: "https://expensify-55e99.firebaseio.com",
    projectId: "expensify-55e99",
    storageBucket: "expensify-55e99.appspot.com",
    messagingSenderId: "997376593992"
};
firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default};