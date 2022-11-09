const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = 3001

require('dotenv').config()
require('./config/database')

app.use(morgan('dev'))
app.use(express.json())
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname,'build',)))
app.use(cors())

app.use('/api/users', require('./routes/api/users'))
// app.use('/api/users/login' ,require('./routes/api/users'))
app.use('/api/posts', require('./routes/api/posts'))

//API ROUTES
app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(PORT, function(){
    console.log(`Express app is running on ${PORT}`)
})















