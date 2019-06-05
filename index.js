const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://lavkush:Lav@123@cluster0-fnbnt.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
   var data = client.db("sample_airbnb").collection("listingsAndReviews").find();
  // perform actions on the collection object
  console.log(data);
  client.close();
});
