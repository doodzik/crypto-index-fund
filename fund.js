import { readFile } from './fs.js'

export const fundsToAdd = (currentHoldings, baseCurrency) => {
  var funds = 0.0
  if (currentHoldings[baseCurrency] && currentHoldings[baseCurrency] > 0.0) {
    funds += currentHoldings[baseCurrency] 
  }
  return funds
}

export const currentHoldings = () => {
  return readFile(process.env.CRYPTO_FUND_CURRENT_HOLDINGS, 'utf8')
  .then(JSON.parse)
  .catch(error => {
     return {}
  })
}

export const availableFunds = (currentHoldings, entries) => {
  const holdingsReducer = (previousValue, coin) => previousValue + coin.price * (currentHoldings[coin.symbol] || 0.0);
  return entries.reduce(holdingsReducer, 0.0)
}
