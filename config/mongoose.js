const mongoose = require('mongoose');

const url = "mongodb+srv://Sayanghosh:sayan123@cluster0.fxab6ur.mongodb.net/test";
mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.log.bind(console,"Error connecting :: MongoDB"));

db.once('open',function(){
    console.log("Connected to database :: MongoDB");
})

module.exports = db