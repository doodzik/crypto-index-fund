import parseArgs from 'minimist'

import { log } from './util.js'
import { latest } from './marketdata_api.js'
import { normalize } from './coin.js'
import selectTopOfMarket from './select-top-of-market.js'
import addChangesInHoldings from './add-changes-in-holdings.js'

const argv = parseArgs(process.argv.slice(2))

const baseCurrency = argv.currency || "USD"
const cached = argv.cached || false

Promise.resolve(cached)
       .then(cached => latest(baseCurrency, cached))
       .then(obj => obj.data)
       .then(data => data.map(coin => normalize(baseCurrency, coin)))
       .then(selectTopOfMarket)
       .then(addChangesInHoldings)
       .then(log)
