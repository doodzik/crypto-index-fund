import { currentHoldings, fundsToAdd, availableFunds } from './fund.js'

const calculateAmount = (coin, funds) => {
  coin.amountBaseCurrency = coin.distribution * funds 
  coin.amount = coin.amountBaseCurrency/coin.price
  return coin
}

const changesToAmount = (coin, currentHoldings) => {
  let currentHolding = currentHoldings[coin.symbol] || 0.0
  let change = coin.amount - currentHolding

  coin.currentHolding = currentHolding
  coin.changeNominal = change
  coin.changeBaseCurrency = change * coin.price

  return coin
}

export default (obj) => {
    return currentHoldings().then(currentHoldings => {
        const funds = availableFunds(currentHoldings, obj.entries) + fundsToAdd(currentHoldings, obj.baseCurrency)
        console.log(availableFunds(currentHoldings, obj.entries))

        obj.entries = obj.entries
                         .map((coin) => calculateAmount(coin, funds))
                         .map((coin) => changesToAmount(coin, currentHoldings))

        return obj
      })
}
