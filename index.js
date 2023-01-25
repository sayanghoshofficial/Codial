const express = require('express');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');



app.use(expresslayouts);

//use express router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(`Error is running on server :${err}`);
    }
    console.log(`Server is running on: ${port}`);
})