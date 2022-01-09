# crypto-index-fund

I was curious if I could build a crypto fund for myself. And it looks like I can. Currently, 80% of the ex-stablecoin crypto market consists of 21 cryptocurrencies. There's few enough that makes it possible for one person to buy some in each.

This repository contains a CLI tool for building your own crypto fund.
It currently allocates funds based on market dominance. The funds selects the crypto currencies that have 80% of the market dominance without stablecoins. Happy to add other allocation types as well.

![example allocation](./data/80ex-stable-example.png)

Currently supports:
- Market Dominance 80/20 ex-Stablecoin

## Installation

Clone the repository and `cd` into it.

```bash
$ git clone https://github.com/doodzik/crypto-index-fund
$ cd $_
```

## Usage

Before getting started make sure to set the `COINMARKET_API_KEY` env variable. You can get the key [here](https://coinmarketcap.com/api/).

```bash
$ export COINMARKET_API_KEY="xxx-xxx-xxx-xxx"
```

When you are in the repository execute the following command.

```bash
$ node ./src/crypto-index-fund.js
```

The output will be something like this:

```javascript
{
  dominance: '80.8%',
  thresholdDominance: 80,
  entriesCount: 22,
  entries: [
    {
      dominance: '40.62%',
      symbol: 'BTC',
      name: 'Bitcoin',
      baseCurrency: 'USD',
      price: '$41,938.87',
      distribution: '50.72%',
      amountBaseCurrency: '$11,809.92',
      amount: '₿0.281598431240517422',
      currentHolding: '₿0.534809920691298957',
      changeNominal: '-₿0.253211489450781535',
      changeBaseCurrency: '-$10,619.40'
    },
    // etc...
  ]
}
```

### Flags

#### --funds=DECIMAL 
  specify funds to allocate to the fund
  defaults to 1000.0

#### --currency=STRING 
  base currency for all conversions 
  defaults to USD 

####--holdings=PATH
  add a path to a holdings file in the format that can be seen in `test/holdings.json` file. 
  Defaults to empty 

#### --cache=PATH 
  takes a path to the marketplace api response data
  defaults to false

#### --no-colors/--colors 
  Will the output of the output have color encoding
  defaults to colors true

## Testing

```bash
$ ./test/test.sh
```

## Potential Improvements

- [Calculate how to make the least costly rebalancing](https://en.wikipedia.org/wiki/Change-making_problem)

