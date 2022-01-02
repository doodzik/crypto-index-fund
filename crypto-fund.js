const rp = require('request-promise');
const fs = require('fs');

const api_key = "<EMPTY>"

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '5000',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': api_key
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  console.log('API call response:', response[0]);
  const data = JSON.stringify(response)
  fs.writeFile ("./input.json", data, (err) => {
    if (err) throw err;
    console.log('complete');
  });
}).catch((err) => {
  console.log('API call error:', err.message);
});
