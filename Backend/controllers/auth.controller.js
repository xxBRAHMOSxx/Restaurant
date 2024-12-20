import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const register = async (req,res) => {
    try {
        const {username, email, password,phone, address,usertype,profilepicture} = req.body;
        //validate
        if(!username || !email || !password || !phone || !usertype){
            return res.status(400).json({message: "All fields are required"});
    }
    //check if user already exists
    const userExists = await User.findOne({
        $or: [{username},{email}]
    });
    if(userExists){
        return res.status(400).json({message: "User already exists"});
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        phone,
        address,
        usertype,
        profilepicture
    });
    return res.status(201).json({message:"user registered",user, password: undefined});
} catch (error) {
    console.log(error);
    res.status(500).json({message: error.message})
}
}

export const login = async (req,res) => {
    try {
        const {username, email, password,} = req.body;
        //validate
        if(!username || !email|| !password){
            return res.status(400).json({message: "Username or email is required"});
        }
        //check if user exists
        const user = await User.findOne({
            $and: [{username},{email}]
        });
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }
        //check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        //create token
        const token = jwt.sign(
            {id:user._id},
             process.env.JWT_SECRET, 
             {expiresIn: "7d"});

        //set cookie

        user.password= undefined   
        return res
        .cookie('token', 
            token, 
            { httpOnly: true, })
            .status(200)
        .send({message: "Login successful",user});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }

}