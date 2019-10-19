var express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


var app = express();
const ejs = require("ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));



mongoose.connect('mongodb://localhost:27017/libraryDB', {useNewUrlParser: true});


const booksSchema = new mongoose.Schema ({
  name: String,
  author: String,
  publisher: String,
  pages: Number,
  stock: Number
});

const Book = new mongoose.model('books', booksSchema);

app.get("/", function (req, res) {

  Book.find({}, function (err, foundBook) {
    if(err){
      console.log(err);
    } else {
      console.log(foundBook);
      res.render("home",{books: foundBook });
    }
  });

});

app.post("/", function (req, res) {

  var book = new Book({
     name : req.body.name,
     author : req.body.author,
     publisher : req.body.publisher,
     pages : req.body.pages,
     stock : req.body.stock
  });

  book.save();

  res.redirect("/");
});


app.listen(3000, function () {
  console.log("Your server started successfully");
});
