import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const client = createClient();
client.on('error', (err) => {
  console.log('Error : ' + err);
});

app.post('/set', async (req, res) => {
  const { problemId, code, lang, userId } = req.body
  try {
    await client.lPush('key', JSON.stringify({ problemId, code, lang, userId }))
    res.status(200).send('Code saved successfully')
  } catch (error) {
    res.status(500).send('Failed to save code')
  }
})


async function startServer() {
  try {
    await client.connect()
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    })
  } catch (error) {
    console.error(error)
  }
}

startServer()