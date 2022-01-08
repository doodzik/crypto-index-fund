import { isTrueCrypto } from './coin.js'

export default (data) => {
  var totalDominance = 0.0
  var thresholdDominance = 80.0

  const isTopCoin = (coin) => {
    if (totalDominance < thresholdDominance) {
      totalDominance += coin.dominance
      return true
    }

    return false
  }

  const addDistributionToCoin = (coin) => { 
    coin.distribution = (coin.dominance/totalDominance)
    return coin
  }

  const entries = data.filter(isTrueCrypto)
                      .filter(isTopCoin)
                      .map(addDistributionToCoin)

  return { totalDominance, thresholdDominance, entries }
}
