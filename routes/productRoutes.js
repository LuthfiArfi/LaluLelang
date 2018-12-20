const express = require('express');
const router = express.Router();
const Model = require('../models')


//-----------------------------list product-------------------------
router.get('/', (req,res) => {
  Model.Product.findAll()
  .then(itemProduct =>{
    res.render('index.ejs',{
      dataProduct : itemProduct
    })
  })
  .catch(err =>{
    res.send('error : ',err)
  })
})

//--------------------product id / bidding--------------------------
router.get('/:id', (req,res) =>{
  Model.Product.findOne({
    where : {
      id : req.params.id
    }
  })
  .then(item =>{
    res.render('product.ejs', {
      title : item.name,
      dataProduct : item
    })
    // res.send(item)
  })
  .catch(err => {
    res.send('error : ',err)
  })
})

router.post('/:id',(req,res) =>{
  let paramsId = req.params.id;
  let dataCreate = null;
  let obj = {
    UserId : 3, //require id session
    ProductId : paramsId,
    Bid : req.body.bid
  }
  // res.send(req.params.id)
  Model.Bid.create(obj)
  .then(data => {
    dataCreate = data;
    // res.send(dataCreate)
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
