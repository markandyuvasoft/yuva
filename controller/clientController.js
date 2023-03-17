import express from "express"
import Client from "../models/clientModel.js"

const clientController = express.Router()

const createClient = async (req,res) =>{

    try {
        const {firstName , city , description} = req.body

        if(!firstName || !city || !description) {
    
            res.status(400).send({message : "Please fill in all required fields."})
        }
        else {
            const createClient = new Client ({
                firstName,city,description
            })
            await createClient.save()
            res.status(200).send({message : "Client created successfully"})
        }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
}


export default {
    clientController,
    createClient
}