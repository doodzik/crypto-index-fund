#!/usr/bin/env node

import parseArgs from 'minimist'

import { logBuilder } from './util.js'
import { latest } from './marketdata_api.js'
import { normalize, marshal as marshalCoin } from './coin.js'
import { strategyFactory } from './strategy.js'
import addFundsAndHoldings from './fund.js'
import addChangesInHoldings, { marshal } from './add-changes-in-holdings.js'

const argv = parseArgs(process.argv.slice(2))

const baseCurrency = argv.currency || "USD"
const cache = argv.cache || false
const funds = argv.funds === undefined ? 0.0 : argv.funds
const holdings = argv.holdings || false 
const colors = argv.colors === undefined ? true : argv.colors
const strategy = argv.strategy

const log = logBuilder({ colors })

const selectedStrategy = strategyFactory(strategy)
const marshalFn = marshal(selectedStrategy, marshalCoin)

Promise.resolve()
       .then(() => latest(baseCurrency, cache))
       .then(obj => obj.data)
       .then(data => data.map(coin => normalize(baseCurrency, coin)))
       .then(selectedStrategy.strategy)
       .then(obj => addFundsAndHoldings(obj, funds, holdings))
       .then(addChangesInHoldings)
       .then(marshalFn)
       .then(log)
