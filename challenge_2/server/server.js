const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/btc', async (req, res) => {
  try {
    const btcPrices = await axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-01-01&end=2018-12-06');
    res.send(btcPrices.data.bpi);
  } catch (err) {
    console.log('COINDESK API ERROR: ', err);
  }
});
