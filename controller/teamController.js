import express from 'express'
import Team from "../models/teamModel.js"
import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

const teamController = express.Router()

dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


const createTeam = async (req, res) => {
    try {
      const { firstName, lastName, email, contact, designation } = req.body;
  
      if (!firstName || !lastName || !email || !contact || !designation) {
        res.status(400).send({ message: "Please fill in all required fields." });
      } else {
        let teamProfile;
        let cloudinary_id;
  
        if (req.file) {
          teamProfile = req.file.path;
          const result = await cloudinary.uploader.upload(teamProfile);
  
          teamProfile = result.secure_url;
          cloudinary_id = result.public_id;
        }
  
        const createTeam = new Team({
          firstName,lastName,email,contact,designation,
          teamProfile,cloudinary_id,
        });
  
        await createTeam.save();
        res.status(200).send({ message: "Team created successfully." });
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
  

const getTeam = async (req,res) =>{

    try {
        const teams = await Team.find({})
        .populate('designation', {name:1, _id:1})
    
        if(teams.length === 0) {
            res.status(404).send({message: "not found any team"})
        }
        else {
            res.status(200).send({message : "team details",teams})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}



const updateTeam = async (req,res) =>{

  try {
    const id = req.params.id;
    const { firstName, lastName, email,contact,designation } = req.body;
  
    const team = await Team.findByIdAndUpdate(id, req.body);
  
    if (!team) {
      return res.status(404).send({message: "team not found"});
    }
  
    team.firstName = firstName;
    team.lastName = lastName;
    team.email = email;
    team.contact = contact;
    team.designation = designation;

  
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      team.teamProfile = result.secure_url;
    }
  
    await team.save();
  
    res.status(200).json({ success: "team updated successfully" });

  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}


const deleteTeam = async (req,res) =>{

  try {
    const id = req.params.id

    const team = await Team.findByIdAndDelete(id)

    if(!team) {
      res.status(404).send({ message: "team details not found"})
    }
    else {
      res.status(200).send({ message: "team deleted successfully"})
    }

  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

export default {
    teamController,
    createTeam,
    getTeam,
    deleteTeam,
    updateTeam
}