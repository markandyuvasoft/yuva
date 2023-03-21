import express from "express"
import Career from "../models/careerModel.js"

const carrerController = express.Router()

const create = async (req,res) =>{

    try {
        const {name, skill,location,experience} = req.body

        if(!name || !skill || !location || !experience) {
         return   res.status(400).send({ message: "Please fill in all required fields." });
        }
        else {
            const createCareer = new Career({
                name,skill,location,experience
            })
            await createCareer.save()
            res.status(200).send({message : "career created successfully"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });  
    }
}

export default {
    carrerController,
    create
}