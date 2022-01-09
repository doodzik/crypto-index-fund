import { percentage, basisPoint } from './currency.js'
import { isTrueCrypto } from './coin.js'

export default (data) => {
  var totalDominance = percentage(0.0)
  var thresholdDominance = 80.0

  const isTopCoin = (coin) => {
    if (totalDominance < thresholdDominance) {
      totalDominance = totalDominance.add(coin.dominance)
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

  return { totalDominance, thresholdDominance, entries }
}
