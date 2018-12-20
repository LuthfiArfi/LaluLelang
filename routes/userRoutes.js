const router = require('express').Router()
const Model = require('../models')

router.get('/', function ( req, res ) {
  res.send('routes user masuk')
})

router.get('/transaction', function( req, res ) {
  res.render('transaction.ejs')
})

router.post('/transaction', function( req, res ) {
  Model.Transaction.create({
    Seller : req.body.SellerId,
    ProductId : req.body.ProductId,
    Buyer : req.body.BuyerId,
    createdAt : new Date(),
    updatedAt : new Date()
  })
    .then( created => {
      res.send(created)
    })
})
module.exports = router