const express = require('express')
const app = express()
const user = require('./routes/userRoutes')
const product = require('./routes/productRoutes')
let port = 3000

app.use( express.static( "public" ) );
app.set('view engine', 'ejs')
app.use(express.urlencoded( { extended : false } ))

app.get('/', function ( req, res ) {
  res.send('INI HOME EXPRESS')
})


app.use('/user', user);
app.use('/product', product);



app.listen(port, function () {
  console.log('this is listening to port', port)
})
