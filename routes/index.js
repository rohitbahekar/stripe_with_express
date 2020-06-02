var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_AQIQNYReYTafQKZNvMHas6ZE002tVg0J3b');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/secret/:amount', async (req, res, next) => {
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.params.amount ? req.params.amount * 100 : 10000,
    currency: 'usd',
    metadata: {integration_check: 'accept_a_payment'},
  });
  res.json({client_secret: paymentIntent.client_secret});
});

router.post('/hooks', async (req, res, next) => {
  console.warn({hookData: req.body})
  res.json({success:true});
});

module.exports = router;
