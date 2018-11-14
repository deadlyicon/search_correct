#!/usr/bin/env node

const searchCorrect = require('.')

const getTerm = function(){
  return new Promise(resolve => {
    if (process.stdin.isTTY) return resolve(process.argv[2] || '')
    process.stdin.on('readable', function() {
      resolve(process.stdin.read())
    });
  })
}

getTerm().then(searchCorrect).then(
  results => {
    process.stdout.write(results[0] || '')
  },
  error => {
    console.error(error)
    process.exit(1)
  }
)
