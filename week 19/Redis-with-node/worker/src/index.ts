import { createClient } from "redis";

const client = createClient()

async function startWorker() {
  try {
    await client.connect()
    console.log('connected to redis')
    while (true) {
      try {
        const data = await client.brPop('key', 0)
        console.log(data)
        //TODO: create docker container to run the code and get the logs and data from the container
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Code executed successfully")
      } catch (error) {
        console.log('Error in processing data', error)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

startWorker()

// we can create multiple worker by running this code on multiple terminal


