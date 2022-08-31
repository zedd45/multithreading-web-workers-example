"use strict"

const { workerData, parentPort } = require("worker_threads");

let counter = 0;
const threadCount = workerData?.thread_count;
const loopCount = Math.floor(20_000_000_000 / threadCount);

for (let i = 0; i < loopCount; i++) {
  counter++;
}

parentPort.postMessage(counter);
