import express from "express"
import Career from "../models/careerModel.js"
import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

const carrerController = express.Router()

dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const create = async (req,res) =>{

    try {
        const {name, skill,location,experience} = req.body

        if(!name || !skill || !location || !experience) {
         return   res.status(400).send({ message: "Please fill in all required fields." });
        }
        else {
            let logo;
            let cloudinary_id;
      
            if (req.file) {
              logo = req.file.path;
              const result = await cloudinary.uploader.upload(logo);
      
              logo = result.secure_url;
              cloudinary_id = result.public_id;
            }
            const createTeam = new Career({
                name, skill,location,experience,
              logo,cloudinary_id,
            });
      
            await createTeam.save();
            res.status(200).send({ message: "career created successfully." });
          }
        } catch (error) {
          res.status(400).send({ message: error.message });
        }
}

const fetchAll = async (req,res) =>{

  try {
    const career = await Career.find({})

    .populate('skill',{name:1, _id:1})

    if(career.length === 0) {
      res.status(404).send({message: "not found any career"})
    }
    else {
      res.status(200).send({careers: career})
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

const fetch = async (req,res) =>{

  try {
    const id = req.params.id

    const singleCareer = await Career.findById(id)
      .populate('skill',{name:1, _id:1})
  
    if(singleCareer == null) {
      res.status(404).send({message : "career not found"})
    }
    else {
      res.status(200).send({career : singleCareer})
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

const update = async (req,res) =>{

  try {
    const id = req.params.id

    const {name, skill, location, experience} = req.body
  
    const career = await Career.findByIdAndUpdate(id,req.body)
  
    if(!career) {
      return res.status(404).send({message: "career not found"});
    }

    career.name = name;
    career.skill = skill;
    career.location = location;
    career.experience = experience;
  
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      career.logo = result.secure_url;
    }
  
    await career.save();
  
    res.status(200).json({ success: "career updated successfully" });
  
  } catch (error) {
    res.status(400).send({ message: error.message });
    
  }
}

const destroy = async (req,res) =>{

  try {
    const id = req.params.id

    const career = await Career.findByIdAndDelete(id)
  
    if(!career) {
      res.status(404).send({message : "career details not found"})
    }
    else {
      res.status(200).send({message : "career deleted successfully"})
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

export default {
    carrerController,
    create,
    fetchAll,
    fetch,
    update,
    destroy
}