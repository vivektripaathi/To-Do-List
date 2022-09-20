const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/logic');

const app = express();
var newItems = ["wakeup"];


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res)=>{
    let day = date.getDate();
    res.render('list', {day:day,newItem:newItems});
});

app.post("/", (req, res)=>{
    newItem = req.body.newItem;
    newItems.push(newItem);
    res.redirect("/");
})

app.listen(3000, ()=>{
    console.log("PORT : 3000")
});