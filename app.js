// At the top of your main entry point file (e.g., index.js, app.js, or server.js)
if (process.env.NODE_ENV!='Production'){
    require('dotenv').config();
}
// Accessing environment variables
// console.log(process.env); // This will log all the environment variables loaded by dotenv



const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Port = 3000;
const Listing = require('./models/schema.js');
const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const listingRouter=require('./routers/listing.js');
const reviewRouter=require('./routers/reviews.js');
const signUpRouter=require('./routers/users.js')
const session=require('express-session');
const MongoStore = require('connect-mongo');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js');

const dbURL=process.env.MONGO_URL;

const store=MongoStore.create({
    mongoUrl: dbURL,
    touchAfter: 24*60*60,
    crypto:{
        secret:process.env.SECRET
    }
});

const SessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
};

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash())
app.use(session(SessionOptions))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.User=req.user;
    res.locals.url=req.session.url;
    // console.log(res.locals.success)
    next();
});

app.use('/listings',listingRouter)
app.use('/listings/:id/reviews',reviewRouter);
app.use('/',signUpRouter);

async function main() {
    try {
        await mongoose.connect(dbURL);
        console.log('Connection successful');
    } catch (err) {
        console.error('Connection failed', err);
    }
}

main();

app.listen(Port, () => {
    console.log(`App is listening at port ${Port}`);
});

app.get('/', (req, res) => {
    res.send("Hi! I'm root");
});

// Catch-all for unmatched routes
app.use((req, res, next) => {
    next(new ExpressError(404, `Route ${req.originalUrl} Not Found`));
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;
    res.status(status).render('error.ejs', { message });
});

