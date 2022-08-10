const express = require('express');
var cookieParser =require('cookie-parser');
// const bodyparser = require('body-parser');
const app = express();
app.use(cookieParser());
app.get("/",(req,res)=> {
    res.cookie("new","yes")
    res.send("<h1>hi</h1>")
})
app.listen(3000,()=>{
    console.log("server is running")
})