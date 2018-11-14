const debug = require('debug')('search_correct')
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async function(term){
  const url = `http://google.com/complete/search?output=toolbar&q=${encodeURIComponent(term)}`
  debug(`url: ${url}`)
  const response = await axios.get(url)
  debug(`json: ${response.data}`)
  const $ = cheerio.load(response.data)
  const results = $('suggestion').map((i,n) => $(n).attr('data')).get()
  debug(`results: ${JSON.stringify(results)}`)
  return results
}