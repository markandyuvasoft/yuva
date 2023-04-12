import express from "express"
import Blog from "../models/blogModel.js"

const blogController = express.Router()

const create = async (req,res) =>{

    try {
        const {category, description, title, date } = req.body

        if(!category || !description || !title || !date) {
            
            res.status(400).send({message: "Please fill in all required fields."})
        }
        else {
            const blog = new Blog({
                category, description, title, date
            })
            await blog.save()
            res.status(200).send({success : "blog created successfully"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const fetchAll = async (req,res) =>{

    try {
        const blog = await Blog.find({})

        if(blog.length === 0) {
            res.status(404).send({message: "not found any blog"})
        }
        else {
            res.status(200).send({success: "All blogs",blog})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


const fetch = async (req,res) =>{

    try {
        const id = req.params.id

        const blog = await Blog.findById(id)
    
        if(blog == null) {
    
            res.status(404).send({message : "blog not found"})
        }
        else {
            res.status(200).send({blog : blog})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const update = async (req,res) =>{

    try {
        const id = req.params.id

        const {category, description, title, date} = req.body
    
        const getBlog = await Blog.findByIdAndUpdate(id,{
            category, description, title, date
        },{new:true})
    
        if(getBlog) {
            res.status(200).send({success : "blog updated successfully"})
            getBlog.save()
        }
        else {
            res.status(400).send({message : "blog not update"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


const destroy = async (req,res) =>{

    try {
        const id = req.params.id

        const blog = await Blog.findByIdAndDelete(id)
    
        if(!blog) {
            res.status(404).send({message : "blog not found"})
        }
        else {
            res.status(200).send({message : "blog deleted successfully"})
        }
    } catch (error) {
        res.status(400).send({ message: error.message }); 
    }
}


export default {
    blogController,
    create,
    fetchAll,
    fetch,
    update,
    destroy
}