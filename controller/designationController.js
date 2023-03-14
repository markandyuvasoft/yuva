import express from 'express'
import Designation from '../models/designation.js'


const designationController = express.Router()

const createDesignation = async (req,res) =>{

    try {
        const { name } = req.body

        if(!name) {
            res.status(400).send({message: "please select your designation"})
        }
        else{
            const designation = new Designation({
                name
            })
            await designation.save()
            res.status(200).send({success: "created your designation"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


const getDesignation = async (req,res) =>{

    try {
        const designation = await Designation.find({})

        if(designation.length === 0) {
            res.status(400).send({message: "not found any designation"})
        }
        else{
            res.status(200).send({success: "Designations",designation})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


const updateDesignation = async (req,res) => {

    try {
        const { name } = req.body
        const id = req.params.id
    
        const getDesignation = await Designation.findByIdAndUpdate(id,{
            name
        
        },{new:true})
    
        if(getDesignation) {
    
            res.status(200).send({success: "designation updated"})
            
            getDesignation.save()
        }
        else{
            res.status(400).send({message: "designation not updated"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export default {
    designationController,
    createDesignation,
    getDesignation,
    updateDesignation
}