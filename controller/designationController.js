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
            res.status(404).send({message: "not found any designation"})
        }
        else{
            res.status(200).send({success: "Designations",designation})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


const designationId = async (req,res) =>{

    try {
        const id = req.params.id

        const designationId = await Designation.findById(id)
    
        if(designationId == null) {
            res.status(404).send({message : "designation not found"})
        }
        else {
            res.status(200).send({designation:designationId})
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

const deleteDesignation = async (req,res) =>{

    try {
        const id = req.params.id

        const designation = await Designation.findByIdAndDelete(id)
    
        res.status(200).send({ message: "designation deleted successfully"})

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export default {
    designationController,
    createDesignation,
    getDesignation,
    updateDesignation,
    deleteDesignation,
    designationId
}