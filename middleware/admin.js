// import  Jwt  from 'jsonwebtoken'

// const adminAuth = (req,res,next) =>{

//     try{
//         const token = req.headers.authorization.split(" ")[1]

//         const verify = Jwt.verify(token,process.env.JWT_SECRET)
    
//         const isAdmin = req.user.isAdmin
    
//         if(!isAdmin)
//         {
//             return res.status(403).send({error:'you are not admin'})
//         }
//             next()
//     }
//     catch(error){
//         res.status(400).send({message: error.message})
//     }

    
// }

// export default adminAuth



import Jwt from 'jsonwebtoken'

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]

    const verify = Jwt.verify(token, process.env.JWT_SECRET)

    const isAdmin = req.user.isAdmin

    if (!isAdmin) {
      return res.status(400).send({ error: 'you are not admin' })
    }

    // Check if token has expired
    if (verify.exp < Date.now() / 1000) {
      return res.status(400).send({ error: 'token has expired' })
    }

    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

export default adminAuth
