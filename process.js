"use strict";

const process_name = process.argv.slice(2)[0];

let count = 0;

do {
  count++;
  if (count == 2000 || count == 4000) {
    console.log(`${process_name}: ${count}`);
  }
} while (true)
