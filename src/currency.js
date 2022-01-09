import currency from 'currency.js'

export const crypto = (crypto) => currency(crypto, { symbol: '₿', precision: 18 })
export const base = (value, base) => {
  const symbols = {
    USD: "$",
    CAD: "$",
  }
  const symbol = symbols[base] || base

  return currency(value, { symbol , precision: 10 })
}

const percentageFormat = (currency, options) => {
  return `${currency.dollars()}.${currency.cents()}${options.symbol}`;
}
export const percentage = (value) => currency(value, { symbol: '%', precision: 2, format: percentageFormat })
export const basisPoint = (value) => currency(value, { symbol: '%', precision: 4, format: percentageFormat })
