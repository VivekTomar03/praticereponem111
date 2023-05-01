const express = require("express")
const { PostModel } = require("../model/post.model")


const postRouter = express.Router()

postRouter.get("/" , async(req,res) => {
    const device = req.query.device
    const device1 = req.query.device1
    const device2 = req.query.device2
     try {
         if(device){
            const data =await  PostModel.find({device})
              res.send(data)
         }
         else if (device1 && device2){
            const data = await PostModel.find({$and:[{$or:[{device:device1}, {device:device2}, ]}, {postID:req.body.postID}]})
             res.send(data)
         }
         else {
            const data = await PostModel.find()
             res.send(data)
         }
     } catch (error) {
        res.send({
            err:error.message
        })
     }
})

postRouter.post("/create" , async(req,res) => {
    try {
        
    const data = new PostModel(req.body)
    await data.save()
    res.send({
        msg:"post created"
    })

    } catch (error) {
        res.send({
            msg:"unable to create post",
            err:error.message
        })
    }
})


postRouter.get("/top" , async(req,res) => {
    try {
        const data =await PostModel.find()
        let max = 0
        let result = {}
         for(let i=0; i<(await data).length; i++){
            if(data[i].no_of_cmt>max){
                max = data[i].no_of_cmt>max
                result  = data[i]
            }
         }
          res.send(result)
    } catch (error) {
        res.send({
            err:error.message
        })
    }
})


postRouter.patch("/update/:postID" , async(req,res) => {
    const {postID} = req.params
    try {
      const data =  await PostModel.findOne({_id:postID}) 
       if(req.body.postID!= data.postID){
           res.send({
            msg:"you are not authorize to do this action"
           })
       }
       else{
         await PostModel.findByIdAndUpdate({_id:postID} , req.body)
         res.send({
            msg:"data updated"
         })
       }

    } catch (error) {
        res.send({
            err:error.message
        })
    }
})


postRouter.delete("/delete/:postID" , async(req,res) => {
    const {postID} = req.params
    try {
      const data =  await PostModel.findOne({_id:postID}) 
       if(req.body.postID!= data.postID){
           res.send({
            msg:"you are not authorize to do this action"
           })
       } 
       else{
         await PostModel.findByIdAndDelete({_id:postID})
         res.send({
            msg:"data deleted"
         })
       }

    } catch (error) {
        res.send({
            err:error.message
        })
    }
})

module.exports = {
    postRouter
}