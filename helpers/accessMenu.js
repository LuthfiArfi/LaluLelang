module.exports = ( req, res, next ) => {
  if ( req.session.user ) {
    next()
  } else {
    res.redirect('/login?err=Must be logged in to access menu')
  }
}


// module.exports = mwAccess