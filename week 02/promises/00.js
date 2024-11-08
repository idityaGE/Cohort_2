/*
JavaScript Promises - A Comprehensive Guide
What are Promises ?
  A Promise is an object representing the eventual completion(or failure) of an asynchronous operation.It serves as a proxy for a value that may not be available immediately.

Promise States
1. Pending: Initial state, neither fulfilled nor rejected
2. Fulfilled: Operation completed successfully
3. Rejected: Operation failed
*/

// Basic Promise Examples

// Creating a simple promise
const simplePromise = new Promise((resolve, reject) => {
  // Simulating async operation
  setTimeout(() => {
    const randomNum = Math.random();
    if (randomNum > 0.5) {
      resolve(`Success! Number: ${randomNum}`);
    } else {
      reject(`Failed! Number too low: ${randomNum}`);
    }
  }, 1000);
});

// Using the promise
simplePromise
  .then(result => console.log(result))
  .catch(error => console.error(error));


// Promise Chaining
// Example of promise chaining
function getData() {
  return new Promise(resolve => {
    setTimeout(() => resolve(1), 1000);  // resolve(1) --> returns 1
  });
}

getData()
  .then(value => {
    console.log(value); // 1
    return value * 2;
  })
  .then(value => {
    console.log(value); // 2
    return value * 2;
  })
  .then(value => {
    console.log(value); // 4
  });


// Promise.all --> Waits for all promises to resolve
const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve('foo'), 2000));
const promise3 = new Promise(resolve => setTimeout(() => resolve(42), 1000));

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // [3, "foo", 42]
  });


//Promise.race()
// Returns the first promise that resolves or rejects
const promise4 = new Promise(resolve => setTimeout(() => resolve('one'), 1000));
const promise5 = new Promise(resolve => setTimeout(() => resolve('two'), 2000));

Promise.race([promise4, promise5])
  .then(value => {
    console.log(value); // "one"
  });


// Async / Await
// Modern syntax for working with promises 
// only works inside async functions
async function fetchUserData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const userData = await response.json();
    console.log(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Using async/await with multiple promises
async function getMultipleData() {
  try {
    const [users, posts] = await Promise.all([
      fetch('https://api.example.com/users').then(res => res.json()),
      fetch('https://api.example.com/posts').then(res => res.json())
    ]);
    console.log({ users, posts });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Error Handling
function checkNumber(num) {
  return new Promise((resolve, reject) => {
    if (typeof num === 'number') {  // Check if input is a number
      resolve(num);
    } else {
      reject(new Error('Input must be a number'));
    }
  });
}

// Using .catch()
checkNumber('not a number')
  .then(num => console.log('Number is valid:', num))
  .catch(error => console.error('Error:', error.message));

// Using async/await with try/catch
async function validateNumber(input) {
  try {
    const result = await checkNumber(input);
    console.log('Valid number:', result);
  } catch (error) {
    console.error('Validation error:', error.message);
  }
}

// Promise.allSettled()
// Waits for all promises to complete, regardless of success or failure
const promises = [
  Promise.resolve(1),
  Promise.reject('error'),
  new Promise(resolve => setTimeout(() => resolve(3), 1000))
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Fulfilled:', result.value);
      } else {
        console.log('Rejected:', result.reason);
      }
    });
  });