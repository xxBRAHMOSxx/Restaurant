import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const register = async (req,res) => {
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
}

export const login = async (req,res) => {
    
}