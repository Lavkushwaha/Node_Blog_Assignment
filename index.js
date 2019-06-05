const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://lavkush:Lav@123@cluster0-fnbnt.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


const express = require('express');
const app = express();

//env.port this port is automatically assigned by heroku or deployment platform
var port = process.env.PORT || 8080;

var data;

//connect to mongo db atlas
client.connect(err => {
    data = client.db("sample_airbnb").collection("listingsAndReviews");
  // perform actions on the collection object
  console.log(data);
  client.close();
});

//routing setup for express
app.get('/', (req, res) => res.send('Hello !!'));
app.listen(port, () => console.log(`Blog App listening on port ${port}!`));
