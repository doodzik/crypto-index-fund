import rp from 'request-promise'
import { readFile, writeFile } from './fs.js'

const api_key = process.env.COINMARKET_API_KEY

const cacheFile = "./.marketdata_cache.json"

export function latest(baseCurrency, cached = false) {
  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      'start': '1',
      'limit': '5000',
      'convert': baseCurrency,
    },
    headers: {
      'X-CMC_PRO_API_KEY': api_key
    },
    json: true,
    gzip: true
  };

  if(cached) {
    return readFile(cacheFile, 'utf8').then(JSON.parse)
  }

  return rp(requestOptions).then(data => {
    return writeFile(cacheFile, JSON.stringify(data)).then(() => data)
  })
}
