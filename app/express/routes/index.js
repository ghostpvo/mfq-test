const path = require('path')
// express/routes/index.js sample
const { Router } = require('express')
const router = Router()

router.get('/ru/policy', (req, res) => {
  res.sendFile(path.resolve('./static/docs/policy.pdf'))
})

router.get('/en/policy', (req, res) => {
  res.sendFile(path.resolve('./static/docs/policy-en.pdf'))
})

module.exports = router
