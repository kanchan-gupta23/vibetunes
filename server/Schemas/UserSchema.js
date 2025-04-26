const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true    },
    password:{
        type:String,
        required:true,
    }
})
userSchema.pre('save', async function (next) {
    const user = this
   if (this.isModified("password") || this.isNew) {
         hashPassword = await bcrypt.hash(this.password, 10);
     }
     
   
    user.password = hashPassword
    next()
})
userSchema.methods.comparePassword = function (password) {
 try {
    const compPassword = bcrypt.compare(password,this.password)
    return compPassword
 } catch (error) {
  return  res.status(400).json({msg:"password incorrect"})
 }
}
userSchema.methods.generateToken = function () {
  return jwt.sign({
    userId:this._id,
    email:this.email,
    fullName:this.fullName,
    role : "user"
   },
process.env.JWT_SECRET_KEY,
{expiresIn:'100d'}
)    
    
}


const User = mongoose.model("User",userSchema)
module.exports = User