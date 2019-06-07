const express = require("express");
const Follow = require("../models/follow.model"); //post model
const CheckIfLogin = require("../middleware/checkIfLogin");
const formatResponse = require("../controllers/formatResponse");
const router = express.Router();

router.post("/follow",CheckIfLogin, (req, res) => {
  response={};
    if (res.locals.tokenError == "Invalid token") {
        response.status = 404;
        response.message = "User not loggedin " + res.locals.username;
        res = formatResponse(res, response);
        return res.status(200).send(res.response);
      }

      if(res.locals.username == req.body.whom){
          response.status = 401;
          response.message = "Cant Follow Self " + res.locals.username;
          res = formatResponse(res, response);
          return res.status(200).send(res.response);
    }


    // find return empty array
    // findOne return single document or null 
    Follow.findOne({who:res.locals.username,whom:req.body.whom},(err,doc)=>{

        if(err || doc){
        
          console.log(doc);
          response.status = 401;
          response.message = "Unable to perform request ";
          res = formatResponse(res, response);
          return res.status(200).send(res.response);
        }


        Follow.create(
            {
              who: res.locals.username,
              whom: req.body.whom,   
            },
            function(err, follow) {
              if (err) return res.status(500).send(err.message);
              return res.status(200).send(follow.whom + " Followed Succesfully");
            
            });

    });

  

});


router.post("/unfollow",CheckIfLogin, (req, res) => {
    response={};
      if (res.locals.tokenError == "Invalid token") {
          response.status = 404;
          response.message = "User not loggedin " + res.locals.username;
          res = formatResponse(res, response);
          return res.status(200).send(res.response);
        }
    

        Follow.findOneAndRemove({who:res.locals.username , whom:req.body.whom}, (err, doc)=>{
            if(err || !doc){
                response.status = 201;
                response.message = "Already Unfollowed";
                res = formatResponse(res, response);
                return res.status(200).send(res.response);
            }
            
            response.status = 200;
            response.message = "Unfollowed Successfully";
            res = formatResponse(res, response);
            return res.status(200).send(res.response);
        })
  
  });






module.exports = router;
