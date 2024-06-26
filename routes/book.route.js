const express =  require('express')
const router = express.Router()
const {verifyJWT} = require('./../controller/user.controller.route.js')
const upload = require("../config/upload.js")

const { 
      createBooks,
      getBooks,
      getBook,
      updateBook,
      deleteBook,
    
} = require('../controller/book.controller.route.js')



router.post('/', verifyJWT, upload.single('image'), createBooks)

router.get('/', verifyJWT, getBooks)

router.get('/:id', verifyJWT, getBook)

router.put('/:id', verifyJWT, updateBook)

router.delete('/:id', verifyJWT, deleteBook)
 
module.exports = router;

