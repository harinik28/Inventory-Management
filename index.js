const express = require('express')
const path = require('path')
const {apiRoute} = require('./src/router/indexRouter')

const app = express()

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.url,req.method)
    next()
})

app.use('/js', express.static('src/views/assets/js'))
app.use('/css', express.static('src/views/assets/css'))
app.use('/assets',express.static('src/views/assets'))

app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/views/index.html'))
})

app.use('/api',(req,res,next)=>{
    console.log("Middleware")
    next()
},apiRoute)

app.use((req,res)=>{
    res.end('404 not Found')
})

app.listen( 1009 ,()=>{
    console.log("Server is Running..")
})