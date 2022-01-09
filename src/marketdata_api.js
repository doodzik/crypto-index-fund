import rp from 'request-promise'
import { readFile, writeFile, stat } from './fs.js'

const api_key = process.env.COINMARKET_API_KEY

export function latest(baseCurrency, cache = false) {
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

  if(cache) {
    return stat(cache)
             .then(() => readFile(cache, 'utf8').then(JSON.parse))
             .catch(() => {
               return rp(requestOptions).then(data => {
                  return writeFile(cache, JSON.stringify(data))
                    .then(() => data)
                })
             })
  }

  return rp(requestOptions)
}
