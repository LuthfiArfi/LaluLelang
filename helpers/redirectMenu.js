module.exports = ( req, res, next ) => {
  if ( req.session.user.id === req.params.id ) {
    console.log("===============");
    next()
  } else {
    res.redirect(`/user/${req.params.id}`)
  }
}

//// HAPUSSSS