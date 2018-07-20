const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('This is my resolved data');
        reject('Promise rejected');
    }, 5000);
});

console.log('before');

promise.then((data) => {
    console.log('1', data);
}, (error) => {
    console.log('1', error);
});

promise.then((data) => {
    console.log('2', data);
}).catch((data) => {
    console.log('2', data);
});

console.log('after');
