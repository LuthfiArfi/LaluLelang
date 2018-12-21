const express = require('express');
const router = express.Router();
const Model = require('../models')

router.use( '/products',express.static( "views/img" ))

//-----------------------------list product-------------------------
router.get('/', (req,res) => {
  Model.Product.findAll()
  .then(itemProduct =>{
    // let year = itemProduct.end_time.getFullYear();
    // let month = itemProduct.end_time.getMonth();
    // let date = itemProduct.end_time.getDate();
    let items = itemProduct.map( a => a.fixDate())
    console.log(items);
    res.render('index.ejs',{
      dataProduct : items
    })
    // res.send(items)
  })
  .catch(err =>{
    res.send('error')
  })
})

//////////////////////////////////////////////////////////////////// BELOM
router.get('/expired', function(req, res) {
  let productId = null //product id
  let endBid = null
  let buyerId = null
  let sellerId = null
  Model.Product.allNotExpired()
    .then( data => {
      for (let i = 0 ; i < data.length ; i++){
        if (new Date() < new Date(data[i].end_time)){
          productId = data[i].id
          sellerId = data[i].UserId
          console.log(sellerId);
          endBid = data[i].end_bid
          console.log(endBid);
          i = data.length
        }
      }
      // return Model.Bid.findAll({ where : { ProductId : 1}})
      return Model.Product.update({ isExpired : 1 } , { where : { id : productId } } )
    })
    .then( () => {
      // res.send(updated)
      res.send('masuk')
      return Model.Bid.findOne( { where : { ProductId : productId, end_bid : endBid } })
    })
    .then( bid => {
      buyerId =  bid.UserId
      console.log('masukhere')
    })
    .catch( err => {
      res.send(err)
    })
})
//////////////////////////////////////////////////////////////////////

//=========================add product============
router.get('/add', function(req,res){
  res.render('addProduct.ejs')
})

router.post('/add', function(req,res){
  let date = req.body.end_date + ' ' + req.body.end_time
  let time = new Date(date)
  let obj = {
    name : req.body.name,
    early_bid : req.body.early_bid,
    end_bid : req.body.early_bid,
    end_time : time
  }
  Model.Product.create(obj)
  .then(data => {
    console.log(data);
    res.redirect('/product')
  })
  .catch(err => {
    res.send('err')
  })
})

//==================product edit===============
router.get('edit/:id', function(req, res) {
  Model.Product.findOne({
    where : {
      id : req.params.id
    }
  })
  .then(dataFind =>{
    res.render('editProduct.ejs', {
      data : dataFind
    })
  })
  .catch(err =>{
    res.send(err)
  })
})

router.post('edit/:id', function(req, res) {
  let date = req.body.end_date + ' ' + req.body.end_time
  let time = new Date(date)
  var obj = {
    id : req.params.id,
    name : req.body.name,
    end_time : time
  }
  Model.Product.update(
    obj, {
      where : { id : req.params.id }
  })
  .then(data => {
    res.redirect('/product')
  })
  .catch(err =>{
    res.send('err')
  })
})

//----------------------product delete-----------------------
router.get('/delete/:id', function(req, res) {
  Model.Product.destroy(
    {where : { id : req.params.id}}
  )
  .then(()=>{
    res.redirect('/product')
  })
  .catch(err =>{
    res.send('err')
  })
})


//--------------------product id / bidding--------------------------
router.get('/:id', (req,res) =>{
  Model.Product.findOne({
    where : {
      id : req.params.id
    }
  })
  .then(item => {
    let itemFixed = item.fixDate()
    res.render('product.ejs', {
      title : item.name,
      dataProduct : itemFixed
    })
    // res.send(itemFixed)
  })
  .catch(err => {
    res.send('error')
  })
})

router.post('/:id', (req, res, next) => {
  if ( req.session.user ){
    next()
  } else {
    res.redirect('/login')
  }
}, (req,res) => {
  let dataCreate = null;
  let obj = {
    UserId : req.session.id,// req.session.id, //require id session
    ProductId : req.params.id,
    Bid : req.body.bid
  }
  Model.Bid.create(obj)
  .then(data => {
    dataCreate = data;
    // res.send(dataCreate)
    return Model.Product.findOne({
      where : {
        id : req.params.id
      }
    })
  })
  .then(dataProduct => {
    // console.log(dataCreate.Bid, dataProduct.end_bid );
    if (dataCreate.Bid > dataProduct.end_bid) {
      var updateBid = {
        name : dataProduct.name,
        early_bid : dataProduct.early_bid,
        end_bid : dataCreate.Bid,
        end_time : dataProduct.end_time,
        img : dataProduct.img,
        updatedAt : new Date()
      }

      return Model.Product.update(updateBid,{
        where : {
          id : req.params.id
        }
      })
    } else {
      return false
    }
  })
  .then( updated => {
    console.log('================');
    if (updated) {
      res.redirect(`/product/${req.params.id}`);
    } else {
      res.send('harga bid kurang')
    }
  })
  .catch(err =>{
    res.send(err);
  })
})

module.exports = router;
