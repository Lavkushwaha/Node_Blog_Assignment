const express = require("express");
const Post = require("../models/post.model"); //post model
const Follow = require("../models/follow.model");
const CheckIfLogin = require("../middleware/checkIfLogin");
const formatResponse = require("../controllers/formatResponse");

const router = express.Router();

router.post("/create",CheckIfLogin, (req, res) => {
  response={};
    if (res.locals.tokenError == "Invalid token") {
        response.status = 404;
        response.message = "User not loggedin " + res.locals.username;
        res = formatResponse(res, response);
        return res.status(200).send(res.response);
      }

  Post.create(
    {
      username: res.locals.username,
      title: req.body.title,
      content: req.body.content
    },
    function(err, post) {
      if (err) return res.status(500).send(err.message);
      return res.status(200).send(post.title + " created successfully");
    
    });

});

router.post("/remove",CheckIfLogin, (req, res) => {
    response={};
      if (res.locals.tokenError == "Invalid token") {
          response.status = 404;
          response.message = "User not loggedin " + res.locals.username;
          res = formatResponse(res, response);
          return res.status(200).send(res.response);
        }

        Post.findOneAndRemove({_id: req.body.id, username:res.locals.username}, (err, doc)=>{
            if(err || !doc){
                response.status = 201;
                response.message = "Cannot delete post";
                res = formatResponse(res, response);
                return res.status(200).send(res.response);
            }
            
            response.status = 200;
            response.message = "Post deleted successfully";
            res = formatResponse(res, response);
            return res.status(200).send(res.response);
        })
  
  });


  
router.get("/feed",CheckIfLogin, (req, res) => {
    response={};
      if (res.locals.tokenError == "Invalid token") {
          response.status = 404;
          response.message = "User not loggedin " + res.locals.username;
          res = formatResponse(res, response);
          return res.status(200).send(res.response);
        }


        Follow.find({who: res.locals.username}, (err,docs)=>{
            if(err){
                
                response.status = 500;
                response.message = "Some error occurred";
                res = formatResponse(res, response);
                return res.status(200).send(res.response);
            }

            console.log(docs);
            followings = []
            for(i in docs){
                followings[i] = docs[i].whom;
                
            }
            console.log(followings);
            Post.find({username: { $in: followings }}, (err,docs)=>{
                console.log("error",err);
                console.log("docs",docs);
                if(err){
                    
                    response.status = 500;
                    response.message = "Some error occurred";
                    res = formatResponse(res, response);
                    return res.status(200).send(res.response);
                }
                response.status = 200;
                response.message = "feed fetched successfully";
                response.feed = docs;
                res = formatResponse(res, response);
                return res.status(200).send(res.response);
                
            })
        })
  
  });


  





module.exports = router;
