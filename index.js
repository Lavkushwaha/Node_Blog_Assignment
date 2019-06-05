//imports
//................................................................................................
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//................................................................................................







//Mongo credentials
//..............................................................................................
const uri = "mongodb+srv://lavkush:Lav@123@cluster0-fnbnt.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
//..............................................................................................







//env.port this port is automatically assigned by heroku or deployment platform
//...............................................................................................
var port = process.env.PORT || 8080;
//................................................................................................







//passport for authentication middleware
//.........................................................................................
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});
//..........................................................................................









//.......................................................................................
//for database in mongodb
const myDatabase="blog";
//for collection in mongodb
const myCollection="user_data";
//........................................................................................











//routing setup for express
//...........................................................................................
app.get('/', (req, res) => res.send('Hello !!'));

app.get('/sample', (req, res) => {
    client.connect(err => {
        data = client.db(myDatabase).collection(myCollection);
        data.findOne({}, function(err, result) {
            if (err) throw err;
            console.log(result.name);
            db.close();
        });
    });

});


app.listen(port, () => {

        //connect to mongo db atlas
        client.connect(err => {
            data = client.db(myDatabase).collection(myCollection);
        // perform actions on the collection object
        console.log("Connected to "+ myDatabase);
        
        });    

});
//............................................................................................
