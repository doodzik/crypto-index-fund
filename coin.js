import stablecoins from './stablecoins.js'

export const normalize = (baseCurrency, coin) => { 
  return { 
    dominance: coin.quote.USD.market_cap_dominance || 0.0,
    name: coin.name,
    price: coin.quote.USD.price,
    symbol: coin.symbol,
    baseCurrency,
  } 
}

export const isTrueCrypto = (coin) => {
  return !stablecoins.includes(coin.symbol)
}

