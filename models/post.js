const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    userId: {type:String, required:true},
    body: {type:String, required:true, max:500},
    img: {type:String},
    likes: {type:Array, default:[]},
    concertId: {type:String},
},
{
    timestamps:true
})


module.exports = mongoose.model("Post", postSchema)