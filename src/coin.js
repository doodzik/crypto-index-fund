import { percentage, base } from './currency.js'
import stablecoins from './stablecoins.js'

export const normalize = (baseCurrency, coin) => { 
  const dominance = coin.quote.USD.market_cap_dominance || 0.0
  const roundedDominance = Math.round((dominance + Number.EPSILON) * 100) / 100

  return { 
    dominance: percentage(roundedDominance),
    name: coin.name,
    price: base(coin.quote[baseCurrency].price, baseCurrency),
    symbol: coin.symbol,
    baseCurrency,
  } 
}

export const isTrueCrypto = (coin) => {
  return !stablecoins.includes(coin.symbol)
}
