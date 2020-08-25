const fetch = require('node-fetch') 
exports.handler = async function(event, context) {
  
  const coordinates = '/' + event.body;
  const darkUrl = "https://api.darksky.net/forecast/";
  // const darkKey = 'process.env.DARK_KEY';
  const darkKey = 'f16e16cbccd9cc7e4561e66941d93a97';
  const suffix="?extend=hourly";
  
  // console.log(darkUrl + darkKey + coordinates + suffix);
 
  try {
    const response = await fetch(darkUrl + darkKey + coordinates + suffix , {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify( data ),
    } 
  } catch (err) {
    console.log(err) 
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}