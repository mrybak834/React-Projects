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
import 'firebase/auth';


// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);


const database = firebase.database();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();



export { firebase, auth, googleAuthProvider, database as default};