const router = require('express').Router()
const Model = require('../models')
const bcrypt = require('bcryptjs')


router.get('/', function ( req, res ) {
  res.send('INI HOME EXPRESS')
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
    })
    .catch( err => {
      res.send(err)
    })
})

// ===========================================

router.get('/login', function ( req, res ) {
  if (!req.session.user){
    res.render('login.ejs')
  } else {
    res.send('anda sudah login')
  }
})

router.post('/login', function ( req, res ) {
  
  Model.User.findOne( { where : { email : req.body.email } } )
    .then( found => {
      if (found) {
        // res.send(req.body)
        let check = bcrypt.compareSync(req.body.password, found.password)
        if (check) {
          req.session.user = {
            email : req.body.email
          }
          res.send('login berhasil')
        } else {
          res.send('login salah')
        }
      } else {
        res.redirect('/login')
      }
    })
})

router.get('/session' , function ( req, res ) { 
  if (req.session.user) {
    res.send('user sedang masuk')
  } else {

    res.send('user belom login')
  }

})

module.exports = router