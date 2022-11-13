const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { findById } = require("../../models/user");

//SignUp
async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (error) {
    res.status(400).json(error);
  }
}
//Creates Token
function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}
//Login
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = createJWT(user);
      res.json(token);
    }
  } catch (error) {
    res.status(400).json("Bad Credentials");
  }
}

//update user
async function update(req, res) {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const SALT_ROUNDS = 6;
        req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(403).json("Must be User");
    }
  } else {
    return res.status(403).json("Must be User");
  }
}

//delete user
async function deleteUser(req, res) {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been deleted");
    } catch (error) {
      return res.status(403).json("Must be User");
    }
  } else {
    return res.status(403).json("Must be User");
  }
}

//find user

async function findUser(req, res) {
  const userId = req.query.userId
  const username = req.query.username
  try {
    const foundUser = userId ? 
    await User.findById(userId) :
    await User.findOne({username: username});
    //hides password and updated at
    const { password, updatedAt, ...other } = foundUser._doc;
    return res.json(other);
  } catch (error) {
    return res.status(403).json("Could not find user");
  }
}

//follow

async function follow(req, res) {
  if (req.body.userId !== req.params.id) {
    try {
      const userToFollow = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      console.log(userToFollow)
      // if(!currentUser.following.includes(req.body.params)){
      if(!userToFollow.followers.includes(req.body.userId)){
        await userToFollow.updateOne({ $push: {followers: req.body.userId}})
        await currentUser.updateOne({ $push: {following: req.params.id}})
        res.status(200).json('User followed')
      }else{
        return res.status(403).json('User already Followed')
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json('Cannot follow yourself')
  }
}

//unfollow
async function unfollow(req, res) {
  if (req.body.userId !== req.params.id) {
    try {
      const userToFollow = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      // if(!currentUser.following.includes(req.body.params)){
        if(userToFollow.followers.includes(req.body.userId)){
        await currentUser.updateOne({$pull:{following: req.params.id}})
        await userToFollow.updateOne({$pull:{followers: req.body.userId}})
        res.status(200).json('User unfollowed')
      }else{
        return res.status(403).json(`Can't unfollow somebody you don't follow`)
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json('Cannot unfollow yourself')
  }
}

module.exports = {
  create,
  login,
  update,
  deleteUser,
  findUser,
  follow,
  unfollow
};
