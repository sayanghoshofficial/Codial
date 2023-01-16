const express = require('express');
const app = express();
const port = 8000;

app.listen(function(err){
    if(err){
        console.log(`Error is running on server :${err}`);
    }
    console.log(`Server is running on: ${port}`);
})