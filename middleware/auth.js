// import Admin from '../models/adminModel.js'
// import jwt from 'jsonwebtoken'
import * as cache  from '../utils/cache.utils.js'
import * as jwt from '../utils/jwt.utils.js';

const checkauth=async (req,res,next)=>{
    
    // const {authorization} = req.headers

    // if(!authorization){

    //    return res.status(401).json({error:"only auth"})
    // }

    // const token = authorization.replace("Bearer ","")

    // Jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{

    //     if(err){

    //      return  res.status(401).json({error:"only auth"})

    //     }else{

    //         const {_id} = payload

    //         Admin.findById(_id).then(userdata=>{

    //             req.user = userdata
                
    //             next()
    //         })
    //     }

    // })

// -------------------------------------------------------------------------------------------------------------


let token = req.headers.authorization;
if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
}

if (token) {
    try {
        token = token.trim();
        /* ---------------------- Check For Blacklisted Tokens ---------------------- */
        const isBlackListed = await cache.get(token);
        if (isBlackListed) {
            return res.status(400).json({ message: 'Unauthorized' });
        }
        
        const decoded = await jwt.verifyToken(token);
        req.user = decoded;
        req.token = token;
        next();

    } catch (error) { 
        return res.status(400).json({ message: error.message});
    }
} else {
    return res.status(400).json({ message: 'Authorization header is missing.' })
}
} 

export default checkauth
