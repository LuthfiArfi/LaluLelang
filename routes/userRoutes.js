const router = require('express').Router()
const Model = require('../models')
const redirect = require('../helpers/redirectMenu')

// router.get('/', function ( req, res ) {
//   res.send('routes user masuk') // profile menu
// })

router.get('/transaction', function( req, res ) {
  res.render('transaction.ejs')
})

router.post('/transaction', function( req, res ) { // create transaction manual
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

router.get('/buy', function( req, res ) {
  Model.User.findOne({
    include : [{
      model : Model.User, as : "Buying"
    }] ,
    where : { id : req.session.user.id}
  })
    .then( allData =>{
      // res.send(allData)
      res.render('buying.ejs', { data : allData})
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/sell', function( req, res ) {
  Model.User.findOne({
    include : [{
      model : Model.User, as : "Selling"
    }] ,
    where : { id : req.session.user.id}
  })
    .then( allData =>{
      // res.send(allData)
      res.render('selling.ejs', { data : allData})
    })
    .catch( err => {
      res.send(err)
    })
})

router.get('/:id', redirect, function ( req, res ) {
  res.send('routes user masuk') // profile menu
})

module.exports = router