const fetch = require('node-fetch')
exports.handler = async function(event, context) {
 
  const coordinates = event.body;
  const url = "https://api.tomtom.com/search/2/reverseGeocode/";
  // const token = '.json?key=' + process.env.TOMTOM_KEY;
  const token = '.json?key=feVld2SMaP5XrzH9dVUvBZ3WXo5WOsG9';
 
  // https://api.tomtom.com/search/2/reverseGeocode/40.49363,-74.50477.json?key=feVld2SMaP5XrzH9dVUvBZ3WXo5WOsG9
  try {
    const response = await fetch(url + coordinates + token, {
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