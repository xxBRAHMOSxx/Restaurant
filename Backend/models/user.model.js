import mongoose from "mongoose";

// Create a schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    usertype: {
        type: String,
        required: [true, "User type is required"],
        default: "client",
        enum: ["admin", "client", "vendor", "delivery"],
    },
    profilepicture: {
        type: String,
        default: "https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0",
    },
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);