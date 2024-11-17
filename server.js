const express=require('express')
const app=express()
const port=process.env.PORT || 5000
const cors=require('cors')

const db=require('./dbconnection/db')
app.use(express.json())
app.use(cors())

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})



app.get('/',(req,res)=>{
    res.send("Welcome to management system")
})

const contactRoutes=require('./routes/contactRoutes')

app.use('/contacts',contactRoutes)