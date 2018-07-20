//#region Imports
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
//#endregion Imports

//#region Config DB
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
//#endregion Config DB

//#region Adding Data Examples
// database.ref().set({
//     name: 'Marek Rybakiewicz',
//     age: 23,
//     isSingle: true,
//     location: {
//         city: 'Poplar Groves',
//         state: 'Illinois'
//     }
// }).then(() => {
//     console.log('Sync successful');
// }).catch((e) => {
//     console.log('Sync failed', e);
// });


// database.ref('attributes').set({
//     height: `6'3`,
//     weight: '190lbs'
// }).then(() => {
//     console.log('Sync succeeded');
// }).catch((e) => {
//     console.log('Sync failed: ', e);
// });


// database.ref('isSingle').remove()
//     .then(() => {
//         console.log('Remove succeeded');
//     })
//     .catch((e) => {
//         console.log('Remove failed: ', e); 
//     });

// database.ref()
//     .update({
//         name: 'Marek',
//         'degree': 'Computer Science',
//         'location/city': 'Poplar Grove'
//     })
//     .then(() => {
//         console.log('Update succeeded');
//     })
//     .catch((e) => {
//         console.log('Update failed: ', e);
//     });

// database.ref()
//     .update({
//         stressLevel: 9,
//         'job/company': 'Amazon',
//         'location/city': 'Seattle'
//     })
//     .then(() => {
//         console.log('Updated to Amazon');
//     })
//     .catch((e) => {
//         console.log('Update failed: ', e);
//     });
//#endregion 

//#region Data Fetching Examples
// // Fetch the data once
// database.ref('location')
//     .once('value')
//     .then((snapshot) => {
//         const data = snapshot.val();
//         console.log(data);
//     })
//     .catch((e) => {
//         console.log('Error fetching data: ', e);
//     });

// // Fetch data every time it changes
// // Callbacks instead of promises, because promises can only be run once
// // "on" returns the arrow function we pass in, usefull for unsubscribing from the DB for a specific function
// const onValueChange = database.ref()
//     .on("value", (snapshot) => {
//         const data = snapshot.val();
//         console.log(data);
//     }, (e) => {
//         console.log('Error subscribing to DB: ', e);
//     });

// // Unsubscribe from the DB for this specific function
// database.ref()
//     .off('value', onValueChange);

// database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const data = snapshot.val();
//         console.log(`${data.name} has a ${data.degree} degree and works at ${data.job.company}.`);
//     })
//     .catch((e) => {
//         console.log('Error fetching data: ', e);
//     });

// const printDescription = database.ref()
//     .on('value',
//         (snapshot) => {
//             const data = snapshot.val();
//             console.log(`${data.name} has a ${data.degree} degree and works at ${data.job.company}.`);
//         }, 
//         (e) => {
//             console.log('Error fetching data: ', e);
//         });

// setTimeout(() => {
//     database.ref('name').set('Kyle');
// }, 3000);

// setTimeout(() => {
//     database.ref('name').set('Marek');
// }, 6000);

// setTimeout(() => {
//     database.ref('age').set(222);
// }, 9000);

// setTimeout(() => {
//     database.ref().off('value', printDescription);
// }, 12000);
//#endregion Data Fetching Examples

//#region Storing arrays

// Creates a uuid for the item you push
// database.ref('notes').push({
//     title: "Today",
//     body: "Go for a run"
// });

// database.ref('notes').push(22);

// const expenses = [
//     {
//         description: 'test1',
//         note: 'Hello',
//         amount: 22,
//         timestamp: 234
//     },
//     {
//         description: 'woah',
//         note: 'nice',
//         amount: 22,
//         timestamp: 234
//     },
//     {
//         description: 'Car',
//         note: 'Bill',
//         amount: 22,
//         timestamp: 234
//     }
// ];

// expenses.forEach((expense) => {
//     database.ref('expenses')
//     .push(expense)
//     .then(() => console.log('Successfully added expense'))
//     .catch((e) => console.log('Failed to add expense', e));
// });

//#endregion Storing arrays

//#region Fetching array data

// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         var expenses = [];
//         snapshot.forEach((expenseSnapshot) => {
//             expenses.push({
//                 key: expenseSnapshot.key,
//                 ...expenseSnapshot.val()
//             });
//         });
//         console.log(expenses);
//     })
//     .catch((e) => {
//         console.log('Error getting expenses: ', e);
//     });

// const expenses = [];

// const expenseMonitor = database.ref('expenses')
//     .on('value', (expensesSnapshot) => {

//         expenses.length = 0;

//         expensesSnapshot.forEach((expenseSnapshot) => {
//             expenses.push({
//                 key: expenseSnapshot.key,
//                 ...expenseSnapshot.val()
//             });
//         });

//         console.log(expenses);
//     },
//     (e) => {
//         console.log('Error subscribing, ', e);
//     }
// );

// setTimeout(() => {
//     database.ref(`expenses/${expenses[0].key}`)
//     .update({
//         description: 'Updated!'
//     });
// }, 12000);

//#endregion Fetching array data

//#region Subscribing to different types of events

// database.ref('expenses')
//     .on('child_removed', (snapshot) => {
//         console.log(snapshot.key, snapshot.val());
//     });

// database.ref('expenses')
//     .on('child_changed', (snapshot) => {
//         console.log(snapshot.key, snapshot.val());
//     });

// // Automatically fires once on start
// database.ref('expenses')
//     .on('child_added', (snapshot) => {
//         console.log(snapshot.key, snapshot.val());
//     });
//#endregion Subscribing to different types of events
