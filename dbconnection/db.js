const mongoose=require('mongoose')
require('dotenv').config();
const mongodburi='mongodb://localhost:27017/contacts'


mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })

const db=mongoose.connection

db.on('connected',()=>{
    console.log('connected to mongo instance')
})

module.exports=db;