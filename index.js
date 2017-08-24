"use strict";
const http = require('http');
const aws = require('aws-lib');
const express = require('express');
const config = require('./config');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const log = require('simple-node-logger').createSimpleFileLogger('/tmp/sms_handler.log');
const bodyParser = require('body-parser')

log.setLevel('debug');


function getProductRating(product_code) {
  let url = `https://www.amazon.com/gp/customer-reviews/widgets/average-customer-review/popover/ref=dpx_acr_pop_?contextId=dpx&asin=${product_code}`;
  axios.get(url).then((res) => {
    let idx = res.data.indexOf(' out of 5 stars');
    return = res.data.substring(idx-3, idx+15);
  });
}

const app = express();

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/sms', (req, res) => {
  log.info('Incoming message');
  const twiml = new MessagingResponse();
  let msg = '';
  if (req.body !== undefined) {
    msg = `${req.body.From} texted me ${req.body.Body}`;
	const upc = req.body.Body;
  } else {
    msg = 'Could not parse message';
  }
  log.info(msg);
  twiml.message(msg);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(3001, () => {
  console.log("Express server listening on port 3001");
});

