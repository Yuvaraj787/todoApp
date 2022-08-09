const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}));
const mongoose = require("mongoose");
function conn_to_db(na) {
    mongoose.connect("mongodb+srv://itsyuvi:test123@cluster0.hj8tf4h.mongodb.net/"+na+"?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('mongo connected')).catch(err => console.log(err)); 
}
conn_to_db("passwords");
var usernames = [];
var passwords= [];
var u = "";
const paschemea = new mongoose.Schema({
    username: {type:String,required:true},
    password: {type:String, required:true}
});
const pamodel = mongoose.model("passwords",paschemea); 
pamodel.find({},function (err,docs) {
    docs.forEach(elet => {
        usernames.push(elet.username);
        passwords.push(elet.password);
    });
    console.log("usernames:"+usernames);
    console.log("passwords:"+passwords);
});
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
app.use(express.static('external'));
var lists = [];
var notexit = false;
var incorrect = false;
var alreadyexist = false;
var newOne = false
console.log("1");
app.get('/',function(req,res) {
    res.render('signup.ejs',{err:alreadyexist})
})
app.get('/login',(req,res)=> {
    res.render('login.ejs',{uerr:notexit,perr:incorrect,msg:newOne})
})
app.post('/verify',(req,res)=>{
    var uname = req.body.una;
    var pass = req.body.pass;
    if (usernames.includes(uname)) {
        var i = usernames.indexOf(uname);
        console.log(i);
        if (pass == passwords[i]) {
            conn_to_db(uname)
            res.cookie("username",uname);
            res.redirect("/lists");
        } else {
            incorrect = true;
            res.redirect('/login');
        }
    } else {
        notexit = true;
        res.redirect('/login');
    }
})
app.post("/create",async (req,res)=> {
    mongoose.disconnect();
    conn_to_db("passwords");
     var un = req.body.lname;
     u = un;
     var pas = req.body.pass;
     if (usernames.includes(un)) {
        alreadyexist = true;
        res.redirect("/");
     } else {
        var newUser = new pamodel({
            username: un,
            password: pas
     })
    await newUser.save();
    usernames.push(un);
    passwords.push(pas);
    await mongoose.disconnect();
    newOne = true;
    res.redirect("/login");
    }
})
app.get('/lists',function(req,res) {
    mongoose.disconnect();
    var lists = [];
    conn_to_db(req.cookies.username);
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
    var curDay = require(__dirname + "/today.js");
    res.render("display.ejs",{NameOfDay: curDay(),newItem: lists, pagename: "",uname:req.cookies.username});
    })    
})
app.post("/finish",function(req,res) {
    var ic = Number(req.body.in);
    conn_to_db(req.cookies.username);
    Work.deleteOne({_id:ic},function(err) {
        if (! err) {
            console.log("deleted")
        }
    lists = [];
    res.redirect("/lists");
    })    
});
app.get("/logout",(req,res)=>{
    res.clearCookie("username");
    res.redirect("/");
})
app.post("/lists",async function(req,res) {
    conn_to_db(req.cookies.username);
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