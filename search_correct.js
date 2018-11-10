#!/usr/bin/env node

const term = process.argv[2]
const searchCorrect = require('.')

searchCorrect(term).then(
  result => { console.log(result) },
  error => {
    console.error(error)
    process.exit(1)
  }
)
