const express = require("express")
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/user.model");
const { userauth } = require("../middleware/userauth");
const jwt = require('jsonwebtoken');
const userRouter = express.Router()


userRouter.post("/add" ,  userauth, async(req,res) => {
    const {name, email, password , gender , age, city} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            // Store hash in your password DB.
            // console.log(hash);
           if(err) {
            res.send({
                err:err.message,
                msg:"unable to hash pass"
            })
           }
           else{
              const data = new UserModel({name, email, password:hash, gender, age , city})
              await data.save()
               res.send({
                msg :" user has been created "
               })
           }

        })
    } catch (error) {
        res.send({
            err:error.message,
            msg:"error while posting user"
        })
    }
})


userRouter.post("/login" , async(req,res) => {
    const {email,password} = req.body
    try {
      
       const data = await UserModel.findOne({email})
    //    console.log(data);
       if(data){
         const token = jwt.sign({ postID:data._id , owner:data.name }, 'vivek');
        //  console.log(token);
         bcrypt.compare(password, data.password, (err, result) =>{
              if(result){
                    res.send({
                        message:"login done",
                        token
                    })
              }
              else  {
                res.send({
                    err1:"unable to login data not found",
                    
                })
              }
        });
       }
       else{
        res.send({
            err:"unable to login data not found"
        })
       }
    
    } catch (error) {
        res.send({
            err:error.message,
            msg:"unable to login"
        })
    }
})
 
module.exports = {
    userRouter
}