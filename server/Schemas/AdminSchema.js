const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { type } = require('os')


const adminSchema = mongoose.Schema({
    fullName:{
        type:String,
       
    },
    email:{
        type:String,
       
       unique:true,
       },
       password:{
        type:String,

       },
       role:{
        type:String,
        default:"admin"
       }
   
})

adminSchema.pre("save", async function (next) {
   
    if (this.isModified("password") || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    
   next()
})

adminSchema.methods.comparePassword = async function (password) {
  try {
    const compAdminPassword = await bcrypt.compare(password,this.password)
    return compAdminPassword

  } catch (error) {
  return  console.log(error);
  
  }    
}
adminSchema.methods.generateTokenAdmin = async function () {
    return jwt.sign({
        AdminId:this._id,
        role:this.role,
        email:this.email,
        fullName:this.fullName,       
    },
process.env.JWT_KEY,
{expiresIn:"100d"}
)
    
}
const Admin = mongoose.model("Admin",adminSchema)
module.exports = Admin