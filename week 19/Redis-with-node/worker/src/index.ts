import { createClient } from "redis";

const client = createClient()

const processData = async (data: string) => {
  const { problemId, code, userId, lang } = JSON.parse(data)
  //TODO: create docker container to run the code and get the logs and data from the container
  console.log(`Processing submission for problemId ${problemId}...`);
  console.log(`Code: ${code}`);
  console.log(`Language: ${lang}`);
  // Here you would add your actual processing logic

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`Finished processing submission for problemId ${problemId}.`);
  client.publish('problem_done', JSON.stringify({ problemId, status: "TLE" }))
}

async function startWorker() {
  try {
    await client.connect()
    console.log('connected to redis')
    while (true) {
      try {
        const data = await client.brPop('key', 0)
        //@ts-ignore
        await processData(data.element)
        console.log(`Data process done of problem`)
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


