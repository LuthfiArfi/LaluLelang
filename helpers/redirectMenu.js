module.exports = ( req, res, next ) => {
  if ( req.session.user.id === req.params.id ) {
    next()
  } else {
    res.redirect(`/user/${req.params.id}`)
  }
}
