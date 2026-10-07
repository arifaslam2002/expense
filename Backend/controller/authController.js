import bcrypt from "bcrypt";
import User from "../model/User";
export const registerUser = async (req,res)=>{
    try {
        const{name,email,password} = req.body;
        if(!name||!email||!password){
            return res.status(400).json({
                message:"All Field are required"
            })
        }
                if(password.length < 6){
            return res.status(400).json({
                message:"Password Must be at least 6 characters"
            })
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message:"this email is already registered "
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = User.create({
            name,
            email,
            password:hashedPassword,
        })
        res.status(201).json({
            message:"User Registered Successfully"
        })
    } catch (error) {
        console.log("Register Error",error)
        res.status(500).json({
            message:"Server error",
        })
    }
}