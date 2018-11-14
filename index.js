const debug = require('debug')('search_correct')
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async function(term){
  const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(term)}`
  debug(`url: ${url}`)
  const response = await axios.get(url)
  const $ = cheerio.load(response.data)
  return $('#did_you_mean a').first().text() || term
}