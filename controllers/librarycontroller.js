var express = require('express');
var bodyParser = require('body-parser');
var Library = require('../models/library');

var router = express.Router();
router.use(bodyParser.urlencoded({extended: true, limit: '3gb' }));



// CREATES A NEW BOOK IN LIBRARY
// router.post('/', function (req, res) {
//   Library.create({
//       Cover : req.body.Cover,
//       Title : req.body.Title,
//       Author : req.body.Author,
//       Number_Of_Pages : req.body.Number_Of_Pages,
//       Publish_Date : new Date(req.body.Publish_Date.toString()),
//       Synopsis: req.body.Synopsis,
//       Rating: req.body.Rating,
//       Delete: req.body.Delete
//     },
//     function (err, book) {
//       if (err) return res.status(500).send("There was a problem adding the information to the database.");
//       res.status(200).send(book);
//     });
//   });

router.get('/', function(req, res) {
  console.log('hit');
  Library.find({}, function(err, book){
    if(err) return res.status(500).send('There was a problem finding books in the Library.');
    res.status(200).send(book);
  });
});

router.get('/:id', function(req, res) {
  Library.findById(req.params.id, function(err, book) {
    if (err) return res.status(500).send('There was a problem finding books in the Library.');
    res.status(200).send(book);
  });
});

router.delete('/:id', function (req, res) {
    Library.findByIdAndRemove(req.params.id, function (err, book) {
        if (err) return res.status(500).send("There was a problem deleting the book.");
        res.status(200).send("book by "+ book.Title +" was deleted.");
    });
});

router.put('/:id', function(req, res) {
  Library.findByIdAndUpdate(req.params.id,
    req.body, {new : true},
    function(err, book) {
    if (err) return res.status(500).send("There was a problem updating the book.");
    res.status(200).send("book by "+ book.Title +" was updated.");
  });
});

router.post('/', function (req, res) {
  // pay attention to serialization and deserialization. turn it back into json. use JSON.parse(req.body.books)
  Library.collection.insert(JSON.parse(req.body.books),
    function (err, book) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(book);
    });
  });

router.get('/search/:search', function(req,res) {
  // console.log("this happened!");
  // Library.collection.createIndex({Title: 'text', Author: 'text'});
  // console.log(req.params.search);
  Library.aggregate([{$match: {$text: {$search: req.params.search}}}],
  function (err, book) {
    if (err) return res.status(500).send("There was a problem adding the information to the database.");
    res.status(200).send(book);
  })
});

module.exports = router;
