const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/book.route.js')
const userRouter = require('./routes/user.route.js')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
require('dotenv').config();


app.get('/', (req, res)=>{
      res.json({message: "Hello to Backend"})
})

app.use(process.env.APP_BOOK_ROUTE, bookRouter)
app.use(process.env.APP_AUTH_ROUTE, userRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(3001, (req,res)=>{
      console.log("Server ready at PORT 3001")
})


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{

      console.log("Connection Succesful!")
})
.catch(()=>{
      console.log("Connection Failed!")
})