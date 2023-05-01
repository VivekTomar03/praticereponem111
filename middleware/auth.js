const jwt = require('jsonwebtoken');


const auth = async(req,res,next) => { 
    const token = req.headers.authorization
    // console.log(token);
    const decoded = jwt.verify(token.split(" ")[1], 'vivek');
    if(decoded){
        req.body.postID = decoded.postID
        req.body.owner = decoded.owner
        next()
    }
    else{
        res.send({
            err:"auth faile : you are not authorize to do this action"
        })
    }
}

module.exports = {auth}