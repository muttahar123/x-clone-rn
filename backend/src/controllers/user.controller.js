import { asynchandler } from "express-async-handler";
import User from "../models/user.model.js";
import { clerkClient, getAuth } from "@clerk/express";

export const getUserProfile = asynchandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
})

export const updateProfile = asynchandler(async (req, res) => {
   const {userId} = getAuth(req);
   const user = await User.findOneAndUpdate({clerkId: userId}, req.body, {new:true});
    if(!user){
       return res.status(404).json({ message: "User not found" });
   }
   res.status(200).json({ message: "Profile updated successfully", user }); 
});

export const syncUser = asynchandler(async (req, res) => {
    const {userId} = getAuth(req);
    const existingUser = await User.findOne({clerkId: userId});
    if(existingUser){
        return res.status(200).json({message:"User already exists", user: existingUser});
    }

    const clerkUser = await clerkClient.users.getUser(userId);
    const userData = {
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        username: clerkUser.emailAddresses[0].emailAddress.split('@')[0],
        profilepicture: clerkUser.imageUrl || ""
    };
    const user = await User.create(userData);
    res.status(201).json({message:"User created successfully", user});
});