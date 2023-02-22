const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');


app.use(sassMiddleware({
    src : './assets/sass',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));


//make the uploads path avaible to the browser
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

app.use(expresslayouts);
//extracts scripts and link tag from sub pages of layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//mongo store used to store session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongoUrl :'mongodb+srv://Sayanghosh:sayan123@cluster0.fxab6ur.mongodb.net/test',
        autoRemove:'interval',
        autoRemoveInterval:'1'
    }),function(err){
        console.log(err || 'connect-mongo setup ok')
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMWare.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error is running on server :${err}`);
    }
    console.log("C:\Sayan\codingninjas\NodeJS\NodeWS\codial\\uploads");
    console.log(`Server is running on: ${port}`);
})