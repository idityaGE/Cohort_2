import express from "express";
import cluster from "cluster"; // node js module
import os from "os";  // node js module

// By using the cluster module, we can create a multi-threaded server that can handle multiple requests simultaneously without port conflict.

const totalCPUs = os.cpus().length;  // get the number of cpus cores --> In my case 16

const port = 3000;

if (cluster.isPrimary) {  // isPrimary check if the current process is the primary process, 
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`);  // process.pid is the process id of the current process

  // Fork workers.
  for (let i = 0; i < totalCPUs - 6; i++) {
    cluster.fork(); // create a worker on a new core
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`Worker ${process.pid} started`);
  
  app.use((req, res, next) => {
    console.log(`Request handled by worker ${process.pid}`);
    next();
  });
  
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/api/:n", function (req, res) {
    let n = parseInt(req.params.n);
    let count = 0;

    if (n > 5000000000) n = 5000000000;

    for (let i = 0; i <= n; i++) {
      count += i;
    }

    res.send(`Final count is ${count} ${process.pid}`);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

}


