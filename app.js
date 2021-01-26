const express = require('express')
const app = express()
const index = require('./routes/indexRoutes')
const user = require('./routes/userRoutes')
const product = require('./routes/productRoutes')
const session = require('express-session')
const mwAccess = require('./helpers/accessMenu')

const port = process.env.PORT || 3000 ;

app.use( '/public', express.static( "public" ));
app.use( '/assets',express.static( "assets" ));
app.set('view engine', 'ejs')
app.use(session({
  secret: 'lelanglelang'
}))
app.use(express.urlencoded( { extended : false } ))

app.use('/user', mwAccess, user);
app.use('/product', product);
app.use('/', index);

app.listen(port, function () {
  console.log('this is listening to port', port)
})

