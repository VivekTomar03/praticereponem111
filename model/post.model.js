const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:String,
    body:String,
    device:{type:String, require:true},
    no_of_cmt:Number,
    postID:String,
    owner:String
}, {
    versionKey:false
})

const PostModel = mongoose.model("post" , postSchema)

module.exports = {
    PostModel
}