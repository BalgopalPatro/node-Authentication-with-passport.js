const express = require('express');
const session = require('express-session');
const cors = require('cors')({ origin: true });
const app = express();
const engines = require('consolidate');
const bodyparser = require('body-parser');

const passport = require('./passport');
const auth = require('./routes/auth');
const user = require('./routes/user');

app.use(session({ secret: "helloBg" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', { session: false }), user);
app.use(cors);

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/success',(req,res)=>{
    res.json({message: "Login Success"});
})

app.listen(3001, () => {
    console.log("Server Started at 3001");
})