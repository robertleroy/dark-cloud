const fetch = require('node-fetch')
exports.handler = async function(event, context) {
 
  const searchTerm = event.body;
  const url = "https://api.tomtom.com/search/2/search/";
  const token = '.json?key=' + process.env.TOMTOM_KEY;
  const params = '&limit=1&lat=40.0426&lon=-106.3980&idxSet=Geo';

  console.log(url + searchTerm + token + params);

  try {
    const response = await fetch(url + searchTerm + token + params, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err) 
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}
