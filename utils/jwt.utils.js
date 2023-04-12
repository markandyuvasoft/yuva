import  jwt  from "jsonwebtoken";
import {jwtConfig} from "../jwt.config.js"

export const verifyToken = (token) => jwt.verify(token, jwtConfig.secret);

export const createToken = (data) => jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.ttl });