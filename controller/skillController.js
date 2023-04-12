import express from "express"
import Skill from "../models/skillModel.js"

const skillController = express.Router()

const create = async (req,res) =>{

    try {
        const {name} = req.body

        if(!name) {
          return res.status(400).send({message : "please select your skill"})
        }
        
        const skillData = await Skill.findOne({name : req.body.name})
    
        if(skillData) {
            return res.status(400).send({message : "skill already exist"})
        }
        else {
            const skill = new Skill({
                name
            })
            await skill.save()
            res.status(200).send({success : "skill created successfully"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const fetchAll = async (req,res) =>{
    
    try {
        const skillData = await Skill.find({})

        if(skillData.length === 0) {
            res.status(404).send({message: "not found any skill"})
        }
        else{
            res.status(200).send({success: "Skills",skillData})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const fetch = async (req,res) =>{

    try {
        const id = req.params.id

        const getdata = await Skill.findById(id)
    
        if(getdata == null) {
            res.status(404).send({message : "skill not found"})
        }
        else {
            res.status(200).send({skill:getdata})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


const update = async (req,res) =>{

    try {
        const {name} = req.body

        const id = req.params.id
    
        const getSkill = await Skill.findByIdAndUpdate(id,{
            name
        },{new:true})
    
        if(getSkill) {
            res.status(200).send({success: "skill updated successfully"})
    
            getSkill.save()
        }
        else {
            res.status(400).send({message : "skill not updated"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const destroy = async (req,res) =>{

    try {
        const id = req.params.id

        const skill = await Skill.findByIdAndDelete(id)
    
        if(!skill) {
            res.status(404).send({message : "skill not found"})
        }
        else {
            res.status(200).send({message : "skill deleted successfully"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });   
    }
}

export default {
    skillController,
    create,
    fetchAll,
    fetch,
    update,
    destroy
}