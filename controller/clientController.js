import express from "express"
import Client from "../models/clientModel.js"

const clientController = express.Router()

const create = async (req,res) =>{

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
            res.status(200).send({success : "Client created successfully"})
        }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
}


const fetchAll = async (req,res) =>{

    try {
        const clients = await Client.find({})

        if(clients.length === 0) {
            res.status(404).send({message : "not found any clients"})
        }
        else {
            res.status(200).send({clients : clients })
        }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
}

const fetch = async (req,res) =>{

    try {
        const id = req.params.id

        const singleClient = await Client.findById(id)
    
        if(singleClient == null) {
            res.status(404).send({message : "client not found"})
        }
        else {
            res.status(200).send({client : singleClient})
        }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
}


const update = async (req,res) =>{
    
    try {
        const {firstName, city, description} = req.body
        const id = req.params.id
    
        const getClient = await Client.findByIdAndUpdate(id,{
            firstName, city, description
        },{new:true})
    
        if(getClient) {
            res.status(200).send({message: "client details updated"})
    
            getClient.save()
        }
        else {
            res.status(400).send({message: "not updated client details"})
        }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
}


const destroy = async (req,res) =>{

    try {
        const id = req.params.id

        const getClient = await Client.findByIdAndDelete(id)
    
        if(!getClient) {
            res.status(404).send({message : "client not found"})
        }
        else {
            res.status(200).send({message : "client deleted successfully"})
        } 
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
}

export default {
    clientController,
    create,
    fetchAll,
    fetch,
    update,
    destroy
}