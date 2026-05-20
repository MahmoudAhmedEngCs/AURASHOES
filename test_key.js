import fetch from 'node-fetch';

const apiKey = "a7a27014f0msh3492d7ce4669b01p168dafjsn3f62b70ae312";
const url = 'https://real-time-sneaker-prices.p.rapidapi.com/brand/nike?limit=20';

console.log("Testing API Key:", apiKey);

fetch(url, {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'real-time-sneaker-prices.p.rapidapi.com',
    'x-rapidapi-key': apiKey
  }
})
.then(res => {
  console.log("Status:", res.status);
  return res.json();
})
.then(json => {
  console.log("Response:", JSON.stringify(json).substring(0, 200));
})
.catch(err => {
  console.error("Error:", err);
});
