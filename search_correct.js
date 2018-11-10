#!/usr/bin/env node

const term = process.argv[2]
const searchCorrect = require('.')

searchCorrect(term).then(
  result => { process.stdout.write(result) },
  error => {
    console.error(error)
    process.exit(1)
  }
)
