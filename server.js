const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
var u = "";
const tschema = new mongoose.Schema({
    _id: {
        type: Number,
        required : true
    },
    work: {
        type: String,
        required: true
    },
    work_finished: Boolean
})
const Work = mongoose.model("Todos",tschema);
app.set('view-engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('external'));
var lists = [];
app.get('/',(req,res)=> {
    res.sendFile(__dirname + "/login.html");
})
app.post("/showlist",function(req,res) {
    mongoose.disconnect();
    var lname = req.body.lname;
    var pass = req.body.pass;
    u = lname;
    mongoose.connect("mongodb+srv://itsyuvi:test123@cluster0.hj8tf4h.mongodb.net/"+lname+pass+"?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('mongo connected')).catch(err => console.log(err));
    res.redirect("/lists");  
})
app.get('/lists',function(req,res) {
    var lists = [];
    Work.find({},function(err,docs) {
        lists = [];
        if (err) {
            console.log("error is happening"); 
        } else {
            docs.forEach(w => {
                console.log("first");
                var col = [w._id,w.work,w.work_finished]
                lists.push(col)   
            });
        }
    console.log("next");
    var curDay = require(__dirname + "/today.js");
    res.render("display.ejs",{NameOfDay: curDay(),newItem: lists, pagename: "",uname:u});
    })    
})
app.post("/finish",function(req,res) {
    var ic = Number(req.body.in);
    Work.deleteOne({_id:ic},function(err) {
        if (! err) {
            console.log("deleted")
        }
    lists = [];
    res.redirect("/lists");
    })    
});
app.post("/lists",async function(req,res) {
 
 var item = req.body.item;
    var idf = Math.round(Math.random() * 1000);
    const nwork = new Work({
        _id:idf,
        work:item,
        work_finished:false
    });
    lists.push([idf,item,false]);
    await nwork.save();
    res.redirect('/lists');
})
app.get("/about",function(req,res) {
    res.render('about.ejs');
})
app.listen(process.env.PORT || 3000,function() {
    console.log('server is running boss');
})