import Jwt from 'jsonwebtoken'
import Admin from "../models/adminModel.js"

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(400).send({ message: "Authorization header missing" })
    }
    
    const token = authHeader.split(" ")[1]
    
    const verify = Jwt.verify(token, process.env.JWT_SECRET)

    const admin = await Admin.findById(verify._id)

    if (!admin || !admin.isAdmin) {
      return res.status(400).send({ message: "You are not an admin" })
    }

    req.user = admin
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

export default adminAuth
