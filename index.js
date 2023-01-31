const express = require('express');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(expresslayouts);
//extracts scripts and link tag from sub pages of layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error is running on server :${err}`);
    }
    console.log(`Server is running on: ${port}`);
})