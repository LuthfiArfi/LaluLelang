const router = require('express').Router()
const Model = require('../models')

router.get('/', function ( req, res ) {
  res.send('routes user masuk')
})

module.exports = router