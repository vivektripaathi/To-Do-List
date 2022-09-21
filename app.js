const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true});
const itemschema = {
    name : String
};
const Item =  mongoose.model("item", itemschema);
const item1 = new Item({
    name : "Welcome to todoList!"
});
const item2 = new Item({
    name : "Hit the + button to add a new item"
});
const item3 = new Item({
    name : "<-- Hit this check box to cut the item"
});
const defaultItems = [item1, item2, item3];


app.get("/", (req, res)=>{
    let day = date.getDate();
    Item.find({}, (err, item)=>{
        if(!err){
            if(item.length == 0){
                Item.insertMany(defaultItems, (err)=>{
                    if(!err){
                        console.log("Sucessfully Added default Items to the list :)");
                    }
                });
                res.redirect("/");
            }else{
                    res.render('list', {day:day,newItem:item});
                }
        }
    }); 
});

app.post("/", (req, res)=>{
    const itemName = req.body.newItem;
    const item = new Item({
        name : itemName
    });
    item.save();
    res.redirect("/");
});
app.post("/delete", (req, res)=>{
    const checkedItem = req.body.checkbox;
    Item.findByIdAndRemove(checkedItem, (err)=>{
        if(!err){
            res.redirect("/");
        }
    });
});
app.listen(3000, ()=>{
    console.log("PORT : 3000")
});