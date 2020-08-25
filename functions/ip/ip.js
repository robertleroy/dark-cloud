const fetch = require('node-fetch')
exports.handler = async function(event, context) {

  const ipv4 = event.body;
  const url = `http://ip-api.com/json/${ipv4}?fields=57823`;

  try {
    const response = await fetch( url, {
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
