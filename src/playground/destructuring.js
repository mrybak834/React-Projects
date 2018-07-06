/**************************************************************************************
 * Object destructuring 
 * *************************************************************************************/

// console.log('destructuring');

// const person = {
//     age: 23,
//     location: {
//         city: 'Chicago',
//         temp: 69
//     }
// };

// const { name: firstName = 'Anonymous', age } = person;

// console.log(`${firstName} is ${age}`);


// const { city, temp: temperature } = person.location;
// console.log(`It is ${temperature} in ${city}`);

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const { name: publisherName = 'Self Published' } = book.publisher;

// console.log(publisherName);

/**************************************************************************************
 * Array destructuring 
 * *************************************************************************************/

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
// // const address = [];

// const [, city, state = 'None'] = address;

// console.log(`You are in ${city}, ${state}`);

const item = ['Coffee', '$2.00', '$2.50', '$2.75'];
const [name,,mediumPrice] = item;

console.log(`A medium ${name} costs ${mediumPrice}`);