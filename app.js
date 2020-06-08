const express = require('express');
const cors = require('cors')({ origin: true });
const app = express();
const engines = require('consolidate');
const bodyparser = require('body-parser');

const passport = require('./passport');

const auth = require('./routes/auth');
const user = require('./routes/user');

app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), user);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(cors);

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');
app.get('/',(req,res)=>{
    res.render('index');
})

// app.post('/login',(req,res)=>{
//     console.log(req.body);
//     res.send(req.body);
// })

app.listen(3001,()=>{
    console.log("Server Started at 3001");
})