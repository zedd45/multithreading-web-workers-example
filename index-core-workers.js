"use strict";

const express = require("express");
const os = require("os")
const path = require("path");
const { Worker } = require("worker_threads");

const app = express();
const PORT = process.env.PORT || 3001;
const THREAD_COUNT = os.cpus?.()?.length || 1;

const createWorker = () => new Promise((resolve, reject) => {
  const workerFile = path.join(__dirname, 'core-workers.js');

  const worker = new Worker(workerFile, {
    workerData: {thread_count: THREAD_COUNT},
  })

  worker.on("message", (data) => {
    resolve(data);
  });

  worker.on("error", (msg) => {
    reject(`An error occurred: ${msg}`);
  });
})


app.get("/non-blocking/", (_req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (_req, res) => {
  const workerPromises = new Array(THREAD_COUNT).fill(createWorker());

  const workerResults = await Promise.all(workerPromises);

  const total = workerResults.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  res.status(200).send(`result is ${total}`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
