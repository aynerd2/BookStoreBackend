const express =  require('express')
const router = express.Router()

const {signup, signin} = require('../controller/user.controller.route.js')

router.post('/register', signup)
router.post('/login', signin)


module.exports = router;