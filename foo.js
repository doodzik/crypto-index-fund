const fs = require('fs')
const util = require('util')

const stablecoins = [
  "BUSD", 
  "DAI",
  "USDC", 
  "USDT", 
  "UST", 
  "WBTC",
]

const data = fs.readFileSync('./input.json', 'utf8')
const obj = JSON.parse(data);

const normalizeData = (coin) => { 
  return { 
    dominance: coin.quote.USD.market_cap_dominance || 0.0,
    name: coin.name,
    price: coin.quote.USD.price,
    symbol: coin.symbol,
  } 
}

var totalDominance = 0.0
var thresholdDominance = 80.0

const isTopCoin = (coin) => {
  if (stablecoins.includes(coin.symbol)) {
    thresholdDominance -= coin.dominance
    return false
  }

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

const entries = obj.data
  .map(normalizeData)
  .filter(isTopCoin)
  .map(addDistributionToCoin)

const result = {
  totalDominance,
  thresholdDominance,
  baseCurrency: 'USD',
  entries,
}

console.log(util.inspect(result, {showHidden: false, depth: null, colors: true})) 

const currentHoldings = {
    BTC: 0.534809920691299,
    ETH: 0.2657604964860124,
    BNB: 0.05181422139250305,
    SOL: 0.03203418254146346,
    ADA: 0.0265729957391324,
    XRP: 0.02391742228796242,
    LUNA: 0.01926884096168937,
    DOT: 0.016132608715857626,
    AVAX: 0.016075513886657473,
    DOGE: 0.17229134161669332,
}

// const addingFunds = 1000.0
const holdingsReducer = (previousValue, coin) => previousValue + coin.price * currentHoldings[coin.symbol];
const funds = entries.reduce(holdingsReducer, 0.0)

const distribution = entries.map((coin) => {
  coin.amountBaseCurrency = coin.distribution * funds 
  coin.amount = coin.amountBaseCurrency/coin.price
  return coin
})

const changes = distribution.map((coin) => {
  let currentHolding = currentHoldings[coin.symbol]
  let change = coin.amount - currentHolding

  coin.currentHolding = currentHolding
  coin.changeNominal = change
  coin.changeBaseCurrency = change * coin.price

  return coin
})

console.log(changes)
