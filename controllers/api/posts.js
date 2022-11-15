const Post = require("../../models/post");
const User = require('../../models/user');
const { follow } = require("./users");

//create a post
async function createPost(req, res) {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
//cor
//get a post
async function getPost(req, res) {
  try {
    const foundPost = await Post.findById(req.params.id);
    res.status(200).json(foundPost);
  } catch (err) {
    res.status(500).json(err);
  }
}
//get following posts
async function getTLPost(req, res) {
    try{
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId: currentUser._id})
        const followingPosts = await Promise.all(
            currentUser.following.map((friendId) => {
              return  Post.find({ userId: friendId})
            })
        )
        res.json(userPosts.concat(...followingPosts))
    }catch(error){
      console.log(error)
        res.status(500).json(error)
    }
}
async function getConcertFollowPost(req, res) {
    try{
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId: currentUser._id})
        const followingPosts = await Promise.all(
            currentUser.concertFollowing.map((concertid) => {
              return  Post.find({ concertId: concertid.id})
            })
        )
        res.json(...followingPosts)
    }catch(error){
      console.log(error)
        res.status(500).json(error)
    }
}
//get all concert posts posts
async function getConcertPost(req, res) {
    try{
        const concertId = await Post.find({concertId:req.params.concertId})
        console.log(concertId)
        res.status(200).json(concertId)
    }catch(error){
      console.log(error)
        res.status(500).json(error)
    }
}
//get user posts
async function getUserPost(req, res) {
    try{
        const concertId = await Post.find({userId:req.params.userId})
        console.log(concertId)
        res.status(200).json(concertId)
    }catch(error){
      console.log(error)
        res.status(500).json(error)
    }
}
//update a post
async function updatePost(req, res) {
  try {
      const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
    await post.updateOne({$set: req.body})
    res.status(200).json("Post Updated");
    } else {
      return res.status(403).json("Cannot edit POST");
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
//delete a post
async function deletePost(req, res) {
    try {
        const post = await Post.findById(req.params.id)
      if (post.userId === req.body.userId) {
       await post.deleteOne()
      res.status(200).json("Post deleted");
      } else {
        return res.status(403).json("Cannot delete POST");
      }
    } catch (err) {
      res.status(500).json(err)
    }
}
//like a post
async function likePost(req, res) {
    try{
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json('Liked')
        } else{
            await post.updateOne({$pull: {likes: req.body.userId}})
                res.status(200).json('Removed like')
        }
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
  createPost,
  getTLPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getConcertPost,
  getUserPost,
  getConcertFollowPost
};
