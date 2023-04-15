import express from "express"
import Event from "../models/eventModel.js"

const eventController = express.Router()

const create = async (req,res) =>{

    try {
        const {title,description,location,date} = req.body

        if(!title || !description || !location || !date) {
            res.status(400).send({message: "Please fill in all required fields."})
        }
        else {
            const event = new Event({
                title,description,location,date
            })
            await event.save()
            res.status(200).send({success : "Event created successfully"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const fetch = async (req,res) =>{
    
    try {
        const id = req.params.id

        const eventId = await Event.findById(id)
    
        if(eventId == null) {
            res.status(404).send({message : "event not found"})
        }
        else {
            res.status(200).send({event:eventId})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const fetchAll = async (req,res) =>{

    try {
        const events = await Event.find({})

        if(events.length === 0) {
            res.status(404).send({message : "not found any events"})
        }
        else {
            res.status(200).send({success : "All Events",events})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


const update = async (req,res) =>{

    try {
        const {title , description , location , date} = req.body
        const id = req.params.id
    
        const getEvent = await Event.findByIdAndUpdate(id,{
            title,description,location,date
        },{new:true})
    
        if(getEvent) {
            res.status(200).send({success : "Event updated successfully"})
            
            getEvent.save()
        }
        else {
            res.status(400).send({message: "event not updated"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const destroy = async (req,res) =>{

    try {
        const id = req.params.id

        const event = await Event.findByIdAndDelete(id)
    
        if(!event) {
            res.status(404).send({message : "event not found"})
        }
        else {
            res.status(200).send({message : "event deleted successfully"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


const pagination = async (req,res) =>{

    try {
        const { page = 1, limit = 10, sort = 'createdAt' } = req.query;
      
        // Calculate total number of documents to help with pagination
        const totalDocuments = await Event.countDocuments();
      
        // Find documents and apply sorting, pagination, and selection
        const events = await Event.find({})
          .sort({ [sort]: 1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .select('-__v');
      
        // Return paginated response with metadata
        res.status(200).json({
          events,
          totalPages: Math.ceil(totalDocuments / limit),
          currentPage: page,
          totalDocuments,
        });
        
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      
}


export default {
    eventController,
    create,
    fetch,
    fetchAll,
    update,
    destroy,
    pagination
}