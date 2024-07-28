import express from "express";
import swaggerUi from 'swagger-ui-express';
import { openAPIspec } from "./docs/openAPI";
const app = express()
app.use(express.json())
app.listen(3000, () => console.log("server is running on port : 3000"));

let users = [
  { id: 1, name: "john", age: 20 },
  { id: 2, name: "doe", age: 21 },
  { id: 3, name: "alis", age: 22 },
  { id: 4, name: "prasant", age: 24 }
]


app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(openAPIspec));


app.get('/users', (req, res) => {
  const { name } = req.query
  if (name) {
    //@ts-ignore
    const filteredUser = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
    res.json(filteredUser)
  } else {
    res.json({
      msg: "No user found",
      users: users
    })
  }
})