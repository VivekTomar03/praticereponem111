const { UserModel } = require("../model/user.model")


const userauth = async(req,res,next) => {
      const data = await UserModel.find({email:req.body.email})
      if(data.length>0){
        res.send({
            msg:"user already exit ! please login or change email"
        })
      }
      else{
        next()
      }
}


module.exports = {
    userauth
}