const userModels = require('../models/userModels')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const validator = require('validator')


// login user
const loginUser = async (req, res) => {
    const {email,password}=req.body;
    try {
        const user=await userModels.findOne({email})
        if(!user){
            return res.json({success:false,message:'User do not exist'})
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:'Password Incorrect'})
        }
        const token=createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'})
    }
}
// create token
const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register User
const registerUser = async (req, res) => {
    const {name,password,email}=req.body;
    try {
        // if user already exist
        const exist=await userModels.findOne({email});
        if(exist){
            return res.json({success:false,message:'Email already exist'})
        }
        // validating email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Please Enter a valid email'})
        }
        // strong password
        if(password.length<8){
            return res.json({success:false,message:'Enter strong password'})
        }
        
        //hasing user password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userModels({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user= await newUser.save()
        const token=createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'})
    }
}


module.exports={loginUser,registerUser}