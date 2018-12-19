const router = require('express').Router()
const Model = require('../models')

router.get('/', function ( req, res ) {
  res.send('routes user masuk')
})

router.get('/register', function ( req, res) {
  res.render('register.ejs')
})

router.post('/register', function ( req, res ){
  Model.User.create({
    name : req.body.name,
    password : req.body.password,
    email : req.body.email
  })
    .then( created => {
      res.send('register berhasil')
      console.log(created);
    })
    .catch( err => {
      res.send(err)
    })
})


module.exports = router