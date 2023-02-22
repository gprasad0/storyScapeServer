const express = require("express");
const passport = require("passport");
const UserModel = require("../models/user.model");
const User = require("../models/user.model")
const router = express.Router();

router.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"Successfuly Logged In",
            use:req.user,
            // cookies : req.cookies,
// jwt 
        })
    }else{
        res.status(403).json({
            error:true,
            message:"Not Authorized"
        });
    }
})

router.get("/login/failed",(req,res)=>{
    res.status(401).json({
        error:true,
        message:"Log in Failure"
    })
})

 
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
    "/google/callback",
    // (req,res)=>{
    //     res.json("data ==>")
    // }
    passport.authenticate("google", {
      successRedirect: process.env.CLIENT_URL,
      failureRedirect: '/login/failed',
    })
  );
router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect(process.env.CLIENT_URL)
})

router.post("/signin",async (req,res)=>{
    try{
        const user = await UserModel.create({
            name:"Guru@gnail.com",
            email:"gur",
            password:"ded"
        })
        res.json("login")
    }catch(e){
        res.json("errro")

    }
})
module.exports = router