import { percentage, base } from './currency.js'
import stablecoins from './stablecoins.js'

export const normalize = (baseCurrency, coin) => { 
  const dominance = coin.quote[baseCurrency].market_cap_dominance || 0.0
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

export const marshal = (coin) => {
    return {
      dominance: coin.dominance.format(),
      symbol: coin.symbol,
      name: coin.name,
      baseCurrency: coin.baseCurrency,
      price: coin.price.format(),
      distribution: coin.distribution.format(),
      amountBaseCurrency: coin.amountBaseCurrency.format(),
      amount: coin.amount.format(),
      currentHolding: coin.currentHolding.format(),
      changeNominal: coin.changeNominal.format(),
      changeBaseCurrency: coin.changeBaseCurrency.format(),
    }
}
