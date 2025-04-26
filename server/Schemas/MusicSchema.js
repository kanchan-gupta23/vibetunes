const mongoose = require('mongoose')
const { type } = require('os')


const musicSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    attachments:{
        public_id:{
            type:String,
        
        unique:true  
        },
        url:{
        type:String,
      
        unique:true  
        }
      },
    genre:{
        type:String,
        required:true,
    },
    artist:{
        name:{
            type:String,
        required:true,
        },
        bio:{type:String,
            required:true,}    
    },
    action: {
        likes: { type: Number, default: 0 },      
        dislikes: { type: Number, default: 0 },  
      },
      likedBy: {
        type: [mongoose.Schema.Types.ObjectId],    
        ref: "User",
        default: [],
      },
      dislikedBy: {
        type: [mongoose.Schema.Types.ObjectId],  
        ref: "User",
        default: [],
      },
})

const User = mongoose.model("Music",musicSchema)
module.exports = User