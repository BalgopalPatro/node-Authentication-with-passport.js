const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send('<h1>Hello Bg</h1>')
})

app.listen(3000,()=>{
    console.log("Server Started at 3000");
})