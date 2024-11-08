const simplePromise = new Promise((resolve, reject) => {
  const randomNum = Math.random();
  if (randomNum > 0.5) {
    resolve(`Success! Number: ${randomNum}`);
  } else {
    reject(`Failed! Number too low: ${randomNum}`);
  }
})


const delay = (ms) => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove()
    }, ms)
  })
}

delay(3000)
  .then(() => console.log('runs after 3 seconds'))
  .catch(() => console.log('error'))


const wait = (ms) => {
  const start = Date.now()
  while (Date.now() - start < ms) { }
  return Promise.resolve()
}

wait(2000)
  .then(() => console.log('runs after 2 seconds'))