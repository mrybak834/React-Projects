//#region Promises
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is my resolved data');
        // reject('Promise rejected');
    }, 1000);
});

// console.log('before');

// promise.then((data) => {
//     console.log('1', data);
// }, (error) => {
//     console.log('1', error);
// });

// promise.then((data) => {
//     console.log('2', data);
// }).catch((data) => {
//     console.log('2', data);
// });

// console.log('after');
//#endregion Promises

//#region Promise Chaining
promise
    .then((data) => {
        console.log("Resolve 1: ", data);

        return 'Data from first resolution';
    })
    .then((data) => {
        console.log("Resolve 2: ", data);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('This is my promise from resolve 2');
                // reject('Rejected from resolve 2');
            }, 1000);
        })
    })
    // Runs as the success/reject for the newly defined promise above
    .then((data) => {
        console.log("Resolve 3: ", data);
    })
    .catch((e) => {
        console.log("Error: ", e);
    })

//#endregion Promise Chaining
