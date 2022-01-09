#!/usr/bin/env node

import parseArgs from 'minimist'

import { logBuilder } from './util.js'
import { latest } from './marketdata_api.js'
import { normalize } from './coin.js'
import addFundsAndHoldings from './fund.js'
import selectTopOfMarket from './select-top-of-market.js'
import addChangesInHoldings from './add-changes-in-holdings.js'

const argv = parseArgs(process.argv.slice(2))

export const toString = (result) => { 
  return { 
    dominance: result.totalDominance.format(),
    thresholdDominance: result.thresholdDominance,
    entriesCount: result.entries.length,
    entries: result.entries.map(entry => {
      return {
        dominance: entry.dominance.format(),
        symbol: entry.symbol,
        name: entry.name,
        baseCurrency: entry.baseCurrency,
        price: entry.price.format(),
        distribution: entry.distribution.format(),
        amountBaseCurrency: entry.amountBaseCurrency.format(),
        amount: entry.amount.format(),
        currentHolding: entry.currentHolding.format(),
        changeNominal: entry.changeNominal.format(),
        changeBaseCurrency: entry.changeBaseCurrency.format(),
      }
    })
  } 
}

const baseCurrency = argv.currency || "USD"
const cache = argv.cache || false
const funds = argv.funds === undefined ? 1000.0 : argv.funds
const holdings = argv.holdings || false 
const colors = argv.colors === undefined ? true : argv.colors

const log = logBuilder({ colors })

Promise.resolve()
       .then(() => latest(baseCurrency, cache))
       .then(obj => obj.data)
       .then(data => data.map(coin => normalize(baseCurrency, coin)))
       .then(selectTopOfMarket)
       .then(obj => addFundsAndHoldings(obj, funds, holdings))
       .then(addChangesInHoldings)
       .then(toString)
       .then(log)
