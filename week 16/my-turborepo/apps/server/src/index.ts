import express from 'express';
import { msg } from '@repo/common'

const app = express();

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.json({ msg });
})
