import express from 'express'
import Admin from '../models/adminModel.js'
import secure from "../bcript/bcript.js"
import createtoken from "../token/authToken.js";
import bcrypt from "bcrypt";
import * as cache  from '../utils/cache.utils.js'


const adminController = express.Router()


const adminRegister = async (req,res) => {

    try {
        const {  email, password } = req.body;

        if(!email || !password)
        {
          return res.status(400).json({message:"Please fill the field properly"})
        
        } else {
            const spassword = await secure(req.body.password);
        
            const user = new Admin({
              email,
              password: spassword,
            });
        
            const userdata = await Admin.findOne({ email: req.body.email });
        
            if (userdata) {
              res.status(400).send({ error: "admin already exist" });
            }
             else {
              const userdatas = await user.save();
        
              res.status(200).send({ message: "Admin Register Successfully" });
            }
          }
    } catch (error) {
        
        res.status(400).json({ message: error.message });
    }

}


const adminLogin = async (req,res) =>{

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: "please fill the proper field " });
  
    } else {
      let user = await Admin.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(400).send({ error: "invalid credentials" });
  
      } 
      if (user.isAdmin != true) {
          return res.status(400).send({ error: "you are not admin" });
    
        } 
  
      else {
        const checkpassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
  
        if (!checkpassword) {
          return res.status(400).send({ error: "invalid credentials" });
        }
        const token = await createtoken(user._id);
  
      user.token = token;
      await user.save();
  
        let Id = user._id;
  
        res.status(200).send({token, Id });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}

const logout = async (req,res) =>{
  
  const token = req.token;
  const now = new Date();
  const expire = new Date(req.user.exp);
  const milliseconds = now.getTime() - expire.getTime();
  /* ----------------------------- BlackList Token ---------------------------- */
  await cache.set(token, token, milliseconds);

  return res.json({ message: 'Logged out successfully' });
}


export default {
    adminController,
    adminRegister,
    adminLogin,
    logout
}