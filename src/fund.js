import { crypto, base } from './currency.js'
import { stat, readFile } from './fs.js'

const currentHoldings = (file) => {
  if (file == false) {
    return Promise.resolve({})
  }

  return stat(file)
           .then(() => readFile(file, 'utf8').then(JSON.parse))
           .catch(() => {
             return {}
           })
}

const calculateAvailableFunds = (currentHoldings, entries) => {
  const holdingsReducer = (previousValue, coin) => {
    const currentHolding = currentHoldings[coin.symbol] || 0.0
    const amount = coin.price.multiply(crypto(currentHolding))
    return previousValue.add(amount)
  }
  return entries.reduce(holdingsReducer, base(0.0, entries[0].baseCurrency))
}

export default (obj, funds, holdings) => {
  return currentHoldings(holdings).then(currentHoldings => {
      const availableFunds = calculateAvailableFunds(currentHoldings, obj.entries)
      const additionalFunds = base(funds, obj.baseCurrency)

      obj.funds = availableFunds.add(additionalFunds)
      obj.currentHoldings = currentHoldings

      return obj
  })
}
