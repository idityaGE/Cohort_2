
const first = (i) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, i * 1000)
  })
}

const second = (i) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, i * 1000)
  })
}

const third = (i) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, i * 1000)
  })
}

// promise.all takes an array of promises and returns a promise that resolves when all of the promises in the iterable argument have resolved
const calculateTime = async (i, j, k) => {
  const start = Date.now()
  await Promise.all([first(i), second(j), third(k)])  // start all promises at the same time
  const end = Date.now()
  const diffrence = end - start
  console.log(`Total time: ${diffrence}ms`)
  return diffrence
}

calculateTime(1, 2, 3)

// promise chaining
const chaining = async (i, j, k) => {
  const start = Date.now()
  await first(i)  // start the first promise
  await second(j) // start the second promise
  await third(k)  // start the third promise
  const end = Date.now()
  const diffrence = end - start
  console.log(`Total time: ${diffrence}ms`)
  return diffrence
}

chaining(1, 2, 3)


// promise race
const promiseRace = async () => {
  const promise1 = new Promise(resolve => setTimeout(() => resolve('one'), 1000));
  const promise2 = new Promise(resolve => setTimeout(() => resolve('foo'), 2000));

  const [result] = await Promise.race([promise1, promise2])
  console.log(result) // one
}
promiseRace();

// promise all
const promiseAll = async () => {
  const promise3 = new Promise(resolve => setTimeout(() => resolve('one'), 1000));
  const promise4 = new Promise(resolve => setTimeout(() => resolve('foo'), 2000));

  const [result1, result2] = await Promise.all([promise3, promise4])
  console.log(result1) // one
  console.log(result2) // foo
}
promiseAll();

// promise allSettled
const promiseAllSettled = async () => {
  const promise5 = new Promise(resolve => setTimeout(() => resolve('one'), 1000));
  const promise6 = new Promise((_, reject) => setTimeout(() => reject('foo'), 2000));

  const promise7 = Promise.resolve('bar')
  const promise8 = Promise.reject(91)

  const results = await Promise.allSettled([promise5, promise6, promise7, promise8])
  console.log(results)
// [
//   { status: 'fulfilled', value: 'one' },
//   { status: 'rejected', reason: 'foo' },
//   { status: 'fulfilled', value: 'bar' },
//   { status: 'rejected', reason: 91 }
// ]

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log(result.value)
    } else {
      console.log(result.reason)
    }
  })
}
promiseAllSettled();
