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
  console.log('masukk here');
  console.log(req.session);
  if (req.session){
    next()
  } else {
    console.log('masuk');
    res.redirect('/login')
  }
},(req,res) => {
  let dataCreate = null;
  let obj = {
    UserId : req.session.id, //require id session
    ProductId : req.params.id,
    Bid : req.body.bid
  }
  // res.send(req.params.id)
  Model.Bid.create(obj)
  .then(data => {
    dataCreate = data;
    // res.send(dataCreate)
    console.log('in herereere');
    return Model.Product.findOne({
      where : {
        id : paramsId
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
      // res.send(updateBid)
      Model.Product.update(updateBid,{
          where : {
            id : paramsId
          }
        })
      .then(data =>{
        res.redirect(`/product/${paramsId}`);
      })
      .catch(err =>{
        throw new Error;
      })
    }
    else {
      res.redirect(`/product/${paramsId}`)
    }
    // res.send(dataProduct)
  })
  .catch(err =>{
    res.send('error');
  })
})

module.exports = router;
