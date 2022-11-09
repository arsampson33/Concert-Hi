const Post = require("../../models/post");

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
async function getTLPost(req, res) {}
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
        post.delete(req.params.id)
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
};
