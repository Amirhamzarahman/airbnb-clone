//core module
const path = require('path')
const mongoose = require('mongoose')
//Express module
const express = require('express')
const storeRouter = require('./routes/storeRouter')
const hostRouter = require('./routes/hostRouter')
const rootDir = require('./utils/pathUtil')
const errorsController = require('./controllers/errors')
const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use((req,res,next) => {
  console.log(req.url,req.method)
  next()
})

app.use(express.urlencoded())

app.use('/user',storeRouter)

app.use('/host',hostRouter)

app.use(express.static(path.join(rootDir,'public')))
app.use(errorsController.get404)
const PORT = 3002
const DB_PATH = 'mongodb+srv://amirhamzarahman24_db_user:Amir2424@completecoding.q5xkxcs.mongodb.net/airbnb?appName=CompleteCoding'

mongoose.connect(DB_PATH).then(() => {
  console.log('connected to mongoDB')
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/user/`)
})})
.catch(err => {
  console.log('error while connecting to mongo: ',err)
})