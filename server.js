const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const path = require('path')
const cors = require('cors')
const multer = require('multer')

const app = express()
const PORT = 3001
const storage = multer.diskStorage({
    destination:(req,file, cb) => {
        cb(null, "public/images")
    },
    filename:(req,file, cb) =>{
        cb(null, req.body.name)
    }
})
const upload = multer(storage)

require('dotenv').config()
require('./config/database')
app.use(morgan('dev'))
app.use(express.json())
app.use('/images', express.static(path.join(__dirname,'public/images')))
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

app.post("/api/upload", upload.single('file'), (res,req) =>{
    try{
        return res.status(200).json('File Uploaded!')
    }catch(err){
        console.log(err)
    }
})

app.listen(PORT, function(){
    console.log(`Express app is running on ${PORT}`)
})















