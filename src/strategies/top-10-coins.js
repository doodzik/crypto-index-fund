import { percentage, basisPoint } from '../currency.js'
import { isTrueCrypto } from '../coin.js'

export default (data) => {
  var totalDominance = percentage(0.0)
  var counter = 0
  var counterThreshold = 10

  const isTopCoin = (coin) => {
    if (counter < counterThreshold) {
      totalDominance = totalDominance.add(coin.dominance)
      counter += 1
      return true
    }

    return false
  }

  const addDistributionToCoin = (coin) => { 
    const distribution = basisPoint(coin.dominance).divide(totalDominance)
    coin.distribution = percentage(distribution.multiply(100.0))
    return coin
  }

  const entries = data.filter(isTrueCrypto)
                      .filter(isTopCoin)
                      .map(addDistributionToCoin)

  return { totalDominance, counter, entries }
}

export const marshalMeta = (result) => {
  return {
    counter: result.counter,
  }
}

export const id = 'TOP_10_COINS'
