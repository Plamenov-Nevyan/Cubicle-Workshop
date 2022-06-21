const router = require('express').Router()

router.get('*', (req, res) => {res.render('404', {status:'404 - Not Found', message:'Page was not found...'})})

module.exports = router