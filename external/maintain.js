var checkboxs = body.querySelectorAll(".che");
// var lis = document.querySelectorAll("li");
// alert("connected");
const mongoose = require('mongoose');
// import { mongoose } from 'mongoose';
mongoose.connect("mongodb://localhost:27017/newdb");
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
for (let i = 0; i < checkboxs.length; i++) {
    var cbox = checkboxs[i];
    cbox.addEventListener("click",function() {
        alert("hi");
        var cl = Number(cbox.getAttribute("id"));
        Work.find({_id:cl},{work_finished},function(err,docs) {
            if (err) {
                console.log("error happened");
            } else {
                var st = docs[0].work_finished
                if (st) {
                    Work.updateOne({_id:cl},{work_finished:false})
                } else {
                    Work.updateOne({_id:cl},{work_finished:true})
                }
            }
        })
    })
}
