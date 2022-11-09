const mongoose  = require("mongoose");
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 6

const userSchema = new Schema({
    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true, trim:true, lowercase:true},
    password: {type:String, required:true, minLength: 3, trim:true },
    following: {type:Array, default:[]},
    followers: {type:Array, default:[]},
    profilePicture: {type:String, default:''},
    bio:{ type:String, max:200},
    city:{ type:String, max: 50},
    stateCode: {type:String, max:2}

},{
    timestamps:true,
    toJSON: {
        transform: function(doc, ret){
            delete ret.password
            return ret
        }
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    return next()
})

module.exports = mongoose.model("User", userSchema)