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





































router.get('/transactions' , function( req, res ) {
  res.render('transaction.ejs')
})

router.get('/transactions/buy/:id', function( req, res ) {
  Model.User.findAll({
    include : [{
      model : Model.User, as : "Buying"
    }] ,
    where : { id : req.params.id}
  })
    .then( allData =>{
      res.send(allData)
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/transactions/sell/:id', function( req, res ) {
  Model.User.findAll({
    include : [{
      model : Model.User, as : "Selling"
    }] ,
    where : { id : req.params.id}
  })
    .then( allData =>{
      res.send(allData)
    })
    .catch( err => {
      res.send(err)
    })
})

module.exports = router