import top80PercentDominance, { marshalMeta as marshalMetaTop80Percent, id as top80PercentID } from './strategies/top-80-percent-dominance.js'
import top10Coins, { marshalMeta as marshalMetaTop10, id as top10CoinsID } from './strategies/top-10-coins.js'

export const strategyFactory = (strategyID) => {
  switch(strategyID) {
    case top80PercentID:
      return { 
        id: top80PercentID,
        strategy: top80PercentDominance,
        marshal: marshalMetaTop80Percent,
      }
      break;
    case top10CoinsID:
      return { 
        id: top10CoinsID,
        strategy: top10Coins,
        marshal: marshalMetaTop10,
      }
      break;
    default:
      return { 
        id: top10CoinsID,
        strategy: top10Coins,
        marshal: marshalMetaTop10,
      }
  }
}
