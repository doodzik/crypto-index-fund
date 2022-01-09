import { crypto, base, basisPoint } from './currency.js'

const calculateAmount = (coin, funds) => {
  const distribution = basisPoint(coin.distribution).divide(100.0)
  coin.amountBaseCurrency = funds.multiply(distribution)
  coin.amount = crypto(coin.amountBaseCurrency).divide(coin.price)
  return coin
}

const changesToAmount = (coin, currentHoldings) => {
  var currentHolding = currentHoldings[coin.symbol] || 0.0
  currentHolding = crypto(currentHolding)
  let change = coin.amount.subtract(currentHolding)

  coin.currentHolding = currentHolding
  coin.changeNominal = change
  coin.changeBaseCurrency = coin.price.multiply(change)

  return coin
}

export default (obj) => {
    obj.entries = obj.entries
                     .map((coin) => calculateAmount(coin, obj.funds))
                     .map((coin) => changesToAmount(coin, obj.currentHoldings))

    return obj
}

export const marshal = (strategy, marshalCoin) => {
  return (result) => { 
    return { 
      dominance: result.totalDominance.format(),
      meta: { ...strategy.marshal(result), strategyID: strategy.id },
      entriesCount: result.entries.length,
      entries: result.entries.map(marshalCoin),
    }
  } 
}
